'use client';
import React from 'react';

export const MovieHero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-content-wrapper">
        <div className="hero-content">
          <div className="top-pick-banner">This Month's Top Pick</div>
          <h1 className="movie-title">Shadow and Bone</h1>
          <div className="action-buttons">
            <button className="watch-button">▶ Watch Movie</button>
            <button className="info-button">More Info →</button>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img
            src="https://intexphotos.blob.core.windows.net/images/Movie%20Posters/Shadow%20and%20Bone.jpg"
            alt="Shadow and Bone poster"
            className="hero-image"
          />
        </div>
      </div>

      <style>{`
        .hero-section {
          padding: 60px 40px;
          background-color: #000;
          color: #ebfaff;
        }

        .hero-content-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }

        .hero-content {
          max-width: 50%;
        }

        .top-pick-banner {
          background-color: rgba(0, 0, 0, 0.6);
          color: #ebfaff;
          font-family: "Lato", sans-serif;
          font-size: 20px;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 24px;
          margin-bottom: 16px;
          width: fit-content;
        }

        .movie-title {
          font-family: "Lato", sans-serif;
          font-size: 64px;
          font-weight: 900;
          margin-bottom: 32px;
        }

        .action-buttons {
          display: flex;
          gap: 16px;
        }

        .watch-button,
        .info-button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 28px;
          border-radius: 28px;
          font-family: "Lato", sans-serif;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
        }

        .watch-button {
          color: #ebfaff;
          background-color: #228ee5;
          border: none;
        }

        .info-button {
          color: #ebfaff;
          background: transparent;
          border: 2px solid #228ee5;
        }

        .hero-image-wrapper {
          max-width: 400px;
          flex: 1;
        }

        .hero-image {
          width: 100%;
          border-radius: 20px;
          object-fit: cover;
        }

        @media (max-width: 991px) {
          .hero-content-wrapper {
            flex-direction: column;
            gap: 32px;
          }
          .hero-content {
            max-width: 100%;
          }
          .movie-title {
            font-size: 48px;
          }
        }

        @media (max-width: 640px) {
          .hero-image-wrapper {
            display: none;
          }
          .watch-button,
          .info-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};
