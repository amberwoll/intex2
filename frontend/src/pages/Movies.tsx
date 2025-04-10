'use client';
import React from 'react';
import { MovieHero } from '../components/MoviePage/MovieHero';
import { NavigationBar } from '../components/UniversalLayout/NavigationBar';
import TvRecs from '../components/Carousel/TvforYou';
import MovieforYou from '../components/Carousel/MovieforYou';
import MovieRecs from '../components/Carousel/SimilarMovies';
import TopRatedMovies from '../components/Carousel/TopRatedMovies';
import { Footer } from '../components/MoviePage/Footer';

export const Movies: React.FC = () => {
  return (
    <main className="layout">
      <link
        href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <NavigationBar />
      <br></br>
      <br></br>
      <br></br>
      <MovieHero />
      <TopRatedMovies />
      <TvRecs />
      <MovieforYou />
      <MovieRecs />
      <Footer />
      <style>{`
          .layout {
            width: 100%;
            min-height: max-content;
            position: relative;
            background-color: #030a1b;
          }
        `}</style>
    </main>
  );
};
