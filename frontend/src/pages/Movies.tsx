'use client';
import React from 'react';
import { MovieHero } from '../components/MoviePage/MovieHero'; // Adjusted the path
import TrendSection from '../components/Carousel/TrendsSection';
import { NavigationBar } from '../components/UniversalLayout/NavigationBar'; // Adjusted the path
import TvRecs from '../components/Carousel/TvforYou';
import MovieforYou from '../components/Carousel/MovieforYou';
import MovieRecs from '../components/Carousel/SimilarMovies';
import TopRatedMovies from '../components/Carousel/TopRatedMovies';

export const Movies: React.FC = () => {
  return (
    <main className="layout">
      <link
        href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <NavigationBar />
      <MovieHero />
      <TopRatedMovies />
      <TvRecs />
      <MovieforYou />
      <MovieRecs />

      <style>{`
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
