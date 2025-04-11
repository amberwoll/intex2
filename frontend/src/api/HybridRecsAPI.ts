// ✅ HybridRecsAPI.ts
export const fetchHybridRecommendations = async (showId: string) => {
  const apiUrl = process.env.VITE_API_URL;
  console.log('api', apiUrl);
  const res = await fetch(`${apiUrl}/Movie/HybridRecommendations/${showId}`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to fetch hybrid recommendations');
  return await res.json();
};
