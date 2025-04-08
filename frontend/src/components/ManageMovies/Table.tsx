"use client";
import React, { useState } from "react";

export const DarkModeDataTable = () => {
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({ name: "", director: "", year: "", type: "", genre: "" });
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleDelete = (index) => {
    const globalIndex = (currentPage - 1) * itemsPerPage + index;
    setData(data.filter((_, i) => i !== globalIndex));
    if (editingIndex === globalIndex) {
      setEditingIndex(null);
      setForm({ name: "", director: "", year: "", type: "", genre: "" });
    }
  };

  const handleEdit = (index) => {
    const globalIndex = (currentPage - 1) * itemsPerPage + index;
    setEditingIndex(globalIndex);
    setForm(data[globalIndex]);
    setShowForm(true);
  };

  const handleSave = () => {
    const updated = [...data];
    updated[editingIndex] = form;
    setData(updated);
    setEditingIndex(null);
    setForm({ name: "", director: "", year: "", type: "", genre: "" });
    setShowForm(false);
  };

  const handleAdd = () => {
    setData([...data, form]);
    setForm({ name: "", director: "", year: "", type: "", genre: "" });
    setShowForm(false);
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
            <th>Name</th>
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
              <td colSpan="6" style={{ textAlign: "center" }}>No movies yet.</td>
            </tr>
          ) : (
            paginatedData.map((movie, index) => (
              <tr key={index}>
                <td>{movie.name}</td>
                <td>{movie.director}</td>
                <td>{movie.year}</td>
                <td>{movie.type}</td>
                <td>{movie.genre}</td>
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
        <div className="form">
          <input type="text" placeholder="Movie Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input type="text" placeholder="Director" value={form.director} onChange={(e) => setForm({ ...form, director: e.target.value })} />
          <input type="number" placeholder="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
          <input type="text" placeholder="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
          <input type="text" placeholder="Genre" value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} />
          <button onClick={editingIndex !== null ? handleSave : handleAdd}>
            {editingIndex !== null ? "Save" : "Add Movie"}
          </button>
        </div>
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
        input {
          background-color: #2a2a2a;
          border: 1px solid #555;
          color: #fff;
          padding: 10px;
          margin-right: 8px;
          border-radius: 4px;
          min-width: 140px;
        }
        .form {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 24px;
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
