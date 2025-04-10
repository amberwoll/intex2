import { moviesTitle } from '../types/moviesTitle';

interface FetchMoviesResponse {
  movies: moviesTitle[];
  totalMovies: number;
}

const API_URL = `https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net/Movie`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`

  };
};

export const fetchAllMovies = async (): Promise<FetchMoviesResponse> => {
  try {
    const response = await fetch(
      `${API_URL}/AllMovies?pageHowMany=10000&pageNum=1`,
      {
        headers: getAuthHeaders(),
      }
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
      headers: getAuthHeaders(),
      body: JSON.stringify(newMovie),
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
    const response = await fetch(
      `${API_URL}/UpdateMovie/${updatedMovie.showId}`,
      {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedMovie),
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
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to delete movie: ${response.status} - ${errorText}`
      );
    }
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};
