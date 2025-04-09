'use client';
import { useEffect, useState } from 'react';
import TrendCard from './TrendCard';
import { fetchHighRatedRecommendations } from '../../api/HighRatedRecommendationsAPI';

const SimilarMovies = () => {
  const [movies, setMovies] = useState<{ title: string; showId: string }[]>([]);
  const userId = '1'; // replace or dynamically get this in production

  const sanitizeFileName = (title: string) =>
    title
      .replace(/[:*?"<>|\\/.'’!&]/g, '') // now includes period, apostrophes, smart quotes, exclamation mark, and ampersand
      .replace(/\s+/g, ' ') // normalize whitespace
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
            <TrendCard
              key={movie.showId}
              title={movie.title}
              showId={movie.showId}
              imageUrl={`https://intexphotos.blob.core.windows.net/images/Movie%20Posters/${sanitizeFileName(movie.title)}.jpg`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarMovies;
