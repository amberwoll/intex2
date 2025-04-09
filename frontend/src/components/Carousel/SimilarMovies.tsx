'use client';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TrendCard from './TrendCard';
import { fetchHighRatedRecommendations } from '../../api/HighRatedRecommendationsAPI';

const SimilarMovies = () => {
  const [movies, setMovies] = useState<{ title: string; showId: string }[]>([]);
  const userId = '1'; // replace or dynamically get this in production

  const sanitizeFileName = (title: string) =>
    title
      .replace(/[:*?"<>|\\/.'’]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const data = await fetchHighRatedRecommendations(userId);
        setMovies(data);
      } catch (error) {
        console.error('Failed to load similar movies:', error);
      }
    };

    fetchRecs();
  }, []);

  return (
    <section
      className="trends-section"
      role="region"
      aria-label="Suggested Movies"
    >
      <h2 className="trends-title">Because you loved something awesome...</h2>
      <div className="trends-scroll-container">
        <div className="trends-grid">
          {movies.map((movie, index) => (
            <Link to={`/movies/${movie.showId}`} key={movie.showId}>
              <TrendCard
                title={movie.title}
                imageUrl={`https://intexphotos.blob.core.windows.net/images/Movie%20Posters/${sanitizeFileName(movie.title)}.jpg`}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarMovies;
