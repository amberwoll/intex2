// UserTvRecommendationsAPI.ts

import { userTvRecommendation } from '../types/userTvRecommendation';

interface FetchUserTvRecommendationsResponse {
  recommendations: userTvRecommendation[];
  // additional metadata (if needed)
}

const API_URL = 'https://localhost:5500';

export const fetchUserTvRecommendations =
  async (): Promise<FetchUserTvRecommendationsResponse> => {
    try {
      const response = await fetch(`${API_URL}/UserTvRecommendations`);
      if (!response.ok) {
        throw new Error('Failed to fetch user TV recommendations');
      }
      const data = await response.json();
      return { recommendations: data };
    } catch (error) {
      console.error('Error fetching user TV recommendations:', error);
      throw error;
    }
  };

export const fetchUserTvRecommendationById = async (
  id: string
): Promise<userTvRecommendation> => {
  try {
    const response = await fetch(`${API_URL}/UserTvRecommendations/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user TV recommendation with ID: ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user TV recommendation by ID:', error);
    throw error;
  }
};
