import React from "react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  maxRating = 5,
}) => {
  return (
    <div className="rating-container">
      {[...Array(maxRating)].map((_, index) => (
        <div key={index}>
          <div
            dangerouslySetInnerHTML={{
              __html: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.99044 1.67567C9.36406 0.777381 10.6366 0.777381 11.0102 1.67567L12.7452 5.8471L17.2486 6.20813C18.2184 6.28588 18.6116 7.49612 17.8727 8.12904L14.4416 11.0682L15.4899 15.4627C15.7156 16.4091 14.6861 17.157 13.8559 16.6499L10.0003 14.295L6.14477 16.6499C5.31451 17.157 4.28501 16.4091 4.51075 15.4627L5.55901 11.0682L2.12789 8.12904C1.38903 7.49612 1.78225 6.28588 2.75203 6.20813L7.25544 5.8471L8.99044 1.67567Z" fill="#E5DB22" fill-opacity="0.84"></path></svg>`,
            }}
          />
        </div>
      ))}
      <div className="rating-indicator" style={{ width: "8px" }} />

      <style react-jsx>{`
        .rating-container {
          display: flex;
          gap: 4px;
        }
        .rating-indicator {
          height: 18px;
          opacity: 0.84;
          background-color: #e5db22;
        }
      `}</style>
    </div>
  );
};
