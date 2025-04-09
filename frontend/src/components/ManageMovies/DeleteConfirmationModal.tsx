import React from 'react';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal = ({ onConfirm, onCancel }: Props) => (
  <div className="modal-overlay fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div className="modal-content bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
      <p>Are you sure you want to delete this movie?</p>
      <div className="flex gap-2 justify-end mt-6">
        <button className="btn btn-danger" onClick={onConfirm}>
          Yes, Delete
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmationModal;
