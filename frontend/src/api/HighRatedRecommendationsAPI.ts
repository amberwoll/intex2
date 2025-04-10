export const fetchHighRatedRecommendations = async (userId: string) => {
  const res = await fetch(
    `https://intex-2-1-backend-brh0g6hbeqhybcb4.eastus-01.azurewebsites.net/Movie/HighRatedRecs/${userId}`,
    {
      credentials: 'include',
    }
  );
  if (!res.ok) throw new Error('Failed to load high-rated recommendations');
  return await res.json(); // [{ showId, title }]
};
