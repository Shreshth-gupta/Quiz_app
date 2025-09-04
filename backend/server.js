const express = require('express');
const cors = require('cors');
const axios = require('axios');
const myQuestions = require('./data/questions.json');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// get questions for quiz
app.get('/api/quiz/questions', async (req, res) => {
  let howMany =10;
  let level = req.query.difficulty || 'medium';
  
  // first try the trivia api
  try {
    let apiCall = await axios.get('https://opentdb.com/api.php?amount=' + howMany + '&difficulty=' + level + '&type=multiple', {
      timeout: 3000
    });

    if (apiCall.data.results && apiCall.data.results.length > 0) {
      let quizData = [];
      
      for (let i = 0; i < apiCall.data.results.length; i++) {
        let q = apiCall.data.results[i];
        let allOptions = q.incorrect_answers;
        allOptions.push(q.correct_answer);
        
        // shuffle the options
        for (let j = allOptions.length - 1; j > 0; j--) {
          let k = Math.floor(Math.random() * (j + 1));
          [allOptions[j], allOptions[k]] = [allOptions[k], allOptions[j]];
        }
        
        quizData.push({
          id: i + 1,
          question: q.question,
          options: allOptions,
          correctAnswer: q.correct_answer
        });
      }
      
      return res.json({ questions: quizData });
    }
  } catch (err) {
    console.log('api not working, using my questions instead');
  }
  
  // fallback to my own questions
  let myQuizData = myQuestions.slice();
  
  // filter by difficulty if needed
  if (level && level !== 'medium') {
    myQuizData = myQuizData.filter(q => q.difficulty === level);
  }
  
  // shuffle them up
  for (let i = myQuizData.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [myQuizData[i], myQuizData[j]] = [myQuizData[j], myQuizData[i]];
  }
  
  // take only what we need
  myQuizData = myQuizData.slice(0, parseInt(howMany));
    
  res.json({ questions: myQuizData });
});

// start server
app.listen(port, () => {
  console.log('my quiz server is running on port ' + port);
});