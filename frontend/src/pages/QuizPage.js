import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function QuizPage({ questions, answers, setAnswers, setScore }) {
  const goTo = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [myAnswer, setMyAnswer] = useState('');
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (!questions.length) {
      goTo('/');
    }
  }, [questions.length, goTo]);

  useEffect(() => {
    let countdown = setInterval(() => {
      setTimer(timeLeft => {
        if (timeLeft <= 1) {
          // time up move to next question
          let allAnswers = [...answers];
          allAnswers[currentQ] = myAnswer;
          setAnswers(allAnswers);
          
          if (currentQ === questions.length - 1) {
            // quiz finished, calculate score
            let correctCount = 0;
            for (let i = 0; i < allAnswers.length; i++) {
              if (allAnswers[i] === questions[i].correctAnswer) {
                correctCount++;
              }
            }
            setScore(correctCount);
            goTo('/results');
          } else {
            setCurrentQ(currentQ + 1);
            setMyAnswer('');
          }
          return 30;
        }
        return timeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentQ, myAnswer, answers, setAnswers, questions, setScore, goTo]);

  const pickAnswer = (answer) => {
    setMyAnswer(answer);
  };

  const nextQuestion = () => {
    let allAnswers = [...answers];
    allAnswers[currentQ] = myAnswer;
    setAnswers(allAnswers);
    
    if (currentQ === questions.length - 1) {
      // last question, show results
      let correctCount = 0;
      for (let i = 0; i < allAnswers.length; i++) {
        if (allAnswers[i] === questions[i].correctAnswer) {
          correctCount++;
        }
      }
      setScore(correctCount);
      goTo('/results');
    } else {
      setCurrentQ(currentQ + 1);
      setMyAnswer('');
      setTimer(30);
    }
  };

  const finishEarly = () => {
    let allAnswers = [...answers];
    allAnswers[currentQ] = myAnswer;
    setAnswers(allAnswers);
    
    // calculate score with what we have
    let correctCount = 0;
    for (let i = 0; i < allAnswers.length; i++) {
      if (allAnswers[i] === questions[i]?.correctAnswer) {
        correctCount++;
      }
    }
    setScore(correctCount);
    goTo('/results');
  };

  if (!questions.length) return <div className="loading">Loading...</div>;

  let thisQuestion = questions[currentQ];

  return (
    <div className="quiz">
      <div className="header">
        <div className="progress-section">
          <div className="progress-text">
            Question {currentQ + 1} of {questions.length}
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="timer-section">
          <div className={`timer ${timer <= 10 ? 'warning' : ''}`}>
            {timer}s
          </div>
          <button onClick={finishEarly} className="btn finish">
            Finish Quiz
          </button>
        </div>
      </div>

      <div className="question-card">
        <h2>{thisQuestion.question}</h2>
        
        <div className="options">
          {thisQuestion.options.map((option, i) => (
            <button
              key={i}
              className={`option ${myAnswer === option ? 'selected' : ''}`}
              onClick={() => pickAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
        
        <button 
          onClick={nextQuestion} 
          disabled={!myAnswer}
          className="btn next"
        >
          {currentQ === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export default QuizPage;