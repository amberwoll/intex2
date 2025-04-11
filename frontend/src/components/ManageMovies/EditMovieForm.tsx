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
  const [formData, setFormData] = useState<moviesTitle>({ ...movie });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type: inputType } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: inputType === 'number' ? Number(value) : value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.title) errors.title = 'Title is required';
    if (!formData.director) errors.director = 'Director is required';
    if (!formData.cast) errors.cast = 'Cast is required';
    if (!formData.country) errors.country = 'Country is required';
    if (!formData.releaseYear) errors.releaseYear = 'Release Year is required';
    if (!formData.rating) errors.rating = 'Rating is required';
    if (!formData.duration) errors.duration = 'Duration is required';
    if (!formData.description) errors.description = 'Description is required';
    if (!selectedGenre) errors.genre = 'Genre is required';
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

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

    try {
      if (movie.id) {
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
                    
          {formErrors.title && <p className="error">{formErrors.title}</p>}
                  
        </div>
                
        <div>
                    <label>Director</label>
                    
          <input
            type="text"
            name="director"
            value={formData.director}
            onChange={handleChange}
            required
          />
                    
          {formErrors.director && (
            <p className="error">{formErrors.director}</p>
          )}
                  
        </div>
                
        <div>
                    <label>Cast</label>
                    
          <input
            type="text"
            name="cast"
            value={formData.cast}
            onChange={handleChange}
            required
          />
                    
          {formErrors.cast && <p className="error">{formErrors.cast}</p>}
                  
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
                    
          {formErrors.country && <p className="error">{formErrors.country}</p>}
                  
        </div>
                
        <div>
                    <label>Release Year</label>
                    
          <input
            type="number"
            name="releaseYear"
            value={formData.releaseYear ?? ''}
            onChange={handleChange}
            required
          />
                    
          {formErrors.releaseYear && (
            <p className="error">{formErrors.releaseYear}</p>
          )}
                  
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
                    
          {formErrors.rating && <p className="error">{formErrors.rating}</p>}
                  
        </div>
                
        <div>
                    
          <label>{type === 'Movie' ? 'Duration (minutes)' : 'Seasons'}</label>
                    
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
                    
          {formErrors.duration && (
            <p className="error">{formErrors.duration}</p>
          )}
                  
        </div>
                
        <div>
                    <label>Description</label>
                    
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
                    
          {formErrors.description && (
            <p className="error">{formErrors.description}</p>
          )}
                  
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
                    
          {formErrors.genre && <p className="error">{formErrors.genre}</p>}
                  
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

        .error {
          color: #ff6b6b;
          font-size: 13px;
          margin-top: 4px;
        }
      `}</style>
          
    </div>
  );
};

export default EditMovieForm;
