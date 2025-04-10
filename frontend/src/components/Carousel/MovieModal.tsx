'use client';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { StarRating } from '../MoviePage/StarRating';
import RecommenderCarousel from './RecommenderCarousel';
import { MovieControls } from '../MovieDetailsPage/MovieControls';
import { fetchHybridRecommendations } from '../../api/HybridRecsAPI';

type Movie = {
  title: string;
  description: string;
  director: string;
  cast: string;
  releaseYear: number;
  genres: string[];
};
const MovieModal = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendations, setRecommendations] = useState<
    { title: string; showId: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Lock scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  const sanitizeFileName = (title: string) =>
    title
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[&:–—'"!?@#$%^*(){}\[\]<>,.|\\/`~+=\-]/g, '')
      .trim();
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net/Movie/${showId}`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        const text = await res.text();
        if (!text) throw new Error('Empty response');
        const data = JSON.parse(text);
        const genres = Object.entries(data)
          .filter(([_, value]) => typeof value === 'number' && value === 1)
          .map(([key]) => key);
        setMovie({
          title: data.title || '',
          description: data.description || '',
          director: data.director || '',
          cast: data.cast || '',
          releaseYear: data.releaseYear || 0,
          genres: genres || [],
        });
      } catch (err: any) {
        console.error('Error fetching movie:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    const fetchRecs = async () => {
      try {
        const recs = await fetchHybridRecommendations(showId!);
        setRecommendations(recs);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      }
    };
    if (showId) {
      fetchMovie();
      fetchRecs();
    }
  }, [showId]);
  const closeModal = () => navigate(-1);
  const imageUrl = movie?.title
    ? `https://intexphotos.blob.core.windows.net/posters/${sanitizeFileName(movie.title)}.jpg`
    : '';
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>
          ✕
        </button>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>:warning: {error}</p>}
        {!loading && !error && movie && (
          <div className="modal-flex">
            <img src={imageUrl} alt={movie.title} className="poster-image" />
            <div className="right-column">
              <h2 className="modal-title">
                {movie.title} ({movie.releaseYear})
              </h2>
              <div className="modal-body">
                <StarRating userId={1} showId={showId!} />
                <br></br>
                <MovieControls />

                <p>
                  <strong>Director:</strong> {movie.director}
                </p>
                <p>
                  <strong>Cast:</strong> {movie.cast}
                </p>
                <p>
                  <strong>Genres:</strong> {movie.genres.join(', ')}
                </p>
                <p>
                  <strong>Description:</strong> {movie.description}
                </p>
              </div>
            </div>
          </div>
        )}
        {recommendations.length > 0 && (
          <RecommenderCarousel items={recommendations} />
        )}
      </div>
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: #121212;
          color: white;
          border-radius: 12px;
          max-width: 900px;
          width: 95%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          padding: 2rem;
        }
        .modal-flex {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
        }
        .poster-image {
          width: 50%;
          height: 550px;
          object-fit: cover;
          border-radius: 12px;
          display: block;
        }
        .right-column {
          flex: 1;
          min-width: 250px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 1rem;
        }
        .modal-title {
          margin-top: 0;
          font-size: 1.5rem;
        }
        .modal-body {
          text-align: left;
          font-size: 0.95rem;
          line-height: 1.5;
        }
        .close-button {
          position: absolute;
          top: 12px;
          right: 12px;
          font-size: 1.5rem;
          background: transparent;
          color: white;
          border: none;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .poster-image {
            width: 100%;
            height: auto;
          }
          .modal-flex {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};
export default MovieModal;
