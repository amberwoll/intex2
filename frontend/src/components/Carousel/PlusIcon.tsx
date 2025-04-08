// import React from "react";

const PlusIcon = () => {
  return (
    <div className="plus-icon">
      <div className="vertical-line" />
      <div className="horizontal-line" />

      <style jsx>{`
        .plus-icon {
          width: 24px;
          height: 24px;
          position: relative;
        }

        .vertical-line {
          width: 5px;
          height: 24px;
          background-color: #ebfaff;
          border-radius: 2px;
          position: absolute;
          left: 10px;
          top: 0;
        }

        .horizontal-line {
          width: 5px;
          height: 24px;
          background-color: #ebfaff;
          border-radius: 2px;
          position: absolute;
          left: 0;
          top: 10px;
          transform: rotate(-90deg);
        }
      `}</style>
    </div>
  );
};

export default PlusIcon;
