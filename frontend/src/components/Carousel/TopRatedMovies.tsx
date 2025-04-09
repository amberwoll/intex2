'use client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrendCard from './TrendCard';

const TopRatedMovies = () => {
  const [movies, setMovies] = useState<{ title: string; showId: string }[]>([]);
  const navigate = useNavigate();

  const sanitizeFileName = (title: string) =>
    title
      .replace(/[:*?"<>|\\/.'’]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const res = await fetch('https://localhost:5500/Movie/TopRatedMovies');
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error('Failed to load top rated movies:', error);
      }
    };

    fetchTopRatedMovies();
  }, []);

  return (
    <section className="trends-section" role="region" aria-label="Top Rated">
      <div className="trends-header">
        <h2 className="trends-title">Top 10 Rated Movies/TV Shows</h2>
        <button
          className="view-all-button"
          onClick={() => navigate('/view-movies')}
        >
          View All Movies
        </button>
      </div>

      <div className="trends-scroll-container">
        <div className="trends-grid">
          {movies.map((movie, index) => (
            <TrendCard
              key={movie.showId}
              title={movie.title}
              imageUrl={`https://intexphotos.blob.core.windows.net/images/Movie%20Posters/${sanitizeFileName(movie.title)}.jpg`}
              rank={index + 1}
            />
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
          background-color: #0a0a0a;
          padding: 40px 48px;
        }

        .trends-header {
          display: flex;
          align-items: center;
          gap: 750px; /* <- Fixed the typo here */
        }

        .trends-title {
          color: #ffffff;
          font-size: 40px;
          font-family: Lato;
          font-weight: 700;
        }

        .view-all-button {
          background-color: #ffffff;
          color: #0a0a0a;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          transition: background-color 0.2s;
        }

        .view-all-button:hover {
          background-color: #e5e5e5;
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
            font-size: 36px;
          }
        }

        @media (max-width: 640px) {
          .trends-section {
            padding-left: 16px;
            padding-right: 16px;
          }
          .trends-title {
            font-size: 28px;
          }
        }
      `}</style>
    </section>
  );
};

export default TopRatedMovies;
