'use client';
import React from 'react';
import { MovieHero } from '../components/MoviePage/MovieHero'; // Adjusted the path
export const Movies: React.FC = () => {
  return (
    <main className="layout">
      <link
        href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <MovieHero />

      <style react-jsx>{`
        .layout {
          width: 100%;
          height: 762px;
          position: relative;
          background-color: #030a1b;
        }
      `}</style>
    </main>
  );
};
