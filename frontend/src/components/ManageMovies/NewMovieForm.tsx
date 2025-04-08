import { useState } from "react";
import { moviesTitle } from "../../types/moviesTitle";
import { addMovie } from "../../api/MovieApi";

interface NewMovieFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewMovieForm = ({ onSuccess, onCancel }: NewMovieFormProps) => {
  const [formData, setFormData] = useState<moviesTitle>({
    showId: "",
    type: "",
    title: "",
    director: "",
    cast: "",
    country: "",
    releaseYear: 0,
    rating: "",
    duration: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addMovie(formData);
      onSuccess(); // Trigger parent to refresh movie list
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
        name="showId"
        placeholder="Show ID"
        value={formData.showId}
        onChange={handleChange}
        required
      />
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

      <div style={{ marginTop: "16px" }}>
        <button type="submit" className="btn btn-success">
          Add Movie
        </button>
        <button type="button" onClick={onCancel} className="btn btn-danger" style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewMovieForm;
