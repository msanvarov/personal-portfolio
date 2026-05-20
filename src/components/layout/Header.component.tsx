import { ThemeConfigurator } from '@/components/ThemeConfigurator.component';
import {
  closeMobileNavbar,
  toggleDisplayMobileNavbar,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import classNames from 'classnames';
import { Link, useLocation } from '@tanstack/react-router';
import { menu } from './menu';

const calendlyUrl = import.meta.env.VITE_CALENDLY_URL;

export const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { displayMobileNavbar } = useAppSelector((state) => state.layout);

  const isOnPath = (path: string) =>
    pathname === path ? 'active' : undefined;

  const handleToggle = () => {
    dispatch(toggleDisplayMobileNavbar());
  };

  const handleClose = () => {
    dispatch(closeMobileNavbar());
  };

  return (
    <header className="header-area">
      <div className="container">
        <div className="gx-row d-flex align-items-center justify-content-between">
          <Link to="/" className="logo">
            <img src="/assets/logo/logo.png" alt="Logo" />
          </Link>
          <nav
            className={classNames('navbar', { active: displayMobileNavbar })}
          >
            <ul className="menu">
              {menu.map((entry, i) => (
                <li className={isOnPath(entry.path)} key={i}>
                  <Link to={entry.path} onClick={handleClose}>
                    {entry.label}
                  </Link>
                </li>
              ))}
            </ul>
            {calendlyUrl ? (
              <a
                className="theme-btn"
                href={calendlyUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span role="img" aria-label="coffee">
                  ☕
                </span>{' '}
                Chat with Sal
              </a>
            ) : null}
          </nav>

          <ThemeConfigurator />
          <div
            className={classNames('show-menu', { active: displayMobileNavbar })}
            onClick={handleToggle}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </header>
  );
};
