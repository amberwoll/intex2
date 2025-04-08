// UserMovieRecommendationsAPI.ts

import { userMovieRecommendation } from '../types/userMovieRecommendation';

interface FetchUserMovieRecommendationsResponse {
  recommendations: userMovieRecommendation[];
  // additional pagination or metadata properties can be added if needed
}

// Base API URL for your backend
const API_URL =
  'https://intex-2-1-backend-brh0g6hbeqhybcb4.eastus-01.azurewebsites.net';

export const fetchUserMovieRecommendations =
  async (): Promise<FetchUserMovieRecommendationsResponse> => {
    try {
      const response = await fetch(`${API_URL}/UserMovieRecommendations`);
      if (!response.ok) {
        throw new Error('Failed to fetch user movie recommendations');
      }
      const data = await response.json();
      return { recommendations: data };
    } catch (error) {
      console.error('Error fetching user movie recommendations:', error);
      throw error;
    }
  };

export const fetchUserMovieRecommendationById = async (
  id: string
): Promise<userMovieRecommendation> => {
  try {
    const response = await fetch(`${API_URL}/UserMovieRecommendations/${id}`);
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
