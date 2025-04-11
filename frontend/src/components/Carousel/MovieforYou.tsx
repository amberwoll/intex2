'use client';

import { useEffect, useState } from 'react';
import TrendCard from './TrendCard';
import { fetchUserMovieRecommendationById } from '../../api/UserMovieRecommendationsAPI';
import { useUser } from '../UserContext'; // ✅ Use the shared hook

const MoviesforYou = () => {
  const user = useUser(); // 👈 Access the logged-in user's email
  const [userId, setUserId] = useState<string | null>(null);
  const [movieImagePaths, setMovieImagePaths] = useState<string[]>([]);
  const [movieList, setMovieList] = useState<
    { title: string; showId: string }[]
  >([]);

  const sanitizeFileName = (title: string) =>
    title
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[&:–—'"!?@#$%^*(){}\[\]<>,.|\\/`~+=\-]/g, '')
      .trim();

  useEffect(() => {
    const fetchUserIdAndRecommendations = async () => {
      if (userId) {
      }
      if (!user?.email) return;

      try {
        // 🔥 STEP 1: Get userId by email
        const encodedEmail = encodeURIComponent(user.email);
        const userRes = await fetch(
          `https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net/MoviesUser/ByEmail/${encodedEmail}`,
          { credentials: 'include' }
        );

        if (!userRes.ok) throw new Error('Failed to fetch user ID');
        const data = await userRes.json();
        const uid = data.userId;
        setUserId(uid);

        // 🔥 STEP 2: Fetch recommendations
        const recData = await fetchUserMovieRecommendationById(uid);

        const showIds = Object.entries(recData)
          .filter(([key]) => key.startsWith('recommendation'))
          .map(([_, value]) => value);

        const titleRes = await fetch(
          'https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net/Movie/GetMovieTitlesByShowIds',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(showIds),
            credentials: 'include',
          }
        );

        if (!titleRes.ok) throw new Error('Failed to fetch movie titles');
        const movieList = await titleRes.json();

        const paths = movieList
          .filter((movie: { title?: string }) => !!movie.title)
          .map(
            (movie: { title: string }) =>
              `https://intexphotos.blob.core.windows.net/posters/${sanitizeFileName(movie.title)}.jpg`
          );

        setMovieImagePaths(paths);
        setMovieList(movieList);
      } catch (error) {
        console.error('Error loading personalized recommendations:', error);
      }
    };

    fetchUserIdAndRecommendations();
  }, [user?.email]);

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
              key={movie.showId}
              imageUrl={movieImagePaths[index] ?? ''}
              title={movie.title}
              showId={movie.showId}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoviesforYou;
