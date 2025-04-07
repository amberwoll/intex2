'use client';
import React from 'react';

export const MovieHero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="top-pick-banner">This Month's Top Pick</div>
        <h1 className="movie-title">The Witcher</h1>
        <div className="action-buttons">
          <button className="watch-button">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 3.76838C1 2.81763 2.01933 2.21493 2.8524 2.67311L10.5461 6.90466C11.4096 7.37957 11.4096 8.62029 10.5461 9.0952L2.8524 13.3267C2.01933 13.7849 1 13.1822 1 12.2315V3.76838Z"
                fill="#EBFAFF"
              />
            </svg>
            Watch Movie
          </button>
          <button className="info-button">
            More Info
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.00391 13.0041L14.0039 8.00415M14.0039 8.00415L9.00391 3.00415M14.0039 8.00415L2.00391 8.00415"
                stroke="#EBFAFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding: 120px 40px 40px 40px;
          background-color: #000;
          color: #ebfaff;
        }
        .hero-content {
          max-width: 900px;
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
          font-size: 72px;
          font-weight: 900;
          text-align: left;
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
        @media (max-width: 768px) {
          .movie-title {
            font-size: 48px;
          }
          .action-buttons {
            flex-direction: column;
            gap: 12px;
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
