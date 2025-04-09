'use client';

const TrendCard = ({
  imageUrl,
  title,
  rank,
}: {
  imageUrl: string;
  title?: string;
  rank?: number;
}) => {
  const showTitle = title ?? 'Trending';
  const hasImage = imageUrl && !imageUrl.endsWith('/.jpg');

  return (
    <div className="trend-card">
      {typeof rank === 'number' && <div className="rank-badge">{rank}</div>}
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

        .rank-badge {
          position: absolute;
          top: 6px;
          left: 6px;
          background-color: rgba(0, 0, 0, 0.7);
          color: #fff;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: bold;
          z-index: 10;
        }
      `}</style>
    </div>
  );
};

export default TrendCard;
