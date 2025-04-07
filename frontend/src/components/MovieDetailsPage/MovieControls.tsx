"use client";
import React from "react";

export const MovieControls: React.FC = () => {
  return (
    <div className="controls-container">
      <button className="watch-button" aria-label="Watch movie now">
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 9.42108C2.5 7.04419 5.04833 5.53744 7.131 6.6829L26.3653 17.2618C28.524 18.449 28.524 21.5508 26.3653 22.7381L7.13099 33.317C5.04833 34.4625 2.5 32.9557 2.5 30.5788V9.42108Z" fill="#EBFAFF"></path></svg>',
          }}
        />
        <span>Watch Now</span>
      </button>
      <button className="preview-button" aria-label="Watch movie preview">
        Preview
      </button>

      <style react-jsx>{`
        .controls-container {
          display: flex;
          gap: 25px;
        }
        .watch-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 32px;
          background-color: #228ee5;
          border-radius: 12px;
          font-size: 24px;
          color: #ebfaff;
          font-family: Lato;
          cursor: pointer;
          border: none;
        }
        .preview-button {
          padding: 16px 32px;
          border: 1px solid #228ee5;
          border-radius: 12px;
          font-size: 24px;
          color: #ebfaff;
          font-family: Lato;
          background-color: rgba(30, 29, 29, 0.06);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
