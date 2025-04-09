import React, { useEffect, useState } from 'react';
import countries from '../../assets/countries';
import { addMovie } from '../../services/movieServices';

const movieRatings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
const tvRatings = ['TV-Y', 'TV-Y7', 'TV-G', 'TV-PG', 'TV-14', 'TV-MA'];
const genres = [
  'Action',
  'Adventure',
  'Comedies',
  'Dramas',
  'Thrillers',
  'Horror Movies',
]; // expand as needed

const AddMovieModal = ({
  onClose,
  onMovieAdded,
}: {
  onClose: () => void;
  onMovieAdded?: () => void;
}) => {
  const [movie, setMovie] = useState({
    type: 'Movie',
    title: '',
    director: '',
    cast: '',
    country: '',
    releaseYear: new Date().getFullYear(),
    rating: '',
    duration: '',
    description: '',
    genre: '',
  });

  useEffect(() => {
    setMovie((prev) => ({ ...prev, rating: '' }));
  }, [movie.type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!movie.title || !movie.country || !movie.rating || !movie.genre) {
      alert('Please fill in all required fields.');
      return;
    }

    await addMovie({
      ...movie,
      [movie.genre.toLowerCase().replace(/ /g, '')]: 1,
    });

    if (onMovieAdded) onMovieAdded();
    onClose();
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Movie/TV Show</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={movie.type}
            className="form-select w-full"
            onChange={(e) => setMovie({ ...movie, type: e.target.value })}
          >
            <option value="Movie">Movie</option>
            <option value="TV Show">TV Show</option>
          </select>

          <input
            required
            placeholder="Title"
            className="form-input w-full"
            onChange={(e) => setMovie({ ...movie, title: e.target.value })}
          />
          <input
            placeholder="Director"
            className="form-input w-full"
            onChange={(e) => setMovie({ ...movie, director: e.target.value })}
          />
          <input
            placeholder="Cast"
            className="form-input w-full"
            onChange={(e) => setMovie({ ...movie, cast: e.target.value })}
          />

          <select
            required
            className="form-select w-full"
            onChange={(e) => setMovie({ ...movie, country: e.target.value })}
          >
            <option value="">-- Select Country --</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Release Year"
            className="form-input w-full"
            onChange={(e) =>
              setMovie({ ...movie, releaseYear: parseInt(e.target.value) })
            }
          />

          <select
            required
            className="form-select w-full"
            onChange={(e) => setMovie({ ...movie, rating: e.target.value })}
          >
            <option value="">-- Select Rating --</option>
            {(movie.type === 'Movie' ? movieRatings : tvRatings).map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <input
            placeholder={`Duration (${movie.type === 'Movie' ? 'minutes' : 'seasons'})`}
            className="form-input w-full"
            onChange={(e) => setMovie({ ...movie, duration: e.target.value })}
          />

          <select
            required
            className="form-select w-full"
            onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
          >
            <option value="">-- Choose Genre --</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <br></br>
          <textarea
            placeholder="Description"
            className="form-textarea w-full"
            onChange={(e) =>
              setMovie({ ...movie, description: e.target.value })
            }
          />

          <div className="flex justify-end gap-2">
            <button type="submit" className="btn btn-success">
              Add
            </button>
            <button type="button" onClick={onClose} className="btn btn-danger">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModal;
