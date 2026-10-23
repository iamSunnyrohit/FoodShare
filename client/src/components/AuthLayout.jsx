import Navbar from './Navbar.jsx';

export default function AuthLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="auth-wrap">
        <aside className="auth-side">
          <h2>Surplus food, shared in minutes.</h2>
          <p>Join donors, receivers and volunteers who keep good food out of the bin.</p>
          <ul>
            <li><span aria-hidden="true">📍</span> See food available within 5 km</li>
            <li><span aria-hidden="true">⚡</span> Live status from posted to delivered</li>
            <li><span aria-hidden="true">🌍</span> Track meals saved and carbon avoided</li>
          </ul>
        </aside>
        <main className="auth-main">
          <div className="auth-card">{children}</div>
        </main>
      </div>
    </>
  );
}
