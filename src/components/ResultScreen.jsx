import React from 'react';

function ResultScreen({ score, totalQuestions, userAnswers, questions, onRestartQuiz }) {
  
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getFeedbackMessage = () => {
    if (percentage >= 90) return "Excellent! ";
    if (percentage >= 70) return "Great job! ";
    if (percentage >= 50) return "Good effort! Keep learning!";
    return "Keep practicing! ";
  };
 
  const getFeedbackClass = () => {
    if (percentage >= 90) return "feedback-excellent";
    if (percentage >= 70) return "feedback-good";
    if (percentage >= 50) return "feedback-average";
    return "feedback-poor";
  };
  
  const getScoreColor = () => {
    if (percentage >= 90) return "#28a745"; // green
    if (percentage >= 70) return "#17a2b8"; // blue
    if (percentage >= 50) return "#ffc107"; // yellow
    return "#dc3545"; // red
  };
  
  return (
    <div className="results-screen fade-in">
      <h2>Quiz Results</h2>
      
    
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        <div style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          backgroundColor: 'white',
          border: `8px solid ${getScoreColor()}`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            fontSize: '36px', 
            fontWeight: 'bold',
            color: getScoreColor()
          }}>
            {score}/{totalQuestions}
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: getScoreColor()
          }}>
            {percentage}%
          </div>
        </div>
      </div>
      
      <div className={`results-feedback ${getFeedbackClass()}`}>
        {getFeedbackMessage()}
      </div>
      
      <div className="answer-summary">
        <h3>Your Answers</h3>
        
        {questions.map((question, index) => {
          // Find the user's answer for this question
          const userAnswer = userAnswers[index];
          
          // Skip if no answer data is found
          if (!userAnswer) return null;
          
          return (
            <div key={question.id} className="answer-item">
              <div className="answer-question">
                {question.question}
              </div>
              
              <div className={`answer-response ${userAnswer.isCorrect ? 'answer-correct' : 'answer-incorrect'}`}>
                <span className="answer-icon">
                  {userAnswer.isCorrect ? '✓' : '✗'}
                </span>
                Your answer: {userAnswer.selectedAnswer}
              </div>
              
              {!userAnswer.isCorrect && (
                <div className="correct-answer">
                  Correct answer: {question.correctAnswer}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <button 
        className="btn" 
        onClick={onRestartQuiz}
        style={{ 
          backgroundColor: '#3498db', 
          color: 'white', 
          padding: '10px 20px', 
          borderRadius: '5px', 
          border: 'none', 
          cursor: 'pointer', 
          fontSize: '16px',
          marginTop: '20px'
        }}
      >
        Take Quiz Again
      </button>
    </div>
  );
}

export default ResultScreen;