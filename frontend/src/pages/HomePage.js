import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({ setQuestions }) {
  const goTo = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const startQuiz = async (level) => {
    setIsLoading(true);
    try {
      let response = await fetch('/api/quiz/questions?amount=10&difficulty=' + level);
      let quizData = await response.json();
      setQuestions(quizData.questions);
      goTo('/quiz');
    } catch (err) {
      console.log('something went wrong, using backup questions');
      // backup questions in case not working
      let backupQuiz = [
        {
          id: 1,
          question: "What is the capital of France?",
          options: ["London", "Berlin", "Paris", "Madrid"],
          correctAnswer: "Paris"
        },
        {
          id: 2,
          question: "Which planet is known as the Red Planet?",
          options: ["Venus", "Mars", "Jupiter", "Saturn"],
          correctAnswer: "Mars"
        }
      ];
      setQuestions(backupQuiz);
      goTo('/quiz');
    }
    setIsLoading(false);
  };

  return (
    <div className="home">
      <h1>Quiz app</h1>
      <p>Test your knowledge!</p>
      
      {isLoading ? (
        <div className="loading">Getting questions...</div>
      ) : (
        <div className="buttons">
          <button onClick={() => startQuiz('easy')} className="btn easy">
            Easy Quiz
          </button>
          <button onClick={() => startQuiz('medium')} className="btn medium">
            Medium Quiz
          </button>
          <button onClick={() => startQuiz('hard')} className="btn hard">
            Hard Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;