'use client';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconButton } from '../MoviePage/IconButton';

export const NavigationBar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Movies', path: '/movies' },
    { label: 'Manage', path: '/manage-movies' },
    { label: 'Privacy', path: '/privacy' },
  ];

  return (
    <header className="header-wrapper">
      <nav className="navbar">
      <img
  src="/logo/cinelogo.png"
  alt="Cine Niche Logo"
  className="logo"
/>

        <div className="nav-right">
          <ul className="menu-list">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={`menu-item ${
                    location.pathname === item.path ? 'active' : ''
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="actions-group">
            <IconButton icon="profile" label="Profile" />
          </div>
        </div>
      </nav>

      <style react-jsx>{`
        /* Body padding to prevent content cut-off */
        body {
          padding-top: 60px; /* Adjust this value to match the height of the navbar */
        }

        .header-wrapper {
          width: 100%;
          padding: 5px 20px; /* Thinner navbar */
          background: #101828;
          position: absolute; /* Allow it to scroll with content */
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000; /* Ensures it's above other content */
        }

        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          height: 80px; /* Reduced logo height */
          width: auto;
          border-radius: 50%;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-left: auto;
          padding-right: 20px; /* Added right padding */
        }

        .menu-list {
          list-style: none;
          display: flex;
          gap: 20px; /* Reduced gap between menu items */
        }

        .menu-item {
          text-decoration: none;
          color: #ebfaff;
          font-size: 14px; /* Reduced font size */
          cursor: pointer;
          padding: 4px 8px; /* Reduced padding */
          border-radius: 8px;
          transition:
            background 0.2s ease,
            color 0.2s ease;
        }

        .menu-item:hover {
          background-color: #1a2b3c;
        }

        .menu-item.active {
          background-color: #1f3b50;
          font-weight: 600;
        }

        .actions-group {
          display: flex;
          gap: 12px;
        }
      `}</style>
    </header>
  );
};
