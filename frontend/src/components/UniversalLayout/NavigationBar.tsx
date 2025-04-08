'use client';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconButton } from '../MoviePage/IconButton';

export const NavigationBar: React.FC = () => {
  const location = useLocation();

  const [isGreetingEnabled, setIsGreetingEnabled] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  useEffect(() => {
    const greetingSetting = localStorage.getItem('greetingEnabled');
    const greetingExpiration = localStorage.getItem('greetingExpiration');

    if (greetingSetting === 'true' && greetingExpiration) {
      const currentTime = new Date().getTime();
      if (currentTime < parseInt(greetingExpiration)) {
        setIsGreetingEnabled(true);
      }
    }

    const expirationTime = parseInt(
      localStorage.getItem('greetingExpiration') || '0'
    );
    const timePassed = new Date().getTime() - expirationTime;
    if (timePassed > 20 * 60 * 1000) {
      setIsButtonVisible(true);
    }
  }, []);

  const handleGreetingToggle = () => {
    const newGreetingState = !isGreetingEnabled;
    setIsGreetingEnabled(newGreetingState);
    const expirationTime = new Date().getTime() + 20 * 60 * 1000;
    localStorage.setItem('greetingEnabled', newGreetingState.toString());
    localStorage.setItem('greetingExpiration', expirationTime.toString());

    if (!newGreetingState) {
      setIsButtonVisible(false);
    }
  };

  const greetingMessage = isGreetingEnabled ? `Welcome back, masterbruce!` : '';

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Movies', path: '/movies' },
    { label: 'Manage', path: '/manage-movies' },
    { label: 'Privacy', path: '/privacy' },
  ];

  return (
    <header className="header-wrapper">
      <nav className="navbar">
        <img src="/logo/cinelogo.png" alt="Cine Niche Logo" className="logo" />

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
            {isButtonVisible && (
              <div className="toggle-container">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isGreetingEnabled}
                    onChange={handleGreetingToggle}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            )}
          </div>
        </div>
      </nav>

      {greetingMessage && (
        <div className="greeting-message">{greetingMessage}</div>
      )}

      <style react-jsx>{`
        /* Body padding to prevent content cut-off */
        body {
          padding-top: 60px; /* Adjust this value to match the height of the navbar */
        }

        .header-wrapper {
          width: 100%;
          padding: 0.05px 20px; /* Thinner navbar */
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
          padding-right: 30px; /* Added right padding */
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

        .greeting-message {
          padding: 5px;
          color: #fff;
          background: linear-gradient(135deg, #228ee5, #1a7fb1); /* Gradient background */
          font-size: 18px;
          margin-top: 20px;
          width: 60%;
          max-width: 300px;
          margin-left: auto;
          margin-right: auto;
          border-radius: 12px; /* Rounded corners */
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow */
          text-align: center; /* Center the text */
          transition: transform 0.3s ease-in-out; /* Smooth animation */
        }

        /* Toggle Switch Styles */
        .toggle-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 34px;
          height: 20px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
          border-radius: 34px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 12px;
          width: 12px;
          border-radius: 50%;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: 0.4s;
        }

        input:checked + .slider {
          background-color: #4caf50; /* Green color when toggled */
        }

        input:checked + .slider:before {
          transform: translateX(14px); /* Move the slider when toggled */
        }
      `}</style>
    </header>
  );
};
