import { Link } from 'react-router-dom';

export const PortfolioFooter = () => {
  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      data-aos="zoom-in"
    >
      <Link to="/portfolio" className="theme-btn">
        Back to Portfolio Entries
      </Link>
    </div>
  );
};
