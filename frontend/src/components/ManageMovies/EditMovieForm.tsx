'use client';

import { useState } from 'react';
import { moviesTitle } from '../../types/moviesTitle';
import { updateMovie } from '../../api/MovieApi';
import countries from '../../assets/countries';

interface EditMovieFormProps {
  movie: moviesTitle;
  onSuccess: () => void;
  onCancel: () => void;
}

const movieRatings = ['G', 'PG', 'PG-13', 'R'];
const tvRatings = ['TV-G', 'TV-PG', 'TV-14', 'TV-MA'];

const genreOptions = [
  { label: 'Action', key: 'action' },
  { label: 'Adventure', key: 'adventure' },
  { label: 'Comedies', key: 'comedies' },
  { label: 'Documentaries', key: 'documentaries' },
  { label: 'Dramas', key: 'dramas' },
  { label: 'Fantasy', key: 'fantasy' },
  { label: 'Horror', key: 'horrorMovies' },
  { label: 'Thrillers', key: 'thrillers' },
];

// Helper function to determine which genre is selected for the movie
const determineSelectedGenre = (movie: moviesTitle): string => {
  for (const genre of genreOptions) {
    if (movie[genre.key as keyof moviesTitle] === 1) {
      return genre.key;
    }
  }
  return '';
};

const EditMovieForm = ({ movie, onSuccess, onCancel }: EditMovieFormProps) => {
  const [type, setType] = useState<'Movie' | 'TV Show'>(
    movie.type as 'Movie' | 'TV Show'
  );
  const [selectedGenre, setSelectedGenre] = useState<string>(
    determineSelectedGenre(movie)
  );
  const [formData, setFormData] = useState<moviesTitle>({
    ...movie,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type: inputType } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: inputType === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // All genre keys → default 0, only selectedGenre = 1
    const allGenreKeys = [
      'action',
      'adventure',
      'animeSeriesInternationalTvShows',
      'britishTvShowsDocuseriesInternationalTvShows',
      'children',
      'comedies',
      'comediesDramasInternationalMovies',
      'comediesInternationalMovies',
      'comediesRomanticMovies',
      'crimeTvShowsDocuseries',
      'documentaries',
      'documentariesInternationalMovies',
      'docuseries',
      'dramas',
      'dramasInternationalMovies',
      'dramasRomanticMovies',
      'familyMovies',
      'fantasy',
      'horrorMovies',
      'internationalMoviesThrillers',
      'internationalTvShowsRomanticTvShowsTvDramas',
      'kidsTv',
      'languageTvShows',
      'musicals',
      'natureTv',
      'realityTv',
      'spirituality',
      'tvAction',
      'tvComedies',
      'tvDramas',
      'talkShowsTvComedies',
      'thrillers',
    ];

    const genreField = allGenreKeys.reduce((acc, key) => {
      acc[key as keyof moviesTitle] = key === selectedGenre ? 1 : 0;
      return acc;
    }, {} as Partial<moviesTitle>);

    const movieToUpdate: moviesTitle = {
      ...formData,
      type,
      ...genreField,
    };

    console.log('Updating movie:', movieToUpdate);

    try {
      if (movie.id) {
        // Make sure id exists for update
        await updateMovie(movieToUpdate);
        onSuccess();
      } else {
        throw new Error('Movie ID not found');
      }
    } catch (err) {
      console.error('Failed to update movie:', err);
      alert('Failed to update movie. Check console.');
    }
  };

  const ratingOptions = type === 'Movie' ? movieRatings : tvRatings;

  return (
    <div>
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Type</label>
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value as 'Movie' | 'TV Show')}
            required
          >
            <option value="Movie">Movie</option>
            <option value="TV Show">TV Show</option>
          </select>
        </div>

        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Director</label>
          <input
            type="text"
            name="director"
            value={formData.director}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Cast</label>
          <input
            type="text"
            name="cast"
            value={formData.cast}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">-- Select --</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Release Year</label>
          <input
            type="number"
            name="releaseYear"
            value={formData.releaseYear ?? ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Rating</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Rating --</option>
            {ratingOptions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>{type === 'Movie' ? 'Duration (minutes)' : 'Seasons'}</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Genre</label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            required
          >
            <option value="">-- Choose a genre --</option>
            {genreOptions.map((genre) => (
              <option key={genre.key} value={genre.key}>
                {genre.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-success">
            Save Changes
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>

      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
        }

        input,
        select {
          width: 100%;
          padding: 8px 12px;
          border-radius: 4px;
          border: 1px solid #444;
          background-color: #2a2a2a;
          color: white;
          font-size: 14px;
        }

        .form-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
};

export default EditMovieForm;
