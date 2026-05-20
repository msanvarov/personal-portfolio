import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer-area">
      <div className="container">
        <div className="footer-content text-center">
          <Link to="/" className="logo">
            <img src="/assets/logo/logo.png" alt="Logo" />
          </Link>
          <ul className="footer-menu">
            <li>
              <Link to="/">Landing</Link>
            </li>
            <li>
              <Link to="/bio">Bio</Link>
            </li>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link to="/posts">Blog</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <p className="copyright">
            Made with 💙 and ☕ by <span>Sal Anvarov</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
