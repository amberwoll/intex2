"use client";
import { useEffect, useState } from "react";
import { moviesTitle } from "../../types/moviesTitle";
import {  fetchMovies } from "../../api/MovieApi";
import NewMovieForm from "./NewMovieForm";

export const DarkModeDataTable = () => {
  const [data, setData] = useState<moviesTitle[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const response = await fetchMovies(itemsPerPage, currentPage, "asc", []);
        setData(response.movies); // match the property name in the API response
      } catch (error) {
        console.error("Error loading movies:", error);
      }
    };

    loadMovies();
  }, [currentPage]);

  const handleDelete = (index: number) => {
    const globalIndex = (currentPage - 1) * itemsPerPage + index;
    setData(data.filter((_, i) => i !== globalIndex));
    if (editingIndex === globalIndex) {
      setEditingIndex(null);
    }
  };

  const handleEdit = (index: number) => {
    const globalIndex = (currentPage - 1) * itemsPerPage + index;
    setEditingIndex(globalIndex);
    setShowForm(true);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="datatable-container">
      <div className="header-bar">
        <h2>Manage Movie Library</h2>
        <div className="header-actions">
          <button className="utility-button">Search</button>
          <button className="utility-button">Filter</button>
          <button className="utility-button" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close Form" : "Add Movie"}
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Type</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>No movies yet.</td>
            </tr>
          ) : (
            paginatedData.map((movie, index) => (
              <tr key={index}>
                <td>{movie.title}</td>
                <td>{movie.director}</td>
                <td>{movie.releaseYear}</td>
                <td>{movie.type}</td>
                <td>{movie.rating}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showForm && (
        <NewMovieForm
          onSuccess={() => {
            setShowForm(false);
            // Optionally refresh list or optimistically update
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </button>
      </div>

      <style react-jsx>{`
        .datatable-container {
          background-color: #121212;
          color: #ebfaff;
          min-height: 100vh;
          width: 100%;
          max-width: 100%;
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
        button {
          margin-right: 6px;
          background-color: #228ee5;
          border: none;
          color: white;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin-top: 24px;
        }
        .pagination button {
          padding: 8px 16px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default DarkModeDataTable;
