'use client';
import React, { useState } from 'react';

export const MovieActions: React.FC = () => {
  const [rating, setRating] = useState<number>(0);

  const handleStarClick = (index: number) => {
    setRating(index + 1); // Set the rating to the index of the clicked star (1-5)
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    // Prevent the click event from firing when double-click happens
    e.preventDefault();
    setRating(0); // Clear the rating on double-click
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <button
          key={i}
          className="star-button"
          aria-label={`Rate movie ${i + 1} stars`}
          onClick={() => handleStarClick(i)}
          onDoubleClick={handleDoubleClick} // Clears the rating on double-click
        >
          <div
            dangerouslySetInnerHTML={{
              __html: `
              <svg width="56" height="56" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M16 24.2591L12.4773 26.3273L13.2087 21.3154L10.1014 18.6897L14.3185 18.3421L16 14.0001L17.6815 18.3421L21.8986 18.6897L18.7913 21.3154L19.5227 26.3273L16 24.2591Z" 
                  fill="${i < rating ? '#FFD700' : '#4A4A4A'}"
                />
              </svg>
              `,
            }}
          />
        </button>
      );
    }
    return stars;
  };

  return (
    <div className="actions-container">
      <div className="rating-buttons">{renderStars()}</div>

      <style react-jsx>{`
        .actions-container {
          display: flex;
          gap: 16px; /* Reduced space between stars */
          margin-bottom: 40px;
        }
        .star-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 72px; /* Increased size */
          height: 72px; /* Increased size */
          border-radius: 36px;
          background-color: transparent;
          border: none;
          cursor: pointer;
        }
        .rating-buttons {
          display: flex;
          gap: 8px; /* Reduced gap between stars */
        }
      `}</style>
    </div>
  );
};
