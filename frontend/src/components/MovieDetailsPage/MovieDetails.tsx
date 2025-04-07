"use client";
import React, { useEffect } from "react";
import { MovieHero } from "./MovieHero";
import { MovieInfo } from "./MovieInfo";

const ModalWrapper: React.FC<{ onClose: () => void; children: React.ReactNode }> = ({ onClose, children }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>✕</button>
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
        }
        .close-button {
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 20px;
          color: #ebfaff;
          background: none;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export const MovieDetails: React.FC<{ onClose?: () => void }> = ({ onClose = () => {} }) => {
  return (
    <ModalWrapper onClose={onClose}>
      <main className="movie-details">
        <MovieHero />
        <MovieInfo />
        <style react-jsx>{`
          .movie-details {
            width: 100%;
            min-height: 100%;
            background-color: #030a1b;
          }
        `}</style>
      </main>
    </ModalWrapper>
  );
};

export default MovieDetails;
