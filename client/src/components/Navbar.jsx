
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './Navbar.css';

export default function Navbar({ showAnchors = false }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="nav-container">
        <Link className="brand" to="/">
          <img src="/icon.png" alt="FoodShare logo" />
          <span>FoodShare</span>
        </Link>

        {showAnchors && (
          <div className="nav-status">
            <span className="status-dot" />
            Live food rescue network
          </div>
        )}

        <nav className="nav-links" aria-label="Main navigation">
          {showAnchors && (
            <>
              <a className="nav-anchor" href="#how">
                How it works
              </a>
              <a className="nav-anchor" href="#roles">
                Who it's for
              </a>
            </>
          )}

          <Link
            className={`nav-item ${!showAnchors ? 'active' : ''}`}
            to="/"
          >
            Home
          </Link>

          {user ? (
            <>
              <Link className="nav-item" to="/dashboard">
                Dashboard
              </Link>
              <button
                className="nav-button nav-button-outline"
                onClick={handleLogout}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link className="nav-item" to="/login">
                Log in
              </Link>
              <Link className="nav-button" to="/register">
                Get started <span aria-hidden="true">→</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
