'use client';

import { useState, useEffect } from 'react';
import { moviesTitle } from '../../types/moviesTitle';
import { addMovie } from '../../api/MovieApi';
import countries from '../../assets/countries';

interface NewMovieFormProps {
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

const NewMovieModalForm = ({ onSuccess, onCancel }: NewMovieFormProps) => {
  const [type, setType] = useState<'Movie' | 'TV Show'>('Movie');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [formData, setFormData] = useState<Omit<moviesTitle, 'id' | 'showId'>>({
    type: 'Movie',
    title: '',
    director: '',
    cast: '',
    country: '',
    releaseYear: undefined,
    rating: '',
    duration: '',
    description: '',
    action: 0,
    adventure: 0,
    animeSeriesInternationalTvShows: 0,
    britishTvShowsDocuseriesInternationalTvShows: 0,
    children: 0,
    comedies: 0,
    comediesDramasInternationalMovies: 0,
    comediesInternationalMovies: 0,
    comediesRomanticMovies: 0,
    crimeTvShowsDocuseries: 0,
    documentaries: 0,
    documentariesInternationalMovies: 0,
    docuseries: 0,
    dramas: 0,
    dramasInternationalMovies: 0,
    dramasRomanticMovies: 0,
    familyMovies: 0,
    fantasy: 0,
    horrorMovies: 0,
    internationalMoviesThrillers: 0,
    internationalTvShowsRomanticTvShowsTvDramas: 0,
    kidsTv: 0,
    languageTvShows: 0,
    musicals: 0,
    natureTv: 0,
    realityTv: 0,
    spirituality: 0,
    tvAction: 0,
    tvComedies: 0,
    tvDramas: 0,
    talkShowsTvComedies: 0,
    thrillers: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
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

    // remove showId from formData to prevent conflict
    const { showId, ...restFormData } = formData;

    const movieToAdd: moviesTitle = {
      ...restFormData,
      type,
      showId: crypto.randomUUID(), // Required by backend
      ...genreField,
    };

    console.log('Final Payload:', movieToAdd);

    try {
      await addMovie(movieToAdd);
      onSuccess();
    } catch (err) {
      console.error('Failed to add movie:', err);
      alert('Failed to add movie. Check console.');
    }
  };

  const ratingOptions = type === 'Movie' ? movieRatings : tvRatings;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>Add New Movie</h2>

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

          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Director</label>
          <input
            type="text"
            name="director"
            value={formData.director}
            onChange={handleChange}
          />

          <label>Cast</label>
          <input
            type="text"
            name="cast"
            value={formData.cast}
            onChange={handleChange}
          />

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

          <label>Release Year</label>
          <input
            type="number"
            name="releaseYear"
            value={formData.releaseYear ?? ''}
            onChange={handleChange}
          />

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

          <label>{type === 'Movie' ? 'Duration (minutes)' : 'Seasons'}</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />

          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

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

          <div className="btn-row">
            <button type="submit" className="btn btn-success">
              Add
            </button>
            <button type="button" onClick={onCancel} className="btn btn-danger">
              Cancel
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .modal-content {
          background-color: #1a1a1a;
          padding: 30px;
          border-radius: 12px;
          width: 100%;
          max-width: 600px;
          color: #ebfaff;
        }

        label {
          display: block;
          margin-top: 10px;
          margin-bottom: 4px;
        }

        input, select {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 6px;
          border: none;
        }

        .btn-row {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
      `}</style>
    </div>
  );
};

export default NewMovieModalForm;
