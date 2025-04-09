'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { showId } = useParams<{ showId: string }>();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://localhost:5500/Movie/${showId}`
        );

        if (!response.ok) throw new Error('Movie not found');
        const data = await response.json();

        const genres = Object.entries(data)
          .filter(([_, value]) => typeof value === 'number' && value === 1)
          .map(([key]) => key);

        setMovie({
          title: data.title || '',
          director: data.director || '',
          actors: data.cast || '',
          synopsis: data.description || '',
          genres: genres || [],
          duration: data.duration || '',
          releaseYear: data.releaseYear || '',
        });
      } catch (err) {
        console.error('Error fetching movie details:', err);
      }
    };

    if (showId) fetchMovie();
  }, [showId]);

  if (!movie) return null;

  return (
    <div style={{ padding: '2rem', background: '#121212', color: 'white' }}>
      <button onClick={() => window.history.back()} style={{ marginBottom: '1rem' }}>✕ Close</button>
      <h1>{movie.title}</h1>
      {/* IMAGE INTENTIONALLY REMOVED */}
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Cast:</strong> {movie.actors}</p>
      <p><strong>Synopsis:</strong> {movie.synopsis}</p>
      <p><strong>Release Year:</strong> {movie.releaseYear}</p>
      <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
    </div>
  );
};

export default MovieDetails;
