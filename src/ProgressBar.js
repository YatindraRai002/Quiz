import React from 'react';

function ProgressBar({ currentQuestion, totalQuestions }) {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className="progress-container">
      <div className="progress-text">
        Question {currentQuestion} of {totalQuestions}
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;