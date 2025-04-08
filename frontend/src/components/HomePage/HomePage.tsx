'use client';
import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const HomePage: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate function

  // Handle button click for Create Account
  const handleCreateClick = () => {
    navigate('/create-account');
  };

  // Handle button click for Login
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <main className="home-container">
      <div className="background-image" aria-hidden="true"></div>
      <div className="content-wrapper">
        <section className="home-section">
          <header className="home-header">
            <h1 className="home-title">CineNiche</h1>
            <p className="home-subtitle">
              Discover the movies you were meant to love
            </p>
          </header>

          <div className="action-box">
            <button className="action-button" onClick={handleCreateClick}>
              Create
            </button>
            <button className="action-button" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        </section>
      </div>

      <style react-jsx>{`
        .home-container {
          height: 100vh;
          width: 100vw;
          position: relative;
          font-family: "Lato", sans-serif;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .background-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('/dist/assets/img/Home.png');
          background-size: cover;
          background-position: center;
          background-color: rgba(0, 0, 0, 0.2); /* dark overlay */
          background-blend-mode: darken;
          z-index: 1;
        }

        .content-wrapper {
          max-width: 1000px;
          padding: 20px;
          width: 100%;
          z-index: 2;
        }

        .home-section {
          text-align: center;
          color: #ebfaff;
        }

        .home-title {
          font-size: 72px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .home-subtitle {
          font-size: 24px;
          font-weight: 400;
          margin-bottom: 60px;
        }

        .action-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
        }

        .action-button {
          width: 240px;
          height: 64px;
          border: 1px solid #fff;
          border-radius: 12px;
          color: #ebfaff;
          font-size: 20px;
          cursor: pointer;
          background-color: #228ee5;
          transition: background-color 0.3s ease;
        }

        .action-button:hover {
          background-color: #1a6bb9;
        }

        @media (max-width: 640px) {
          .home-title {
            font-size: 48px;
          }

          .home-subtitle {
            font-size: 18px;
            margin-bottom: 40px;
          }

          .action-button {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
};

export default HomePage;
