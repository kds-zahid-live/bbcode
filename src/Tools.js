import React from 'react';

const Tools = () => {
  const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    padding: '15px 25px',
    backgroundColor: '#00B786',
    color: '#fff',

    color: 'black !important',
    backgroundColor: 'aqua',
    boxShadow: ' 0 0 10px aqua';
  
    border: 'none',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    zIndex: 1000,
    animation: 'floatingAnimation 3s ease-in-out infinite', // Apply floating animation
  };

  const handleClick = () => {
    window.open('https://tools.zahidhasan.com.bd/', '_blank');
  };

  return (
    <div>
      <style>
        {`
          @keyframes floatingAnimation {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}
      </style>
      <button style={buttonStyle} onClick={handleClick}>
        Get More Tools
      </button>
    </div>
  );
};

export default Tools;
