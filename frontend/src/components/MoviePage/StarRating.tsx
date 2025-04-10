'use client';

import React, { useState } from 'react';

interface StarRatingProps {
  userId: number;
  showId: string;
  maxRating?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  userId,
  showId,
  maxRating = 5,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [hovered, setHovered] = useState<number | null>(null);

  const submitRating = async (newRating: number) => {
    try {
      const response = await fetch(
        'https://intex-2-1-backend-brh0g6hbeqhybcb4.eastus-01.azurewebsites.net/Movie/Rate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            showId,
            rating: newRating,
          }),
        }
      );

      if (!response.ok) throw new Error('Failed to submit rating');
      console.log('Rating submitted successfully');
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handleClick = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
    submitRating(newRating);
  };

  return (
    <div className="rating-container">
      {[...Array(maxRating)].map((_, index) => (
        <button
          key={index}
          className="star-button"
          onClick={() => handleClick(index)}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: `<svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.99044 1.67567C9.36406 0.777381 10.6366 0.777381 11.0102 1.67567L12.7452 5.8471L17.2486 6.20813C18.2184 6.28588 18.6116 7.49612 17.8727 8.12904L14.4416 11.0682L15.4899 15.4627C15.7156 16.4091 14.6861 17.157 13.8559 16.6499L10.0003 14.295L6.14477 16.6499C5.31451 17.157 4.28501 16.4091 4.51075 15.4627L5.55901 11.0682L2.12789 8.12904C1.38903 7.49612 1.78225 6.28588 2.75203 6.20813L7.25544 5.8471L8.99044 1.67567Z" fill="${(hovered !== null ? index <= hovered : index < rating) ? '#FFD700' : '#4A4A4A'}" fill-opacity="0.84"></path></svg>`,
            }}
          />
        </button>
      ))}

      <style>{`
        .rating-container {
          display: flex;
          gap: 6px;
          margin-top: 1rem;
        }
        .star-button {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
        }
      `}</style>
    </div>
  );
};
