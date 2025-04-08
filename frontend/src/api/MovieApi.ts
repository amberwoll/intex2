// const url =
//   'https://intex-2-1-backend-brh0g6hbeqhybcb4.eastus-01.azurewebsites.net/';

import { moviesTitle } from '../types/moviesTitle';

interface FetchMoviesResponse {
  movies: moviesTitle[];
  totalMovies: number; // <-- Match the API's response
}

const API_URL = `https://intex-2-1-backend-brh0g6hbeqhybcb4.eastus-01.azurewebsites.net/Movie`;



export const fetchAllMovies = async (): Promise<FetchMoviesResponse> => {
  try {
    const response = await fetch(`${API_URL}/AllMovies?pageHowMany=10000&pageNum=1`);
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





export const addMovie = async (newMovie: Omit<moviesTitle, "showId">): Promise<moviesTitle> => {
  // of type movie
  try {
    const response = await fetch(`${API_URL}/AddMovie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
  showId: number,
  updatedMovie: moviesTitle
): Promise<moviesTitle> => {
  try {
    const response = await fetch(`${API_URL}/UpdateMovie/${showId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovie),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating movie:', error);
    throw error;
  }
};

export const deleteMovie = async (showId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteMovie/${encodeURIComponent(showId)}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete movie: ${response.status} - ${errorText}`);
    }
  } catch (error) {
    console.error('Error deleting movies:', error);
    throw error;
  }
};

