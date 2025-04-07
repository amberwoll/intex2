// components/Modal.tsx
"use client";
import React from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose} aria-label="Close modal">✕</button>
        {children}
      </div>

      <style react-jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
        }

        .modal-content {
          background: #111;
          border-radius: 12px;
          padding: 32px;
          max-width: 960px;
          width: 100%;
          position: relative;
          overflow-y: auto;
          max-height: 90vh;
        }

        .close-button {
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 20px;
          color: #ebfaff;
          background: none;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Modal;
