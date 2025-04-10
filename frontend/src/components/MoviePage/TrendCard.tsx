import React, { useState } from 'react';
import PlusIcon from './PlusIcon';

interface TrendCardProps {
  imageUrl: string;
  title?: string;
}

const TrendCard: React.FC<TrendCardProps> = ({
  imageUrl,
  title = 'Untitled',
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <article className="trend-card">
      {!imageError ? (
        <>
          <img
            src={imageUrl}
            alt={title}
            className="trend-image"
            onError={handleImageError}
          />
          <div className="overlay">
            <PlusIcon />
          </div>
        </>
      ) : (
        <div className="no-poster">
          <span className="fallback-title">{title}</span>
          <span className="no-poster-label">(no poster available)</span>
        </div>
      )}

      <style jsx>{`
        .trend-card {
          width: 208px;
          height: 296px;
          flex-shrink: 0;
          position: relative;
          border-radius: 12px;
          box-shadow: 0px 14px 42px -8px rgba(112, 144, 176, 0.2);
          overflow: hidden;
          background-color: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .trend-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: linear-gradient(
            228deg,
            rgba(0, 0, 0, 0.52) -15.08%,
            rgba(0, 0, 0, 0.22) 90.95%
          );
          backdrop-filter: blur(2.5px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .no-poster {
          width: 100%;
          height: 100%;
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: #333;
          background-color: #e6e6e6;
        }

        .fallback-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .no-poster-label {
          font-size: 10px;
          color: #888;
        }
      `}</style>
    </article>
  );
};

export default TrendCard;
