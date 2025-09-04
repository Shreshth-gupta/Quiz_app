import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import './styles/App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage setQuestions={setQuestions} />} />
          <Route path="/quiz" element={<QuizPage questions={questions} answers={answers} setAnswers={setAnswers} setScore={setScore} />} />
          <Route path="/results" element={<ResultsPage questions={questions} answers={answers} score={score} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;