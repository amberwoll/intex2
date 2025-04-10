import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const TrendCard = ({
  imageUrl,
  title,
  showId,
  rank,
}: {
  imageUrl: string;
  title?: string;
  showId?: string;
  rank?: number;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [imgError, setImgError] = useState(false);

  const showTitle = title ?? 'Trending';

  const handleClick = () => {
    navigate(`/movies/${showId ?? encodeURIComponent(showTitle)}`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <div
      className="trend-card"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      {rank && <span className="rank-badge">{rank}</span>}
      {!imgError ? (
        <img
          src={imageUrl}
          alt={showTitle}
          className="card-img"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="no-image">
          <span>{showTitle}</span>
          <small style={{ fontSize: '10px', color: '#888' }}>
            (no poster available)
          </small>
        </div>
      )}

      <style>{`
        .trend-card {
          position: relative;
          width: 140px;
          height: 210px;
          flex-shrink: 0;
          border-radius: 12px;
          overflow: hidden;
          background-color: #f2f2f2;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          margin-right: 16px;
        }

        .trend-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          transform: scale(1.02);
          transition: all 0.2s ease;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
        }

        .rank-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #e50914;
          color: white;
          font-size: 16px;
          font-weight: bold;
          padding: 4px 8px;
          border-radius: 8px;
          z-index: 2;
        }

        .no-image {
          padding: 10px;
          color: #333;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: black;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default TrendCard;
