export const fetchHighRatedRecommendations = async (userId: string) => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(
    `https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net/Movie/HighRatedRecs/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) throw new Error('Failed to load high-rated recommendations');
  return await res.json(); // [{ showId, title }]
};
