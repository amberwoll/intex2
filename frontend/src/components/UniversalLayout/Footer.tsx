'use client';

import { Link } from 'react-router-dom';
import { UserProvider } from '../UserContext';

const Footer = () => {
  return (
    <UserProvider>
      <footer className="app-footer">
        <div className="footer-content">
          <p>
            &copy; {new Date().getFullYear()} Cine Niche. All rights reserved.
          </p>
          <Link to="/privacy" className="footer-link">
            Privacy Policy
          </Link>
        </div>

        <style>{`
        .app-footer {
          background-color: #101828;
          color: #d1d5db;
          padding: 20px 32px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          border-top: 1px solid #1f2937;
          margin-top: 40px;
        }

     .footer-content {
  display: flex;
  justify-content: space-between; /* <-- This spreads items to the edges */
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 22px; /* Add horizontal padding */
}


        .footer-link {
          color: #93c5fd;
          text-decoration: none;
          font-weight: 500;
          margin-right: -8px;

        }

        .footer-link:hover {
          text-decoration: underline;
          color: #60a5fa;
        }

        @media (max-width: 640px) {
          .footer-content {
            flex-direction: column;
            text-align: center;
            gap: 8px;
          }
        }
      `}</style>
      </footer>
    </UserProvider>
  );
};

export default Footer;
