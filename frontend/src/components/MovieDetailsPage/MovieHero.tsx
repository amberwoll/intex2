'use client';
import React from 'react';
import { MovieActions } from './MovieActions';
import { MovieControls } from './MovieControls';

interface MovieHeroProps {
  title: string;
  duration: string;
  posterUrl: string;
}

export const MovieHero: React.FC<MovieHeroProps> = ({
  title,
  duration,
  posterUrl,
}) => {
  return (
    <section className="hero-section">
      <img
        src={posterUrl}
        alt={`${title} movie poster`}
        className="hero-image"
      />
      <div className="content-wrapper">
        <div className="hero-content">
          <h1 className="title">{title}</h1>
          <p className="metadata">{duration}</p>
          <MovieActions />
          <MovieControls />
        </div>
      </div>

      <style react-jsx>{`
        .hero-section {
          position: relative;
          width: 100%;
          height: 760px;
        }
        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(3, 10, 27, 0.5);
          transform: rotate(-16.53deg);
          z-index: 1;
        }
        .content-wrapper {
          position: absolute;
          top: 19px;
          left: 0;
          right: 0;
          padding-left: 40px;
          padding-right: 40px;
          z-index: 2;
        }
        .hero-content {
          position: absolute;
          bottom: 80px;
          left: 104px;
        }
        .title {
          font-size: 72px;
          color: #ffffff;
          font-weight: 700;
          font-family: Lato;
          margin-bottom: 12px;
        }
        .metadata {
          font-size: 24px;
          color: #ebfaff;
          font-family: Lato;
          margin-bottom: 32px;
        }
        @media (max-width: 991px) {
          .content-wrapper {
            padding-left: 20px;
            padding-right: 20px;
          }
          .hero-content {
            left: 40px;
          }
          .title {
            font-size: 56px;
          }
        }
        @media (max-width: 640px) {
          .content-wrapper {
            padding-left: 16px;
            padding-right: 16px;
          }
          .hero-content {
            left: 20px;
          }
          .title {
            font-size: 40px;
          }
        }
      `}</style>
    </section>
  );
};
