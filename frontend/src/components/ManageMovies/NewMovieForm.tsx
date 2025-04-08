import { useState } from "react";
import { moviesTitle } from "../../types/moviesTitle";
import { addMovie } from "../../api/MovieApi";

interface NewMovieFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const genreOptions = [
  { label: "Action", key: "action" },
  { label: "Adventure", key: "adventure" },
  { label: "Comedies", key: "comedies" },
  { label: "Documentaries", key: "documentaries" },
  { label: "Dramas", key: "dramas" },
  { label: "Fantasy", key: "fantasy" },
  { label: "Horror", key: "horrorMovies" },
  { label: "Thrillers", key: "thrillers" },
];

const NewMovieForm = ({ onSuccess, onCancel }: NewMovieFormProps) => {
  const [formData, setFormData] = useState<Omit<moviesTitle, "showId">>({
    type: "",
    title: "",
    director: "",
    cast: "",
    country: "",
    releaseYear: 0,
    rating: "",
    duration: "",
    description: "",
    action: 0,
    adventure: 0,
    animeSeriesInternationalTvShows: 0,
    britishTvShowsDocuseriesInternationalTvShows: 0,
    children: 0,
    comedies: 0,
    comediesDramasInternationalMovies: 0,
    comediesInternationalMovies: 0,
    comediesRomanticMovies: 0,
    crimeTvShowsDocuseries: 0,
    documentaries: 0,
    documentariesInternationalMovies: 0,
    docuseries: 0,
    dramas: 0,
    dramasInternationalMovies: 0,
    dramasRomanticMovies: 0,
    familyMovies: 0,
    fantasy: 0,
    horrorMovies: 0,
    internationalMoviesThrillers: 0,
    internationalTvShowsRomanticTvShowsTvDramas: 0,
    kidsTv: 0,
    languageTvShows: 0,
    musicals: 0,
    natureTv: 0,
    realityTv: 0,
    spirituality: 0,
    tvAction: 0,
    tvComedies: 0,
    tvDramas: 0,
    talkShowsTvComedies: 0,
    thrillers: 0,
  });

  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const genreField = genreOptions.reduce((acc, genre) => {
      acc[genre.key as keyof moviesTitle] = genre.key === selectedGenre ? 1 : 0;
      return acc;
    }, {} as Partial<moviesTitle>);

    const movieToAdd: moviesTitle = {
      ...formData,
      ...genreField,
    };

    try {
      await addMovie(movieToAdd);
      onSuccess();
    } catch (error) {
      console.error("Failed to add movie:", error);
      alert("Failed to add movie. Check console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
      <h2 style={{ color: "#EBFAFF" }}>Add New Movie</h2>

      <input
        type="text"
        name="type"
        placeholder="Type"
        value={formData.type}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="director"
        placeholder="Director"
        value={formData.director}
        onChange={handleChange}
      />
      <input
        type="text"
        name="cast"
        placeholder="Cast"
        value={formData.cast}
        onChange={handleChange}
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
      />
      <input
        type="number"
        name="releaseYear"
        placeholder="Release Year"
        value={formData.releaseYear}
        onChange={handleChange}
      />
      <input
        type="text"
        name="rating"
        placeholder="Rating"
        value={formData.rating}
        onChange={handleChange}
      />
      <input
        type="text"
        name="duration"
        placeholder="Duration"
        value={formData.duration}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <div style={{ marginTop: "12px" }}>
        <label style={{ color: "#EBFAFF" }}>Select Genre:</label>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          style={{ padding: "10px", marginLeft: "10px" }}
          required
        >
          <option value="">-- Choose a genre --</option>
          {genreOptions.map((genre) => (
            <option key={genre.key} value={genre.key}>
              {genre.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "16px" }}>
        <button type="submit" className="btn btn-success">
          Add Movie
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-danger"
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewMovieForm;
