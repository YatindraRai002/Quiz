import React from 'react';

function QuestionDisplay({ question, selectedOption, onOptionSelect, isAnswered }) {
  return (
    <div className="question-display">
      <h2 className="question-text">{question.question}</h2>
      
      <div className="options-container">
        {question.options.map((option, index) => (
          <div 
            key={index}
            className={`option ${selectedOption === option ? 'selected' : ''} ${
              isAnswered && option === question.correctAnswer ? 'correct' : ''
            } ${
              isAnswered && selectedOption === option && option !== question.correctAnswer ? 'incorrect' : ''
            }`}
            onClick={() => onOptionSelect(option)}
          >
            <span className="option-letter">{String.fromCharCode(65 + index)}</span>
            <span className="option-text">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionDisplay;