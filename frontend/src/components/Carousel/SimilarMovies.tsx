'use client';
import { useEffect, useState, useContext } from 'react';
import TrendCard from './TrendCard';
import { fetchHighRatedRecommendations } from '../../api/HighRatedRecommendationsAPI';
import { useUser } from '../UserContext'; // Adjust path as needed

const SimilarMovies = () => {
  const user = useUser();
  const [movies, setMovies] = useState<{ title: string; showId: string }[]>([]);

  const sanitizeFileName = (title: string) =>
    title
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[&:–—'"!?@#$%^*(){}\[\]<>,.|\\/`~+=\-]/g, '')
      .trim();

  useEffect(() => {
    const fetchRecs = async () => {
      if (!user?.email) return;

      try {
        // Step 1: Get userId by email
        const encodedEmail = encodeURIComponent(user.email);
        const res = await fetch(
          `https://localhost:5500/MoviesUser/ByEmail/${encodedEmail}`,
          {
            credentials: 'include',
          }
        );

        if (!res.ok) throw new Error('Failed to fetch user ID');
        const data = await res.json();
        const userId = data.userId;

        // Step 2: Fetch high-rated recommendations
        const recs = await fetchHighRatedRecommendations(userId);
        setMovies(recs);
      } catch (error) {
        console.error('Failed to load similar movies:', error);
      }
    };

    fetchRecs();
  }, [user?.email]);

  return (
    <section
      className="trends-section"
      role="region"
      aria-label="Suggested Movies"
    >
      <h2 className="trends-title">Because you rated ⭐⭐⭐⭐⭐...</h2>
      <div className="trends-scroll-container">
        <div className="trends-grid">
          {movies.map((movie) => (
            <TrendCard
              key={movie.showId}
              title={movie.title}
              showId={movie.showId}
              imageUrl={`https://intexphotos.blob.core.windows.net/posters/${sanitizeFileName(movie.title)}.jpg`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarMovies;
