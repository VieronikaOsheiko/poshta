
import React from 'react';
import './LoadingPage.css'; 

const LoadingPage: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Завантаження...</p>
    </div>
  );
}

export default LoadingPage;