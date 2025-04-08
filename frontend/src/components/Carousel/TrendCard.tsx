'use client';
import { Link } from 'react-router-dom';

const TrendCard = ({
  imageUrl,
  title,
}: {
  imageUrl: string;
  title?: string;
}) => {
  const showTitle = title ?? 'Trending';
  const showId = encodeURIComponent(showTitle); // used in route param

  const hasImage = imageUrl && !imageUrl.endsWith('/.jpg');

  return (
    <Link to={`/movies/${showId}`}>
      <div className="trend-card">
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

          .card-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 12px;
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
    </Link>
  );
};

export default TrendCard;
