import React from 'react';

function StartScreen({ onStartQuiz }) {
  return (
    <div className="start-screen fade-in">
      <h2>Welcome to the World of Development</h2>
     
      <p>Each correct answer is worth 1 point.</p>
      <button className="start-btn" onClick={onStartQuiz}>
        Launch Mission
      </button>
    </div>
  );
}

export default StartScreen;