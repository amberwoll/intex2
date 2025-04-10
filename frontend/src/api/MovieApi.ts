import { moviesTitle } from '../types/moviesTitle';

interface FetchMoviesResponse {
  movies: moviesTitle[];
  totalMovies: number;
}

const API_URL = `https://localhost:5500/Movie`;

export const fetchAllMovies = async (): Promise<FetchMoviesResponse> => {
  try {
    const response = await fetch(
      `${API_URL}/AllMovies?pageHowMany=10000&pageNum=1`,
      { credentials: 'include' }
    );
    if (!response.ok) throw new Error('Failed to fetch movies');
    const result = await response.json();
    return {
      movies: result.movies,
      totalMovies: result.totalMovies ?? result.movies.length,
    };
  } catch (error) {
    console.error('Error fetching movies', error);
    throw error;
  }
};

export const addMovie = async (newMovie: moviesTitle): Promise<moviesTitle> => {
  try {
    const response = await fetch(`${API_URL}/AddMovie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to add movie');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding movie', error);
    throw error;
  }
};

export const updateMovie = async (
  updatedMovie: moviesTitle
): Promise<moviesTitle> => {
  try {
    // Use showId from the movie object for the API endpoint
    const response = await fetch(
      `${API_URL}/UpdateMovie/${updatedMovie.showId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMovie),
        credentials: 'include',
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to update movie: ${response.status} - ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating movie:', error);
    throw error;
  }
};

export const deleteMovie = async (showId: string): Promise<void> => {
  try {
    const response = await fetch(
      `${API_URL}/DeleteMovie/${encodeURIComponent(showId)}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to delete movie: ${response.status} - ${errorText}`
      );
    }
  } catch (error) {
    console.error('Error deleting movies:', error);
    throw error;
  }
};
