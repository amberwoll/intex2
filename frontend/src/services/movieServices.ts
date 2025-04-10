// src/services/movieService.ts
export const addMovie = async (movieData: any) => {
  try {
    const res = await fetch('https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net/Movie/AddMovie', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movieData),
    });

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
      `https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net/Movie/DeleteMovie/${showId}`,
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
