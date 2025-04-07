
const SeeMoreButton = () => {
  return (
    <div className="see-more-container">
      <button className="see-more-button">See More</button>
      <svg
        width="26"
        height="25"
        viewBox="0 0 26 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="arrow-icon"
      >
        <path
          d="M14.5292 20.1335L22.1654 12.505M22.1654 12.505L14.5369 4.86881M22.1654 12.505L3.8477 12.4958"
          stroke="#228EE5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <style react-jsx>{`
        .see-more-container {
          position: absolute;
          right: 48px;
          top: -36px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .see-more-button {
          color: #228ee5;
          font-size: 24px;
          font-weight: 700;
          font-family: Lato;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .arrow-icon {
          width: 24px;
          height: 24px;
          transform: rotate(-90.029deg);
        }
        @media (max-width: 991px) {
          .see-more-container {
            right: 20px;
          }
        }
        @media (max-width: 640px) {
          .see-more-container {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default SeeMoreButton;
