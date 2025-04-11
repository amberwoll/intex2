'use client';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconButton } from '../MoviePage/IconButton';
import { useUser } from '../UserContext';
export const NavigationBar: React.FC = () => {
  const location = useLocation();
  const user = useUser();
  const [isGreetingEnabled, setIsGreetingEnabled] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const currentUser = user?.email ?? 'Guest'; // :white_check_mark: CHANGED
  useEffect(() => {
    const greetingKey = `${currentUser}_greetingEnabled`; // :white_check_mark: CHANGED
    const greetingExpirationKey = `${currentUser}_greetingExpiration`; // :white_check_mark: CHANGED
    const greetingSetting = localStorage.getItem(greetingKey); // :white_check_mark: CHANGED
    const greetingExpiration = localStorage.getItem(greetingExpirationKey); // :white_check_mark: CHANGED
    if (greetingSetting === 'true' && greetingExpiration) {
      const currentTime = new Date().getTime();
      if (currentTime < parseInt(greetingExpiration)) {
        setIsGreetingEnabled(true);
      }
    }
    const expirationTime = parseInt(
      localStorage.getItem(greetingExpirationKey) || '0'
    ); // :white_check_mark: CHANGED
    const timePassed = new Date().getTime() - expirationTime;
    if (timePassed > 20 * 60 * 1000) {
      setIsButtonVisible(true);
    }
  }, [currentUser]); // :white_check_mark: CHANGED
  const handleGreetingToggle = () => {
    const newGreetingState = !isGreetingEnabled;
    setIsGreetingEnabled(newGreetingState);
    const expirationTime = new Date().getTime() + 20 * 60 * 1000;
    const greetingKey = `${currentUser}_greetingEnabled`; // :white_check_mark: CHANGED
    const greetingExpirationKey = `${currentUser}_greetingExpiration`; // :white_check_mark: CHANGED
    localStorage.setItem(greetingKey, newGreetingState.toString()); // :white_check_mark: CHANGED
    localStorage.setItem(greetingExpirationKey, expirationTime.toString()); // :white_check_mark: CHANGED
    if (!newGreetingState) {
      setIsButtonVisible(false);
    }
  };
  const handleSignOut = async () => {
    try {
      const response = await fetch(
        'https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net/logout',
        {
          method: 'POST',
          credentials: 'include', // send cookies
        }
      );

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Clear user context if needed
      localStorage.removeItem('user'); // Or however you're storing it
      window.location.href = '/'; // Redirect to home/login
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  const greetingMessage = isGreetingEnabled
    ? `Welcome back, ${currentUser}!`
    : '';
  const menuItems = [
    { label: 'Home', path: '/movies' },
    { label: 'All Movies', path: '/view-movies' },
    { label: 'Privacy Policy', path: '/privacy' },
  ];
  return (
    <header className="header-wrapper">
      <nav className="navbar">
        <img
          src="https://intexphotos.blob.core.windows.net/posters/cinelogo.png"
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
            {user?.privilegeLevel === 1 && (
              <li>
                <Link
                  to="/manage-movies"
                  className={`menu-item ${
                    location.pathname === '/manage-movies' ? 'active' : ''
                  }`}
                >
                  Manage Movies
                </Link>
              </li>
            )}
          </ul>
          <div className="actions-group">
            <div className="profile-dropdown">
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="profile-button"
              >
                <IconButton icon="profile" label="Profile" />
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <p>
                    Signed in as <strong>{currentUser}</strong>
                  </p>
                  <button className="signout-button" onClick={handleSignOut}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
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
        <div
          className={`greeting-message ${isGreetingEnabled ? 'visible' : ''}`}
        >
          {greetingMessage}
        </div>
      )}
      <style>{`
        body {
          padding-top: 60px;
        }
        .header-wrapper {
          width: 100%;
          padding: 0.05px 20px;
          background: #101828;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        }
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          height: 80px;
          width: auto;
          border-radius: 50%;
        }
        .nav-right {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-left: auto;
          padding-right: 30px;
        }
        .menu-list {
          list-style: none;
          display: flex;
          gap: 20px;
        }
        .menu-item {
          text-decoration: none;
          color: #EBFAFF;
          font-size: 14px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 8px;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .menu-item:hover {
          background-color: #1A2B3C;
        }
        .menu-item.active {
          background-color: #1F3B50;
          font-weight: 600;
        }
        .actions-group {
          display: flex;
          gap: 12px;
        }
        .greeting-message {
          padding: 5px;
          color: #fff;
          background: linear-gradient(135deg, #228EE5, #1A7FB1);
          font-size: 18px;
          width: 60%;
          max-width: 300px;
          margin-left: auto;
          margin-right: auto;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.3s ease-in-out;
          position: absolute;
          top: 100px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          display: none;
        }
        .greeting-message.visible {
          display: block;
        }
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
          content: '';
          height: 12px;
          width: 12px;
          border-radius: 50%;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: 0.4s;
        }
        input:checked + .slider {
          background-color: #4CAF50;
        }
        input:checked + .slider:before {
          transform: translateX(14px);
        }
        .profile-dropdown {
          position: relative;
        }
        .profile-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .dropdown-menu {
          position: absolute;
          top: 36px;
          right: 0;
          background: #1F3B50;
          padding: 12px;
          border-radius: 8px;
          min-width: 180px;
          color: white;
          font-size: 14px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        .signout-button {
          background: #E74C3C;
          color: white;
          border: none;
          padding: 6px 12px;
          margin-top: 10px;
          border-radius: 6px;
          cursor: pointer;
          width: 100%;
        }
        .signout-button:hover {
          background: #C0392B;
        }
      `}</style>
    </header>
  );
};
