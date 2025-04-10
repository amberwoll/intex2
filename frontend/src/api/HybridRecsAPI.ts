// src/api/HybridRecsAPI.ts
export const fetchHybridRecommendations = async (showId: string) => {
  const res = await fetch(
    `https://intex-2-1-backend-brh0g6hbeqhybcb4.eastus-01.azurewebsites.net/Movie/HybridRecommendations/${showId}`,
    {
      credentials: 'include',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch hybrid recommendations');
  }

  return await res.json(); // [{ title, showId }]
};
