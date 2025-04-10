// src/api/HybridRecsAPI.ts
export const fetchHybridRecommendations = async (showId: string) => {
  const res = await fetch(
    `https://localhost:5500/Movie/HybridRecommendations/${showId}`,
    {
      credentials: 'include',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch hybrid recommendations');
  }

  return await res.json(); // [{ title, showId }]
};
