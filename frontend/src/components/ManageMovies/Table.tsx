"use client";
import { useEffect, useState } from "react";
import { moviesTitle } from "../../types/moviesTitle";
import { fetchAllMovies, deleteMovie } from "../../api/MovieApi";
import NewMovieForm from "./NewMovieForm";
import Pagination from "../Pagination";

const DarkModeDataTable = () => {
  const [allMovies, setAllMovies] = useState<moviesTitle[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedShowId, setSelectedShowId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchAllMovies();
        setAllMovies(data.movies);
      } catch (err) {
        console.error("Error loading movies:", err);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  const handleDelete = async () => {
    if (!selectedShowId) return;
    try {
      await deleteMovie(selectedShowId);
      setAllMovies((prev) => prev.filter((m) => m.showId !== selectedShowId));
      setShowConfirm(false);
      setSelectedShowId(null);
    } catch (err) {
      console.error("Error deleting movie:", err);
      setError("Failed to delete movie.");
    }
  };

  // Filter and paginate
  const filteredMovies = allMovies.filter((movie) =>
    movie.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredMovies.length / pageSize);
  const paginatedMovies = filteredMovies.slice(
    (pageNum - 1) * pageSize,
    pageNum * pageSize
  );

  if (loading) return <div>Loading Movies...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="datatable-container">
      <div className="header-bar">
        <h2>Manage Movie Library</h2>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search by Title..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPageNum(1); // Reset to page 1 on search
            }}
            className="search-input"
          />
          
          <button className="utility-button" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close Form" : "Add Movie"}
          </button>
        </div>
      </div>

      {showForm && (
        <NewMovieForm
          onSuccess={async () => {
            setShowForm(false);
            const data = await fetchAllMovies();
            setAllMovies(data.movies);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <table>
        <thead>
          <tr>
            <th>ShowId</th>
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Type</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedMovies.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>No movies found.</td>
            </tr>
          ) : (
            paginatedMovies.map((movie, index) => (
              <tr key={index}>
                <td>{movie.showId}</td>
                <td>{movie.title}</td>
                <td>{movie.director}</td>
                <td>{movie.releaseYear}</td>
                <td>{movie.type}</td>
                <td>{movie.rating}</td>
                <td>
                  <button className="btn btn-success" onClick={() => alert("TODO: Edit")}>Edit</button>
                  <button className="btn btn-danger" onClick={() => {
                    setSelectedShowId(movie.showId!);
                    setShowConfirm(true);
                  }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => setPageSize(newSize)}
      />

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete this movie?</p>
            <div className="modal-actions">
              <button className="btn btn-danger" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style react-jsx>{`
        .datatable-container {
          background-color: #121212;
          color: #ebfaff;
          min-height: 100vh;
          width: 100%;
          margin: 0 auto;
          padding: 48px;
          font-family: Inter, sans-serif;
          box-sizing: border-box;
        }

        .header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .search-input {
          background-color: #2a2a2a;
          color: white;
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #444;
        }

        .utility-button {
          background-color: #228ee5;
          border: none;
          color: white;
          padding: 10px 16px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 32px;
          box-shadow: 0 0 0 1px #333;
        }

        th, td {
          padding: 14px;
          border: 1px solid #333;
          text-align: left;
        }

        th {
          background-color: #1f1f1f;
          font-size: 12px;
          letter-spacing: 0.5px;
        }

        tr:nth-child(even) {
          background-color: #1c1c1c;
        }

        .btn {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          margin-right: 6px;
        }

        .btn-success {
          background-color: #4caf50;
          color: white;
        }

        .btn-danger {
          background-color: #f44336;
          color: white;
        }

        .btn-secondary {
          background-color: #555;
          color: white;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal {
          background: #1e1e1e;
          padding: 32px;
          border-radius: 10px;
          text-align: center;
          color: #fff;
          width: 300px;
        }

        .modal-actions {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default DarkModeDataTable;
