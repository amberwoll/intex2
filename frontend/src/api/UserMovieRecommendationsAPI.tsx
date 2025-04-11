import { userMovieRecommendation } from '../types/userMovieRecommendation';

const API_URL = 'https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net';

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
