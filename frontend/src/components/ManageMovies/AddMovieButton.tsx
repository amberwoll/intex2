import React, { useState } from 'react';
import AddMovieModal from './AddMovieModal';

const AddMovieButton = ({ onMovieAdded }: { onMovieAdded?: () => void }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Add Movie
      </button>

      {showModal && (
        <AddMovieModal
          onClose={() => setShowModal(false)}
          onMovieAdded={onMovieAdded}
        />
      )}
    </>
  );
};

export default AddMovieButton;
