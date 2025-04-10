export const fetchHybridRecommendations = async (showId: string) => {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(
    `https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net/Movie/HybridRecommendations/${showId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`

      },
    }
  );

  if (!res.ok) throw new Error('Failed to fetch hybrid recommendations');
  return await res.json();
};
