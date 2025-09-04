import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ResultsPage({ questions, answers, score }) {
  const goTo = useNavigate();

  useEffect(() => {
    if (!questions.length) {
      goTo('/');
    }
  }, [questions.length, goTo]);

  if (!questions.length) return <div className="loading">Loading...</div>;

  let percent = Math.round((score / questions.length) * 100);

  const tryAgain = () => {
    goTo('/');
  };

  return (
    <div className="results">
      <div className="score-card">
        <h1>Quiz Completed!</h1>
        <div className="score">
          <span className="big-score">{score}/{questions.length}</span>
          <span className="percentage">({percent}%)</span>
        </div>
      </div>

      <div className="review">
        <h2>Your Answers</h2>
        {questions.map((q, i) => {
          let myAnswer = answers[i] || 'No answer';
          let gotItRight = myAnswer === q.correctAnswer;
          
          return (
            <div key={i} className={`result-item ${gotItRight ? 'correct' : 'wrong'}`}>
              <div className="question-num">Q{i + 1}</div>
              <div className="question-text">{q.question}</div>
              <div className="answer-row">
                <span>Your answer: <strong>{myAnswer}</strong></span>
                {!gotItRight && (
                  <span>Correct: <strong>{q.correctAnswer}</strong></span>
                )}
              </div>
              <div className="result-icon">
                {gotItRight ? '✓' : '✗'}
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={tryAgain} className="btn restart">
        Take Quiz Again
      </button>
    </div>
  );
}

export default ResultsPage;