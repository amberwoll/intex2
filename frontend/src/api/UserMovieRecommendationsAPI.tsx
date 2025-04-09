import { userMovieRecommendation } from '../types/userMovieRecommendation';

const API_URL = 'https://localhost:5500';

export const fetchUserMovieRecommendationById = async (
  id: string
): Promise<userMovieRecommendation> => {
  try {
    const response = await fetch(`${API_URL}/UserMovieRecommendations/${id}`, {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch user movie recommendation with ID: ${id}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user movie recommendation by ID:', error);
    throw error;
  }
};
