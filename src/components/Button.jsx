import React from 'react';

const Button = ({ styles }) => {
  const handleButtonClick = () => {
    window.location.href = 'mailto:marketing@realists.tech'; // Replace with your desired email address
  };

  return (
    <button 
      type='button' 
      className={`py-4 px-6 bg-blue-gradient font-poppins font-medium text-[18px] text-primary outline-none ${styles} rounded-[10px]`}
      onClick={handleButtonClick}
    >
      Get Started
    </button>
  );
};

export default Button;