'use client';
import React from 'react';
import { MovieSuggestions } from './MovieSuggestions';

interface MovieInfoProps {
  movie: {
    title: string;
    director: string;
    actors: string;
    synopsis: string;
    genres: string[];
  };
}

export const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {
  return (
    <section className="info-section">
      <div className="genres-container">
        {movie.genres.map((genre, index) => (
          <span key={index} className="genre-tag">
            {genre}
          </span>
        ))}
      </div>

      <h2 className="section-title">About {movie.title}</h2>

      <h3 className="subsection-title">Director</h3>
      <p className="director">{movie.director}</p>

      <h3 className="subsection-title">Actors</h3>
      <p className="characters">{movie.actors}</p>

      <br />
      <p className="synopsis">{movie.synopsis}</p>

      <h3 className="subsection-title">Suggestions like "{movie.title}"</h3>
      <MovieSuggestions />

      <style react-jsx>{`
        .info-section {
          padding: 40px 48px;
          background-color: #121212;
          color: #fff;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
          max-width: 100%;
        }
        .section-title {
          font-size: 48px;
          color: #ffffff;
          font-weight: 700;
          font-family: 'Roboto', sans-serif;
          margin-bottom: 16px;
          line-height: 1.2;
          text-align: left;
        }
        .synopsis {
          font-size: 18px;
          color: #b3b3b3;
          font-family: 'Roboto', sans-serif;
          margin-bottom: 32px;
          line-height: 1.7;
          text-align: left;
        }
        .subsection-title {
          font-size: 18px;
          color: #d1d1d1;
          font-weight: 600;
          font-family: 'Roboto', sans-serif;
          margin-bottom: 16px;
          text-transform: uppercase;
          text-align: left;
        }
        .genres-container {
          display: flex;
          gap: 16px;
          margin-bottom: 32px;
          text-align: left;
        }
        .genre-tag {
          padding: 12px 24px;
          background-color: #333;
          border-radius: 25px;
          font-size: 14px;
          color: #ffffff;
          font-family: 'Roboto', sans-serif;
          text-transform: uppercase;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .genre-tag:hover {
          background-color: #e50914;
        }
        .characters, .director {
          font-size: 18px;
          color: #b3b3b3;
          font-family: 'Roboto', sans-serif;
          margin-bottom: 1px;
          text-align: left;
        }
        .genres-container .genre-tag:first-child {
          margin-left: 0;
        }
        @media (max-width: 991px) {
          .info-section {
            padding: 40px 24px;
          }
          .section-title {
            font-size: 36px;
          }
          .subsection-title {
            font-size: 22px;
          }
          .synopsis {
            font-size: 16px;
          }
        }
        @media (max-width: 640px) {
          .info-section {
            padding: 32px 16px;
          }
          .section-title {
            font-size: 28px;
          }
          .subsection-title {
            font-size: 10px;
          }
          .synopsis {
            font-size: 10px;
          }
        }
      `}</style>
    </section>
  );
};
