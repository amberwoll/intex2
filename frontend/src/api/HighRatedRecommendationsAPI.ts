export const fetchHighRatedRecommendations = async (userId: string) => {
  const res = await fetch(
    `https://localhost:5500/Movie/HighRatedRecs/${userId}`,
    {
      credentials: 'include',
    }
  );
  if (!res.ok) throw new Error('Failed to load high-rated recommendations');
  return await res.json(); // [{ showId, title }]
};
