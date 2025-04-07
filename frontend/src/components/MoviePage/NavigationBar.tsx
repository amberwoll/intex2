"use client";
import React from "react";
import { IconButton } from "./IconButton";

export const NavigationBar: React.FC = () => {
  const menuItems = [
    "Home",
    "Pricing",
    "Movies",
    "Series",
    "Collection",
    "FAQ",
  ];

  return (
    <header className="header-wrapper">
      <nav className="navbar">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/309479ff8acc41fdd60e0caacac582f2b7d0f19c"
          alt="Logo"
          className="logo"
        />
        <div className="menu-indicator" />
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item}>
              <button className="menu-item">{item}</button>
            </li>
          ))}
        </ul>
        <div className="actions-group">
          <IconButton
            icon='<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28 28L21.0711 21.0711M21.0711 21.0711C22.8807 19.2614 24 16.7614 24 14C24 8.47715 19.5228 4 14 4C8.47715 4 4 8.47715 4 14C4 19.5228 8.47715 24 14 24C16.7614 24 19.2614 22.8807 21.0711 21.0711Z" stroke="#EBFAFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
            label="Search"
          />
          <IconButton
            icon='<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1357_5529)"><path d="M16 32C18.2075 32 19.9982 30.2094 19.9982 28H12.0019C12.0019 30.2094 13.7925 32 16 32ZM29.4619 22.6431C28.2544 21.3456 25.995 19.3937 25.995 13C25.995 8.14375 22.59 4.25625 17.9988 3.3025V2C17.9988 0.895625 17.1038 0 16 0C14.8963 0 14.0013 0.895625 14.0013 2V3.3025C9.41004 4.25625 6.00504 8.14375 6.00504 13C6.00504 19.3937 3.74567 21.3456 2.53817 22.6431C2.16317 23.0463 1.99692 23.5281 2.00004 24C2.00692 25.025 2.81129 26 4.00629 26H27.9938C29.1888 26 29.9938 25.025 30 24C30.0032 23.5281 29.8369 23.0456 29.4619 22.6431Z" fill="#EBFAFF"></path><circle cx="26.6673" cy="25.3333" r="5.33333" fill="#E5228D"></circle></g><defs><clipPath id="clip0_1357_5529"><rect width="32" height="32" fill="white"></rect></clipPath></defs></svg>'
            label="Notifications"
          />
          <IconButton
            icon='<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.0004 8C10.0004 4.68629 12.6867 2 16.0004 2C19.3142 2 22.0004 4.68629 22.0004 8C22.0004 11.3137 19.3142 14 16.0004 14C12.6867 14 10.0004 11.3137 10.0004 8Z" fill="#EBFAFF"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M5.0021 26.8071C5.10522 20.8208 9.98975 16 16.0004 16C22.0113 16 26.8959 20.821 26.9988 26.8075C27.0056 27.2046 26.7769 27.568 26.416 27.7336C23.2441 29.1891 19.7158 30 16.0009 30C12.2856 30 8.75702 29.1889 5.58487 27.7332C5.22398 27.5676 4.99526 27.2041 5.0021 26.8071Z" fill="#EBFAFF"></path></svg>'
            label="Profile"
          />
          <IconButton
            icon='<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 3C16.5523 3 17 3.44772 17 4V7C17 7.55228 16.5523 8 16 8C15.4477 8 15 7.55228 15 7V4C15 3.44772 15.4477 3 16 3Z" fill="#EBFAFF"></path><path d="M10 16C10 12.6863 12.6863 10 16 10C19.3137 10 22 12.6863 22 16C22 19.3137 19.3137 22 16 22C12.6863 22 10 19.3137 10 16Z" fill="#EBFAFF"></path><path d="M25.1925 8.22178C25.583 7.83126 25.583 7.19809 25.1925 6.80757C24.8019 6.41705 24.1688 6.41705 23.7782 6.80757L21.6569 8.92889C21.2664 9.31942 21.2664 9.95258 21.6569 10.3431C22.0474 10.7336 22.6806 10.7336 23.0711 10.3431L25.1925 8.22178Z" fill="#EBFAFF"></path><path d="M29 16C29 16.5523 28.5523 17 28 17H25C24.4477 17 24 16.5523 24 16C24 15.4477 24.4477 15 25 15H28C28.5523 15 29 15.4477 29 16Z" fill="#EBFAFF"></path><path d="M23.7781 25.1923C24.1686 25.5829 24.8018 25.5829 25.1923 25.1923C25.5828 24.8018 25.5828 24.1686 25.1923 23.7781L23.071 21.6568C22.6805 21.2663 22.0473 21.2663 21.6568 21.6568C21.2662 22.0473 21.2662 22.6805 21.6568 23.071L23.7781 25.1923Z" fill="#EBFAFF"></path><path d="M16 24C16.5523 24 17 24.4477 17 25V28C17 28.5523 16.5523 29 16 29C15.4477 29 15 28.5523 15 28V25C15 24.4477 15.4477 24 16 24Z" fill="#EBFAFF"></path><path d="M10.3433 23.071C10.7339 22.6805 10.7339 22.0473 10.3433 21.6568C9.95281 21.2663 9.31965 21.2663 8.92912 21.6568L6.8078 23.7781C6.41728 24.1687 6.41728 24.8018 6.8078 25.1923C7.19833 25.5829 7.83149 25.5829 8.22202 25.1923L10.3433 23.071Z" fill="#EBFAFF"></path><path d="M8 16C8 16.5523 7.55228 17 7 17H4C3.44772 17 3 16.5523 3 16C3 15.4477 3.44772 15 4 15H7C7.55228 15 8 15.4477 8 16Z" fill="#EBFAFF"></path><path d="M8.92897 10.3431C9.3195 10.7336 9.95266 10.7336 10.3432 10.3431C10.7337 9.95257 10.7337 9.3194 10.3432 8.92888L8.22187 6.80756C7.83134 6.41703 7.19818 6.41703 6.80765 6.80756C6.41713 7.19808 6.41713 7.83125 6.80765 8.22177L8.92897 10.3431Z" fill="#EBFAFF"></path></svg>'
            label="Theme"
          />
        </div>
      </nav>

      <style react-jsx>{`
        .header-wrapper {
          width: 100%;
          padding: 19px 0;
          position: relative;
          z-index: 10;
        }
        .navbar {
          width: 1232px;
          height: 80px;
          margin: 18px auto;
          border-radius: 20px;
          border: 0.5px solid #228ee5;
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          padding: 0 24px;
          position: relative;
          background-color: rgba(26, 25, 25, 0.3);
        }
        .logo {
          width: 92px;
          height: 92px;
          position: absolute;
          left: 115px;
          top: 12px;
        }
        .menu-indicator {
          width: 56px;
          height: 4px;
          border-radius: 50px;
          filter: blur(2.5px);
          position: absolute;
          left: 161px;
          bottom: 23px;
          background-color: #228ee5;
        }
        .menu-list {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-left: 157px;
          list-style: none;
          padding: 0;
        }
        .menu-item {
          color: #fff;
          font-family: "Lato", sans-serif;
          font-size: 24px;
          font-weight: 500;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
        }
        .actions-group {
          display: flex;
          align-items: center;
          gap: 32px;
          margin-left: auto;
        }
        @media (max-width: 991px) {
          .navbar {
            width: 90%;
            margin: 18px auto;
          }
          .menu-list {
            margin-left: 100px;
            gap: 16px;
          }
          .menu-item {
            font-size: 20px;
          }
        }
        @media (max-width: 640px) {
          .navbar {
            height: 60px;
            padding: 0 16px;
          }
          .menu-list {
            display: none;
          }
          .logo {
            width: 60px;
            height: 60px;
            left: 20px;
            top: 12px;
          }
        }
      `}</style>
    </header>
  );
};
