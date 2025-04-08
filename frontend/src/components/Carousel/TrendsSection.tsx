// import React from 'react';

const TrendCard = ({ imageUrl, rank }: { imageUrl: string; rank?: number }) => {
  return (
    <div className="trend-card">
      {rank !== undefined ? <div className="rank-badge">{rank}</div> : null}
      {imageUrl ? (
        <img src={imageUrl} alt="Trending" className="card-img" />
      ) : null}

      <style>{`
        .trend-card {
          position: relative;
          width: 120px; /* Reduced width */
          flex-shrink: 0;
        }

        .card-img {
          width: 100%;
          height: auto;
          border-radius: 10px; /* Slightly more rounded */
          display: block;
        }

        .rank-badge {
          position: absolute;
          top: -6px;  /* Reduced space */
          left: -6px; /* Reduced space */
          background-color: rgba(0, 0, 0, 0.85);
          color: #1f3a68; /* Dark Blue */
          font-size: 30px; /* Smaller font size */
          font-weight: 900;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          border-radius: 50%;
          width: 40px; /* Smaller badge size */
          height: 40px; /* Smaller badge size */
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
          z-index: 2;
        }

        @media (max-width: 640px) {
          .trend-card {
            width: 90px; /* Even smaller width for mobile */
          }

          .rank-badge {
            font-size: 22px; /* Slightly smaller font size for mobile */
            width: 36px;
            height: 36px;
            top: -4px; /* Reduced space */
            left: -4px; /* Reduced space */
          }
        }
      `}</style>
    </div>
  );
};

export default TrendCard;
