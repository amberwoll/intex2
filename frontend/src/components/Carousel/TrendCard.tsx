import { useNavigate, useLocation } from 'react-router-dom';

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

  const showTitle = title ?? 'Trending';
  const hasImage = imageUrl && !imageUrl.endsWith('/.jpg');

  const handleClick = () => {
    navigate(`/movies/${showId ?? encodeURIComponent(showTitle)}`, {
      state: { backgroundLocation: location }, // ✅ enables modal routing
    });
  };

  return (
    <div
      className="trend-card"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      {rank && <span className="rank-badge">{rank}</span>}
      {hasImage ? (
        <img src={imageUrl} alt={showTitle} className="card-img" />
      ) : (
        <div className="no-image">
          <span>{showTitle}</span>
          <small>(no poster available)</small>
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
          background-color: #fff;
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
          color: #000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default TrendCard;
