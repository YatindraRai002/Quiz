import React, { useState } from 'react';
import './App.css';
import QuizContainer from './components/QuizContainer';
import StartScreen from './components/StartScreen';
import ResultScreen from './components/ResultScreen';
const quizData = [
  {
    id: 1,
    question: "Which of the following is NOT a JavaScript framework?",
    options: ["Angular", "Laravel", "React", "Vue"],
    correctAnswer: "Laravel"
  },
  {
    id: 2,
    question: "Which CSS property is used to change the text color?",
    options: ["color", "text-color", "font-color", "text-style"],
    correctAnswer: "color"
  },
  {
    id: 3,
    question: "What does DOM stand for in web development?",
    options: ["Digital Object Model", "Document Object Model", "Data Object Model", "Display Object Management"],
    correctAnswer: "Document Object Model"
  },
  {
    id: 4,
    question: "Which of these is NOT a valid way to declare a variable in JavaScript?",
    options: ["let", "var", "const", "variable"],
    correctAnswer: "variable"
  },
  {
    id: 5,
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    correctAnswer: "<a>"
  },
  {
    id: 6,
    question: "Which of the following is a JavaScript library for building user interfaces?",
    options: ["React", "Vue", "Angular", "All of the above"],
    correctAnswer: "All of the above"
  },
  {
    id: 7,
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Colorful Style Sheets", "Creative Style System", "Computer Style Sheets"],
    correctAnswer: "Cascading Style Sheets"
 
  }

];

function App() {
  const [quizState, setQuizState] = useState('start'); 
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const startQuiz = () => {
    setQuizState('quiz');
    setScore(0);
    setUserAnswers([]);
  };

  const endQuiz = (finalScore, answers) => {
    setScore(finalScore);
    setUserAnswers(answers);
    setQuizState('results');
  };

  const restartQuiz = () => {
    setQuizState('start');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Trivinity</h1>
      </header>
      
      <main>
        {quizState === 'start' && <StartScreen onStartQuiz={startQuiz} />}
        
        {quizState === 'quiz' && (
          <QuizContainer 
            questions={quizData} 
            onQuizComplete={endQuiz} 
          />
        )}
        
        {quizState === 'results' && (
          <ResultScreen 
            score={score} 
            totalQuestions={quizData.length} 
            userAnswers={userAnswers}
            questions={quizData}
            onRestartQuiz={restartQuiz} 
          />
        )}
      </main>
      
      
    </div>
  );
}

export default App;