// MovieRecs.tsx
'use client';
import TrendCard from './TrendCard';

const MovieRecs = () => {
  const placeholderCards = Array.from({ length: 6 }, (_, i) => ({
    imageUrl: '',
    title: `Suggested Movie ${i + 1}`,
  }));

  return (
    <section
      className="trends-section"
      role="region"
      aria-label="Suggested Movies"
    >
      <h2 className="trends-title">Because you loved ___</h2>
      <div className="trends-scroll-container">
        <div className="trends-grid">
          {placeholderCards.map((rec, index) => (
            <TrendCard key={index} imageUrl={rec.imageUrl} title={rec.title} />
          ))}
        </div>
      </div>

      <style>{`
        .trends-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 22px;
          width: 100%;
          background-color: #0a0a0a; /* darker to distinguish */
          padding: 40px 48px;
        }

        .trends-title {
          color: #ffffff;
          font-size: 40px;
          font-family: Lato;
          font-weight: 700;
        }

        .trends-scroll-container {
          width: 100%;
          overflow-x: auto;
        }

        .trends-grid {
          display: flex;
          align-items: center;
          gap: 32px;
          min-width: max-content;
        }

        @media (max-width: 991px) {
          .trends-section {
            padding-left: 24px;
            padding-right: 24px;
          }

          .trends-title {
            font-size: 36px;
          }
        }

        @media (max-width: 640px) {
          .trends-section {
            padding-left: 16px;
            padding-right: 16px;
          }

          .trends-title {
            font-size: 28px;
          }
        }
      `}</style>
    </section>
  );
};

export default MovieRecs;
