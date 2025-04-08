'use client';
import React, { useEffect } from 'react';
import { MovieHero } from './MovieHero';
import { MovieInfo } from './MovieInfo';
import { MovieControls } from './MovieControls';
import { MovieActions } from './MovieActions';

const ModalWrapper: React.FC<{
  onClose: () => void;
  children: React.ReactNode;
}> = ({ onClose, children }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleClose = () => {
    window.history.back(); // Go back to the previous page when closing the modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={handleClose}>
          ✕
        </button>
        {children}
      </div>
      <style react-jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-content {
          background: #111;
          padding: 32px;
          border-radius: 12px;
          width: 100%;
          max-width: 960px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .close-button {
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 36px; /* Increased the font size of the close button */
          color: #ebfaff;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 1100; /* Ensure close button is above other content */
          transition: transform 0.3s ease; /* Smooth transition effect */
        }
        .close-button:hover {
          transform: scale(1.2); /* Slightly enlarge the button on hover */
        }
      `}</style>
    </div>
  );
};

export const MovieDetails: React.FC<{ onClose?: () => void }> = ({
  onClose = () => {},
}) => {
  return (
    <ModalWrapper onClose={onClose}>
      <main className="movie-details">
        <div className="movie-hero-container">
          <MovieHero />
          <div className="title-holder">
            <h1>John Wick 4</h1>
          </div>
          <div className="overlay-controls">
            <MovieControls />
            <MovieActions />
          </div>
        </div>
        <MovieInfo />
        <style react-jsx>{`
          .movie-details {
            width: 100%;
            min-height: 100%;
            background-color: #030a1b;
          }
          .movie-hero-container {
            position: relative;
            width: 100%;
            max-height: 60vh;
            overflow: hidden;
          }
          .title-holder {
            position: absolute;
            bottom: 170px; /* Move title further down */
            left: 16px;
            color: #fff;
            font-size: 22px; /* Smaller font size */
            font-weight: bold;
            z-index: 5;
          }
          .overlay-controls {
            position: absolute;
            bottom: 16px;
            left: 16px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            z-index: 10;
          }
        `}</style>
      </main>
    </ModalWrapper>
  );
};

export default MovieDetails;
