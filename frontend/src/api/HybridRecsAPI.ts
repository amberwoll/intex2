// ✅ HybridRecsAPI.ts
export const fetchHybridRecommendations = async (showId: string) => {
  const apiUrl = process.env.VITE_API_URL;
  console.log('api', apiUrl);
  const res = await fetch(
    `https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net/Movie/HybridRecommendations/${showId}`,
    {
      credentials: 'include',
    }
  );

  if (!res.ok) throw new Error('Failed to fetch hybrid recommendations');
  return await res.json();
};
