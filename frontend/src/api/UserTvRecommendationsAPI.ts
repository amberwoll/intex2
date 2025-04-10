import { userTvRecommendation } from '../types/userTvRecommendation';

interface FetchUserTvRecommendationsResponse {
  recommendations: userTvRecommendation[];
}

const API_URL = 'https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net';

const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`

  };
};

export const fetchUserTvRecommendations =
  async (): Promise<FetchUserTvRecommendationsResponse> => {
    try {
      const response = await fetch(`${API_URL}/UserTvRecommendations`, {
        headers: getAuthHeaders(),
      });

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
    const response = await fetch(`${API_URL}/UserTvRecommendations/${id}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user TV recommendation with ID: ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user TV recommendation by ID:', error);
    throw error;
  }
};
