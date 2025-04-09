'use client';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TrendCard from './TrendCard';
import { fetchUserMovieRecommendationById } from '../../api/UserMovieRecommendationsAPI';

const MoviesforYou = () => {
  const [movieImagePaths, setMovieImagePaths] = useState<string[]>([]);
  const [movieList, setMovieList] = useState<
    { title: string; showId: string }[]
  >([]);
  const userId = '1';

  const sanitizeFileName = (title: string) =>
    title
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[&:–—'"!?@#$%^*(){}\[\]<>,.|\\/`~+=\-]/g, '')
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
            credentials: 'include',
          }
        );

        if (!titleResponse.ok) throw new Error('Failed to fetch movie titles');
        const movieList = await titleResponse.json(); // [{ title, showId }, ...]

        const paths = movieList
          .filter((movie: { title?: string }) => !!movie.title)
          .map(
            (movie: { title: string }) =>
              `https://intexphotos.blob.core.windows.net/posters/${sanitizeFileName(movie.title)}.jpg`
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
            <Link to={`/movies/${movie.showId}`} key={movie.showId}>
              <TrendCard
                imageUrl={movieImagePaths[index] ?? ''}
                title={movie.title}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoviesforYou;
