const router = require('express').Router();
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const { sign, requireAuth } = require('../middleware/auth');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const publicUser = (u) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  role: u.role,
  organization: u.organization,
  avatar: u.avatar,
});

const session = (user) => ({ token: sign(user), user: publicUser(user) });

// POST /api/auth/register  — email and password sign-up
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, organization, phone } = req.body || {};

    if (!name || !name.trim()) return res.status(400).json({ error: 'Name is required' });
    if (!email || !EMAIL_RE.test(email)) return res.status(400).json({ error: 'Enter a valid email address' });
    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    if (!User.ROLES.includes(role)) {
      return res.status(400).json({ error: `Role must be one of: ${User.ROLES.join(', ')}` });
    }

    const user = await User.create({ name, email, password, role, organization, phone });
    res.status(201).json(session(user));
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'This email is already registered' });
    res.status(400).json({ error: err.message });
  }
});

// POST /api/auth/login  — email and password login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    if (!user.password) {
      return res.status(400).json({ error: 'This account uses Google sign-in. Use "Continue with Google".' });
    }
    if (!(await user.matches(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.json(session(user));
  } catch (err) {
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// POST /api/auth/google  — body: { credential, role? }
// `credential` is the Google ID token from the browser. Existing users are logged in.
// New users must also send a role; without it we answer { needsRole: true } so the
// client can ask which role to create.
router.post('/google', async (req, res) => {
  if (!process.env.GOOGLE_CLIENT_ID) {
    return res.status(500).json({ error: 'Google sign-in is not configured on the server' });
  }

  let profile;
  try {
    const { credential } = req.body || {};
    if (!credential) return res.status(400).json({ error: 'Google credential is required' });
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    profile = ticket.getPayload();
  } catch {
    return res.status(401).json({ error: 'Google sign-in failed. Please try again.' });
  }

  if (!profile.email || !profile.email_verified) {
    return res.status(401).json({ error: 'Your Google email is not verified' });
  }

  try {
    const email = profile.email.toLowerCase();
    let user = (await User.findOne({ googleId: profile.sub })) || (await User.findOne({ email }));

    if (user) {
      // Link Google to an existing email account the first time it is used.
      if (!user.googleId) user.googleId = profile.sub;
      if (!user.avatar && profile.picture) user.avatar = profile.picture;
      await user.save();
      return res.json(session(user));
    }

    const { role, organization } = req.body;
    if (!role) {
      return res.json({
        needsRole: true,
        profile: { name: profile.name, email, picture: profile.picture },
      });
    }
    if (!User.ROLES.includes(role)) {
      return res.status(400).json({ error: `Role must be one of: ${User.ROLES.join(', ')}` });
    }

    user = await User.create({
      name: profile.name || email.split('@')[0],
      email,
      googleId: profile.sub,
      avatar: profile.picture,
      role,
      organization,
    });
    res.status(201).json(session(user));
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'This email is already registered' });
    res.status(500).json({ error: 'Could not complete Google sign-in' });
  }
});

// GET /api/auth/me  — current user from the token
router.get('/me', requireAuth, (req, res) => res.json({ user: publicUser(req.user) }));

module.exports = router;
