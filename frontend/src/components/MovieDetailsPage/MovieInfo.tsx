"use client";
import React from "react";
import { MovieSuggestions } from "./MovieSuggestions";

export const MovieInfo: React.FC = () => {
  return (
    <section className="info-section">
      <h2 className="section-title">about John Wick 4</h2>
      <p className="synopsis">
        With the price on his head ever increasing, legendary hit man John Wick
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

      <h3 className="subsection-title">Genres</h3>
      <div className="genres-container">
        <span className="genre-tag">Action</span>
        <span className="genre-tag">Crime</span>
      </div>

      <h3 className="subsection-title">Characters</h3>
      <h3 className="subsection-title">Director</h3>

      <h3 className="subsection-title">Suggestion like "John Wick"</h3>
      <MovieSuggestions />

      <style react-jsx>{`
        .info-section {
          padding: 40px 48px;
        }
        .section-title {
          font-size: 72px;
          color: #ffffff;
          font-weight: 700;
          font-family: Lato;
          margin-bottom: 24px;
        }
        .synopsis {
          font-size: 24px;
          color: #ffffff;
          font-family: Lato;
          margin-bottom: 40px;
        }
        .subsection-title {
          font-size: 48px;
          color: #ffffff;
          font-weight: 700;
          font-family: Lato;
          margin-bottom: 24px;
        }
        .genres-container {
          display: flex;
          gap: 16px;
          margin-bottom: 40px;
        }
        .genre-tag {
          padding: 12px 28px;
          background-color: #ec5baa;
          border-radius: 25px;
          font-size: 14px;
          color: #ffffff;
          font-family: Lato;
        }
        @media (max-width: 991px) {
          .info-section {
            padding: 40px 24px;
          }
          .section-title {
            font-size: 56px;
          }
        }
        @media (max-width: 640px) {
          .info-section {
            padding: 40px 16px;
          }
          .section-title {
            font-size: 40px;
          }
        }
      `}</style>
    </section>
  );
};
