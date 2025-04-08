// MoviesforYou.tsx
'use client';
import { useEffect, useState } from 'react';
import TrendCard from './TrendCard';
import { fetchUserMovieRecommendationById } from '../../api/UserMovieRecommendationsAPI';

const MoviesforYou = () => {
  const [movieImagePaths, setMovieImagePaths] = useState<string[]>([]);
  const [movieList, setMovieList] = useState<{ title: string }[]>([]);
  const userId = '1';

  const sanitizeFileName = (title: string) =>
    title
      .replace(/[:*?"<>|\\/.'’]/g, '') // now includes period, apostrophes, and smart quotes
      .replace(/\s+/g, ' ') // normalize whitespace
      .trim();

  useEffect(() => {
    const fetchRecommendationsAndTitles = async () => {
      try {
        const recData = await fetchUserMovieRecommendationById(userId);

        const showIds = Object.entries(recData)
          .filter(([key]) => key.startsWith('recommendation'))
          .map(([_, value]) => value);

        const titleResponse = await fetch(
          'https://localhost:5500/Movie/GetMovieTitlesByShowIds',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(showIds),
          }
        );

        if (!titleResponse.ok) throw new Error('Failed to fetch movie titles');
        const movieList = await titleResponse.json();

        const paths = movieList
          .filter((movie: { title?: string }) => !!movie.title)
          .map(
            (movie: { title: string }) =>
              new URL(
                `/src/assets/img/Movie Posters/${sanitizeFileName(movie.title)}.jpg`,
                import.meta.url
              ).href
          );

        setMovieImagePaths(paths);
        setMovieList(movieList);
      } catch (error) {
        console.error('Error loading recommendations:', error);
      }
    };

    fetchRecommendationsAndTitles();
  }, []);

  return (
    <section
      className="trends-section"
      role="region"
      aria-label="Trending Content"
    >
      <h2 className="trends-title">Today's Top Movie Picks for You</h2>
      <div className="trends-scroll-container">
        <div className="trends-grid">
          {movieList.map((movie, index) => (
            <TrendCard
              key={index}
              imageUrl={movieImagePaths[index] ?? ''}
              title={movie.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoviesforYou;
