'use client';
import { useState } from 'react';
import TrendCard from './TrendCard';

interface RecommenderCarouselProps {
  items: { title: string; showId: string }[];
}

const RecommenderCarousel: React.FC<RecommenderCarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sanitizeFileName = (title: string) =>
    title
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[&:–—'"!?@#$%^*(){}\[\]<>,.|\\/`~+=\-]/g, '')
      .trim();

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const getIndex = (offset: number) =>
    (currentIndex + offset + items.length) % items.length;

  return (
    <div className="carousel-wrapper">
      <h3 className="carousel-title">You Might Also Like</h3>
      <div className="carousel-container">
        <button className="arrow left" onClick={handlePrev}>
          ‹
        </button>

        <div className="carousel-track">
          {[-1, 0, 1].map((offset) => {
            const index = getIndex(offset);
            const movie = items[index];
            const isCenter = offset === 0;

            return (
              <div
                key={`${movie.showId}-${offset}`} // ✅ key includes offset!
                className={`carousel-item ${isCenter ? 'center' : 'side'}`}
              >
                <TrendCard
                  title={movie.title}
                  showId={movie.showId}
                  imageUrl={`https://intexphotos.blob.core.windows.net/posters/${sanitizeFileName(
                    movie.title
                  )}.jpg`}
                />
              </div>
            );
          })}
        </div>

        <button className="arrow right" onClick={handleNext}>
          ›
        </button>
      </div>

      <style>{`
        .carousel-wrapper {
          margin-top: 40px;
          padding: 20px;
          background: #1a1a1a;
          border-radius: 12px;
          color: white;
          position: relative;
          text-align: center;
        }

        .carousel-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 24px;
        }

        .carousel-container {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .carousel-track {
          display: flex;
          gap: 24px;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .carousel-item {
          transition: transform 0.3s ease, opacity 0.3s ease;
          opacity: 0.4;
          transform: scale(0.9);
        }

        .carousel-item.center {
          transform: scale(1.2);
          opacity: 1;
          z-index: 2;
        }

        .arrow {
          font-size: 48px;
          color: white;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px 16px;
          transition: color 0.2s;
          z-index: 3;
        }

        .arrow.left {
          position: absolute;
          left: 0;
        }

        .arrow.right {
          position: absolute;
          right: 0;
        }

        .arrow:hover {
          color: #ccc;
        }

        @media (max-width: 768px) {
          .arrow {
            font-size: 36px;
          }

          .carousel-item.center {
            transform: scale(1.05);
          }

          .carousel-track {
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default RecommenderCarousel;
