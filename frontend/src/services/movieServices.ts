// src/services/movieService.ts
export const addMovie = async (movieData: any) => {
  try {
    const res = await fetch('https://localhost:5500/Movie/AddMovie', {
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
      `https://localhost:5500/Movie/Delete/${showId}`,
      {
        method: 'DELETE',
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
