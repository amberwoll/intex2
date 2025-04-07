'use client';
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-content">
        <p className="footer-text">© 2025 My Movie App</p>
        <Link to="/privacy" className="footer-link">
          Privacy Policy
        </Link>
      </div>

      <style jsx>{`
        /* Footer styling */
        .footer-wrapper {
          width: 100%;
          padding: 20px 20px;
          background: #101828;
          position: relative;
          bottom: 0;
          left: 0;
          right: 0;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
        }

        .footer-text {
          color: #ebfaff;
          font-size: 14px;
        }

        .footer-link {
          text-decoration: none;
          color: #ebfaff;
          font-size: 14px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 8px;
          transition:
            background 0.2s ease,
            color 0.2s ease;
          margin-left: 10px; /* Add some left margin to move it slightly to the right */
        }

        .footer-link:hover {
          background-color: #1a2b3c;
        }
      `}</style>
    </footer>
  );
};
