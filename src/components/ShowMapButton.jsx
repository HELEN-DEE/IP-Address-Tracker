import React from 'react';

const ShowMapButton = ({ onClick, showMap }) => {
  return (
    <button 
      onClick={onClick} 
      className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors z-20"
    >
      {showMap ? 'Hide Map' : 'Show Map'}
    </button>
  );
};

export default ShowMapButton;