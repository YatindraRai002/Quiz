import React, { useState, useEffect } from 'react';
import QuestionDisplay from './QuestionDisplay';
import ProgressBar from '../ProgressBar';

function QuizContainer({ questions, onQuizComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionSelect = (option) => {
    if (!showFeedback) {
      setSelectedOption(option);
    }
  };

  const handleNextQuestion = () => {
    // Check if answer is correct
    const currentQuestion = questions[currentQuestionIndex];
    const correct = selectedOption === currentQuestion.correctAnswer;
    
    // Update score if correct
    if (correct) {
      setScore(score + 1);
    }
    
    // Save user's answer
    setUserAnswers([
      ...userAnswers,
      {
        questionId: currentQuestion.id,
        selectedAnswer: selectedOption,
        isCorrect: correct
      }
    ]);
    
    // Move to next question or end quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      // Quiz completed
      onQuizComplete(score + (correct ? 1 : 0), [
        ...userAnswers,
        {
          questionId: currentQuestion.id,
          selectedAnswer: selectedOption,
          isCorrect: correct
        }
      ]);
    }
  };

  const handleCheckAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const correct = selectedOption === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  // Early return if no questions
  if (!questions || questions.length === 0) {
    return <div>No questions available.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="quiz-container fade-in">
      <div className="quiz-header">
        <div className="quiz-progress">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>
      
      <div className="question">
        <h3>{currentQuestion.question}</h3>
        
        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${selectedOption === option ? 'selected' : ''} 
                        ${showFeedback && option === currentQuestion.correctAnswer ? 'correct' : ''}
                        ${showFeedback && selectedOption === option && option !== currentQuestion.correctAnswer ? 'incorrect' : ''}`}
              onClick={() => handleOptionSelect(option)}
              disabled={showFeedback}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      <div className="btn-container">
        {!showFeedback ? (
          <button 
            className="btn" 
            onClick={handleCheckAnswer}
            disabled={selectedOption === null}
          >
            Check Answer
          </button>
        ) : (
          <div className="feedback-container">
            <p className={isCorrect ? 'feedback correct' : 'feedback incorrect'}>
            {isCorrect ? 'Correct! Well done!' : `Incorrect. The correct answer is ${currentQuestion.correctAnswer}.`}
            </p>
            <button className="btn" onClick={handleNextQuestion}>
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizContainer;