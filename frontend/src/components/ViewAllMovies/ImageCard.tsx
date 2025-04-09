"use client";

import * as React from "react";

interface ImageCardProps {
  imageUrl: string;
  altText?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  imageUrl,
  altText = "",
}) => {
  return (
    <figure className="image-card">
      <img src={imageUrl} alt={altText} className="card-image" />
      <style react-jsx>{`
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
        }
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      `}</style>
    </figure>
  );
};
