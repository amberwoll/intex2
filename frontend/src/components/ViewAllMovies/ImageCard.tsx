'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

interface ImageCardProps {
  imageUrl: string;
  altText?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  imageUrl,
  altText = 'Image',
}) => {
  const [imageError, setImageError] = useState(false);

  // Reset imageError when the imageUrl changes
  useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

  return (
    <figure className="image-card">
      {!imageError ? (
        <img
          src={imageUrl}
          alt={altText}
          className="card-image"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="fallback">
          <span>{altText}</span>
          <small>(no image available)</small>
        </div>
      )}

      <style jsx>{`
        .image-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 300px;
          aspect-ratio: 3 / 4;
          border-radius: 12px;
          background-color: #e7f2fc;
          overflow: hidden;
          margin: 0 auto;
          justify-content: center;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .fallback {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
          color: #444;
          font-size: 16px;
          padding: 1rem;
          text-align: center;
        }

        .fallback small {
          font-size: 10px;
          color: #888;
        }
      `}</style>
    </figure>
  );
};
