"use client";
import TrendCard from "./TrendCard";
import SeeMoreButton from "./SeeMoreButton";

const TrendsSection = () => {
  const trendImages = [
    "https://cdn.builder.io/api/v1/image/assets/TEMP/4eb6fba6f589b16353b563aa80cd01bb82ce7208",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/3236c2ec5ed66130fa2c62885bfc0992b0773942",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/ce6a0dba6838f8724f2b691ca2a2a90e532b8e70",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/c21c7597f1d3affceefbfa388bc5a3fb3760d73b",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/a414dcf3dbc873f20019405bb2f7cedfb92c6754",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/78480394c655a71a38ece683ec80083fa69aec8b",
  ];

  return (
    <section className="trends-container">
      <div className="trends-wrapper">
        <div className="trends-content">
          <h1 className="trends-title">Trends</h1>
          <div className="trends-gallery-container">
            <div className="trends-gallery">
              {trendImages.map((imageUrl, index) => (
                <TrendCard key={index} imageUrl={imageUrl} />
              ))}
            </div>
            <SeeMoreButton />
          </div>
        </div>
      </div>

      <style react-jsx>{`
        .trends-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #000000;
          padding: 40px 20px;
        }
        .trends-wrapper {
          max-width: 1440px;
          width: 100%;
        }
        .trends-content {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .trends-title {
          color: #ebfaff;
          font-size: 48px;
          font-weight: 700;
          font-family: Lato;
        }
        .trends-gallery-container {
          position: relative;
          width: 100%;
        }
        .trends-gallery {
          display: flex;
          gap: 32px;
          overflow-x: auto;
          padding: 0 48px 20px;
        }
        @media (max-width: 640px) {
          .trends-title {
            font-size: 36px;
          }
          .trends-gallery {
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default TrendsSection;
