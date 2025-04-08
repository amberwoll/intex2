'use client';
import React from 'react';
import { MovieSuggestions } from './MovieSuggestions';

export const MovieInfo: React.FC = () => {
  return (
    <section className="info-section">
      <div className="genres-container">
        <span className="genre-tag">Action</span>
        <span className="genre-tag">Crime</span>
      </div>
      <h2 className="section-title">About John Wick 4</h2>
      <h3 className="subsection-title">Director</h3>
      <p className="director">Chad Stahelski</p>
      <h3 className="subsection-title">Actors</h3>
      <p className="characters">
        Keanu Reeves, Laurence Fishburne, Ian McShane, Halle Berry, and more.
      </p>
      <br></br>
      <p className="synopsis">
        With the price on his head ever increasing, legendary hitman John Wick
        takes his fight against the High Table global as he seeks out the most
        powerful players in the underworld, from New York to Paris to Japan to
        Berlin. Development of the fourth John Wick film, formally announced by
        Lionsgate in May 2019, was confirmed before the release of its
        predecessor. It is the first film in the franchise that was not written
        by franchise creator Derek Kolstad, with Hatten hired in May 2020,
        followed by Finch in March 2021. Principal photography took place from
        June to October 2021, and filming locations included France, Germany,
        New York City, and Japan.
      </p>

      <h3 className="subsection-title">Suggestions like "John Wick"</h3>
      <MovieSuggestions />

      <style react-jsx>{`
        .info-section {
          padding: 40px 48px;
          background-color: #121212;
          color: #fff;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
          max-width: 100%; /* Full width */
        }
        .section-title {
          font-size: 48px;
          color: #ffffff;
          font-weight: 700;
          font-family: 'Roboto', sans-serif;
          margin-bottom: 16px;
          line-height: 1.2;
          text-align: left; /* Left align title */
        }
        .synopsis {
          font-size: 18px;
          color: #b3b3b3;
          font-family: 'Roboto', sans-serif;
          margin-bottom: 32px;
          line-height: 1.7;
          text-align: left; /* Left align text */
        }
        .subsection-title {
          font-size: 18px; /* Smaller than main title */
          color: #d1d1d1; /* Light grey color */
          font-weight: 600;
          font-family: 'Roboto', sans-serif;
          margin-bottom: 16px;
          text-transform: uppercase;
          text-align: left; /* Left align subsection title */
        }
        .genres-container {
          display: flex;
          gap: 16px;
          margin-bottom: 32px;
          text-align: left; /* Left align genres container */
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
          text-align: left; /* Left align text */
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
