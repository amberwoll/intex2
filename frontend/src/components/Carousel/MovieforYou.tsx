'use client';
// import React from 'react';
import TrendCard from './TrendCard';

const MoviesforYou = () => {
  const trendImages = [
    'https://cdn.builder.io/api/v1/image/assets/TEMP/4eb6fba6f589b16353b563aa80cd01bb82ce7208',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/3236c2ec5ed66130fa2c62885bfc0992b0773942',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/ce6a0dba6838f8724f2b691ca2a2a90e532b8e70',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/c21c7597f1d3affceefbfa388bc5a3fb3760d73b',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/a414dcf3dbc873f20019405bb2f7cedfb92c6754',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/11a8739d577624bfa1487944081f017c5ae896be',
  ];

  return (
    <section
      className="trends-section"
      role="region"
      aria-label="Trending Content"
    >
      <h2 className="trends-title">Today's Top Movie Picks for You</h2>
      <div className="trends-scroll-container">
        <div className="trends-grid">
          {trendImages.map((imageUrl, index) => (
            <TrendCard key={index} imageUrl={imageUrl} />
          ))}
        </div>
      </div>

      <style>{`
        .trends-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 22px;
          width: 100%;
          background-color: #000000;
          padding: 40px 48px;
        }

        .trends-title {
          color: #ebfaff;
          font-size: 48px;
          font-family: Lato;
          font-weight: 700;
        }

        .trends-scroll-container {
          width: 100%;
          overflow-x: auto;
        }

        .trends-grid {
          display: flex;
          align-items: center;
          gap: 32px;
          min-width: max-content;
        }

        @media (max-width: 991px) {
          .trends-section {
            padding-left: 24px;
            padding-right: 24px;
          }

          .trends-title {
            font-size: 40px;
          }
        }

        @media (max-width: 640px) {
          .trends-section {
            padding-left: 16px;
            padding-right: 16px;
          }

          .trends-title {
            font-size: 32px;
          }
        }
      `}</style>
    </section>
  );
};

export default MoviesforYou;
