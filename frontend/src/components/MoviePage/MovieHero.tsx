"use client";
import React from "react";
import { StarRating } from "./StarRating";
import { MovieThumbnails } from "./MovieThumbnails";

export const MovieHero: React.FC = () => {
  const thumbnails = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3a5669d3ed58099b8c71c61ae89a3314013d4bbf",
      altText: "Film poster 1",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/30adfafa7b1242c8629b70f58add58d710dc5011",
      altText: "Film poster 2",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/dec604ea976cc3387c3af473e752dc1c0716f72b",
      altText: "Film poster 3",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c45f39192d3b30ff8e6a47515c47fb7562b7e2ae",
      altText: "Film poster 4",
    },
  ];

  return (
    <section className="hero-section">
      <div className="hero-content">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5eb3e8c211632bdcb4db94abecb2be85e3e9824"
          alt="The Witcher"
          className="hero-logo"
        />
        <div className="movie-details">
          <h1 className="movie-title">The Witcher</h1>
          <p className="movie-description">
            Geralt of Rivia, a mutated monster-hunter for hire, journeys toward
            his destiny in a turbulent world where people often prove more
            wicked than beasts
          </p>
          <div className="rating-wrapper">
            <StarRating rating={4} />
            <div className="imdb-rating">
              <div className="imdb-logo-wrapper">
                <div className="imdb-background" />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c12757160b80bdd41cd69aa6e834d9786bcf1900"
                  alt="IMDB"
                  className="imdb-logo"
                />
              </div>
              <span className="rating-score">8.1</span>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/31f778501a8b519d606a22d4fb1960a191d79f69"
              alt="Netflix"
              className="netflix-logo"
            />
          </div>
        </div>
        <div className="action-buttons">
          <button className="watch-button">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 3.76838C1 2.81763 2.01933 2.21493 2.8524 2.67311L10.5461 6.90466C11.4096 7.37957 11.4096 8.62029 10.5461 9.0952L2.8524 13.3267C2.01933 13.7849 1 13.1822 1 12.2315V3.76838Z"
                fill="#EBFAFF"
              />
            </svg>
            Watch Movie
          </button>
          <button className="info-button">
            More Info
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.00391 13.0041L14.0039 8.00415M14.0039 8.00415L9.00391 3.00415M14.0039 8.00415L2.00391 8.00415"
                stroke="#EBFAFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <MovieThumbnails thumbnails={thumbnails} />

      <style react-jsx>{`
        .hero-section {
          position: relative;
          padding-left: 134px;
          padding-top: 154px;
        }
        .hero-content {
          margin-top: 6px;
        }
        .hero-logo {
          width: 650px;
          height: 311px;
        }
        .movie-title {
          color: #ebfaff;
          font-family: "Lato", sans-serif;
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .movie-description {
          max-width: 429px;
          color: #fff;
          font-family: "Lato", sans-serif;
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 10px;
        }
        .rating-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .imdb-rating {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .imdb-logo-wrapper {
          width: 38px;
          height: 17px;
          position: relative;
        }
        .imdb-background {
          width: 100%;
          height: 100%;
          border-radius: 4px;
          background-color: #d9d9d9;
        }
        .imdb-logo {
          width: 92px;
          height: 30px;
          position: absolute;
          left: -2px;
          top: -5px;
        }
        .rating-score {
          color: #fff;
          font-family: "Lato", sans-serif;
          font-size: 16px;
          font-weight: 500;
        }
        .netflix-logo {
          width: 54px;
          height: 14px;
        }
        .action-buttons {
          display: flex;
          gap: 11px;
          margin-top: 20px;
        }
        .watch-button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 24px;
          border-radius: 28px;
          font-family: "Lato", sans-serif;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          color: #ebfaff;
          background-color: #228ee5;
          border: none;
        }
        .info-button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 24px;
          border-radius: 28px;
          font-family: "Lato", sans-serif;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          border: 1px solid #228ee5;
          color: #ebfaff;
          background: transparent;
        }
        @media (max-width: 991px) {
          .hero-section {
            padding-left: 60px;
          }
          .hero-logo {
            width: 500px;
            height: auto;
          }
          .movie-description {
            max-width: 380px;
          }
        }
        @media (max-width: 640px) {
          .hero-section {
            padding-left: 20px;
            padding-top: 100px;
          }
          .hero-logo {
            width: 300px;
          }
          .movie-title {
            font-size: 36px;
          }
          .movie-description {
            font-size: 14px;
            max-width: 300px;
          }
          .action-buttons {
            flex-direction: column;
            gap: 10px;
          }
          .watch-button,
          .info-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};
