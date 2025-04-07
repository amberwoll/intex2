import React from "react";

interface MovieThumbnail {
  image: string;
  altText: string;
}

interface MovieThumbnailsProps {
  thumbnails: MovieThumbnail[];
}

export const MovieThumbnails: React.FC<MovieThumbnailsProps> = ({
  thumbnails,
}) => {
  return (
    <div className="thumbnails-container">
      {thumbnails.map((thumbnail, index) => (
        <div key={index} className="thumbnail-wrapper">
          <img
            src={thumbnail.image}
            alt={thumbnail.altText}
            className="thumbnail-image"
          />
        </div>
      ))}

      <style react-jsx>{`
        .thumbnails-container {
          display: flex;
          gap: 10px;
          position: absolute;
          right: 0;
          bottom: 40px;
        }
        .thumbnail-wrapper {
          width: 122px;
          height: 122px;
          border-radius: 20px;
          border: 0.5px solid rgba(0, 100, 134, 0.99);
          overflow: hidden;
          position: relative;
        }
        .thumbnail-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @media (max-width: 991px) {
          .thumbnails-container {
            right: 20px;
          }
        }
        @media (max-width: 640px) {
          .thumbnails-container {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
