"use client";
import React from "react";

export const MovieSuggestions: React.FC = () => {
  const suggestions = [
    {
      id: 1,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1c3687f3bf58df63bc889d3e6187219df2985eaa",
    },
    {
      id: 2,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/8a0e634fd7886c51f4616c0d32cd6dd559dc94b7",
    },
    {
      id: 3,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2ec45a161b40b492dabcc363b2667b7013d78d30",
    },
    {
      id: 4,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/b7f8b85806c48d5ec16393884c27dd9c4b914b48",
    },
    {
      id: 5,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e3baa5f73ba6e50e65e6c5ee39667479e9c5c83c",
    },
  ];

  return (
    <div className="suggestions-container">
      {suggestions.map((suggestion) => (
        <div key={suggestion.id} className="suggestion-card">
          <img
            src={suggestion.image}
            alt={`Movie suggestion ${suggestion.id}`}
            className="suggestion-image"
          />
          <div className="overlay">
            <div className="indicator" />
          </div>
        </div>
      ))}

      <style react-jsx>{`
        .suggestions-container {
          display: flex;
          gap: 72px;
          overflow-x: auto;
        }
        .suggestion-card {
          width: 208px;
          height: 296px;
          flex-shrink: 0;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }
        .suggestion-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background-color: rgba(0, 0, 0, 0.52);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .indicator {
          width: 24px;
          height: 24px;
          background-color: #ebfaff;
          border-radius: 2px;
        }
        @media (max-width: 991px) {
          .suggestions-container {
            gap: 40px;
          }
        }
        @media (max-width: 640px) {
          .suggestions-container {
            gap: 24px;
          }
        }
      `}</style>
    </div>
  );
};
