'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { moviesTitle } from '../../types/moviesTitle';
import { fetchAllMovies } from '../../api/MovieApi';
import { useNavigate, useLocation } from 'react-router-dom';

const genreOptions = [
  { label: 'All Genres', key: '' },
  { label: 'Action', key: 'action' },
  { label: 'Adventure', key: 'adventure' },
  { label: 'Comedies', key: 'comedies' },
  { label: 'Documentaries', key: 'documentaries' },
  { label: 'Dramas', key: 'dramas' },
  { label: 'Fantasy', key: 'fantasy' },
  { label: 'Horror', key: 'horrorMovies' },
  { label: 'Thrillers', key: 'thrillers' },
];

const sanitizeFileName = (title: string) =>
  title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[&:\u2013\u2014'"!?@#$%^*(){}\[\]<>.,.|\\/`~+=\-]/g, '')
    .trim();

const MovieGallery = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [allMovies, setAllMovies] = useState<moviesTitle[]>([]);
  const [displayedMovies, setDisplayedMovies] = useState<moviesTitle[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [pageSize] = useState<number>(20);
  const [pageNum, setPageNum] = useState<number>(1);
  const [imgError, setImgError] = useState<{ [key: string]: boolean }>({});
  const loaderRef = useRef(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchAllMovies();
        setAllMovies(data.movies);
      } catch (err) {
        console.error('Failed to fetch movies:', err);
      }
    };
    loadMovies();
  }, []);

  const getFilteredMovies = () => {
    return allMovies.filter((movie) => {
      const titleMatch = movie.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const genreMatch = selectedGenre
        ? movie[selectedGenre as keyof moviesTitle] === 1
        : true;
      const typeMatch = selectedType
        ? movie.type?.toLowerCase() === selectedType
        : true;
      const hasImage = !!movie.title && movie.title.trim() !== '';
      return titleMatch && genreMatch && typeMatch && hasImage;
    });
  };

  const loadMore = useCallback(() => {
    const filtered = getFilteredMovies();
    const nextPageMovies = filtered.slice(0, pageNum * pageSize);
    setDisplayedMovies(nextPageMovies);
  }, [pageNum, searchQuery, selectedGenre, selectedType, allMovies]);

  useEffect(() => {
    loadMore();
  }, [pageNum, searchQuery, selectedGenre, selectedType, allMovies]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setPageNum((prev) => prev + 1);
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, []);

  return (
    <section className="movie-gallery">
      <div className="controls">
        <div className="left-controls">
          <button
            type="button"
            className="utility-button"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
        <div className="right-controls">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPageNum(1);
            }}
          />
          <select
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value);
              setPageNum(1);
            }}
          >
            {genreOptions.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setPageNum(1);
            }}
          >
            <option value="">All Types</option>
            <option value="movie">Movie</option>
            <option value="tv">TV</option>
          </select>
        </div>
      </div>

      <div className="grid-container">
        {displayedMovies.map((movie, idx) => {
          const sanitizedTitle = sanitizeFileName(movie.title ?? '');
          const imageUrl = `https://intexphotos.blob.core.windows.net/posters/${sanitizedTitle}.jpg`;
          const id = movie.showId ?? idx;

          return (
            <div
              className="image-card"
              key={id}
              onClick={() =>
                navigate(`/movies/${movie.showId}`, {
                  state: { backgroundLocation: location },
                })
              }
              style={{ cursor: 'pointer' }}
            >
              {!imgError[id] ? (
                <img
                  src={imageUrl}
                  alt={movie.title ?? 'Movie'}
                  className="card-image"
                  onError={() =>
                    setImgError((prev) => ({ ...prev, [id]: true }))
                  }
                />
              ) : (
                <div className="fallback-card">
                  <h3>{movie.title}</h3>
                  <p className="fallback-label">(No poster available)</p>
                </div>
              )}
              <div className="overlay">
                <h3>{movie.title}</h3>
                <p>{movie.rating}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div ref={loaderRef} style={{ height: '1px' }}></div>

      <style>{`
        .movie-gallery {
          background: #121212;
          color: white;
          padding: 32px;
          min-height: 100vh;
          font-family: Inter, sans-serif;
        }
        .controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 48px;
          flex-wrap: wrap;
          position: relative;
        }
        .left-controls {
          flex: 0 0 auto;
        }
        .right-controls {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .utility-button,
        input,
        select {
          padding: 14px 18px;
          border-radius: 8px;
          background: #2a2a2a;
          color: white;
          border: 1px solid #444;
          font-size: 16px;
          font-weight: 500;
        }
        .grid-container {
          margin-top: 48px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 24px;
          justify-items: center;
        }
        .image-card {
          position: relative;
          width: 160px;
          height: 240px;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.25s ease-out, box-shadow 0.25s ease-out;
          z-index: 1;
          background-color: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .image-card:hover {
          transform: scale(1.2);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6);
          z-index: 20;
        }
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .fallback-card {
          padding: 12px;
          color: white;
          text-align: center;
        }
        .fallback-label {
          font-size: 11px;
          color: #bbb;
        }
        .overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 12px 8px;
          text-align: center;
          opacity: 0;
          transition: opacity 0.25s ease-in;
        }
        .image-card:hover .overlay {
          opacity: 1;
        }
        .overlay h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }
        .overlay p {
          margin: 4px 0 0;
          font-size: 13px;
          opacity: 0.85;
        }
      `}</style>
    </section>
  );
};

export default MovieGallery;
