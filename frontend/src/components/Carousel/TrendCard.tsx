import React from 'react';

const TrendCard = ({ imageUrl, rank }: { imageUrl: string; rank?: number }) => {
  return (
    <div className="trend-card">
      {rank !== undefined ? <div className="rank-badge">{rank}</div> : null}
      <img src={imageUrl} alt="Trending" className="card-img" />

      <style>{`
        .trend-card {
          position: relative;
          width: 140px;
          flex-shrink: 0;
        }

        .card-img {
          width: 100%;
          height: auto;
          border-radius: 12px;
          display: block;
        }

        .rank-badge {
          position: absolute;
          top: -10px;
          left: -10px;
          background-color: rgba(0, 0, 0, 0.85);
          color: white; /* Dark Blue */
          font-size: 36px;
          font-weight: 900;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          border-radius: 50%;
          width: 54px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 12px rgba(0, 0, 0, 0.6);
          z-index: 2;
        }

        @media (max-width: 640px) {
          .trend-card {
            width: 100px;
          }

          .rank-badge {
            font-size: 26px;
            width: 42px;
            height: 42px;
            top: -8px;
            left: -8px;
          }
        }
      `}</style>
    </div>
  );
};

export default TrendCard;
