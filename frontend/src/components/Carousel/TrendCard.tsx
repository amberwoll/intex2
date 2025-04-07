import React from "react";
import PlusIcon from "./PlusIcon";

interface TrendCardProps {
  imageUrl: string;
}

const TrendCard: React.FC<TrendCardProps> = ({ imageUrl }) => {
  return (
    <article className="trend-card">
      <img src={imageUrl} alt="Trending content" className="trend-image" />
      <div className="overlay-container">
        <PlusIcon />
      </div>

      <style jsx>{`
        .trend-card {
          width: 208px;
          height: 296px;
          position: relative;
          border-radius: 12px;
          box-shadow: 0px 14px 42px -8px rgba(112, 144, 176, 0.2);
          overflow: hidden;
        }

        .trend-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
        }

        .overlay-container {
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
      `}</style>
    </article>
  );
};

export default TrendCard;
