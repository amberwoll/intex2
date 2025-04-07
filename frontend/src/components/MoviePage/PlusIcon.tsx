
const PlusIcon = () => {
  return (
    <div className="plus-icon-container">
      <div className="plus-vertical" />
      <div className="plus-horizontal" />

      <style react-jsx>{`
        .plus-icon-container {
          width: 24px;
          height: 24px;
          position: relative;
        }
        .plus-vertical {
          width: 5px;
          height: 24px;
          background-color: #ebfaff;
          border-radius: 2px;
          position: absolute;
          left: 10px;
          top: 0;
        }
        .plus-horizontal {
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
