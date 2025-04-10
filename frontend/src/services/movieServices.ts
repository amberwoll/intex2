// src/services/movieService.ts
export const addMovie = async (movieData: any) => {
  try {
    const res = await fetch(
      'https://intex-2-1-backend-brh0g6hbeqhybcb4.eastus-01.azurewebsites.net/Movie/AddMovie',
      {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData),
      }
    );

    if (!res.ok) {
      const message = await res.text();
      throw new Error(message);
    }

    const data = await res.json();
    console.log('Movie added:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const deleteMovie = async (showId: string) => {
  try {
    const response = await fetch(
      `https://intex-2-1-backend-brh0g6hbeqhybcb4.eastus-01.azurewebsites.net/Movie/Delete/${showId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete movie.');
    }

    return await response.text();
  } catch (error) {
    console.error(error);
  }
};
