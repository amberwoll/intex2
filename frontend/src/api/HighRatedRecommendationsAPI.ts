export const fetchHighRatedRecommendations = async (userId: string) => {
  const res = await fetch(
    `https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net/Movie/HighRatedRecs/${userId}`,
    {
      credentials: 'include',
    }
  );
  if (!res.ok) throw new Error('Failed to load high-rated recommendations');
  return await res.json(); // [{ showId, title }]
};
