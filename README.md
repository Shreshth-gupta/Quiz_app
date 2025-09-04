# Quiz_app

A simple quiz application with timer and bold colors!

## Features

- **Timer**: 30 seconds per question with auto-skip
- **Bold Colors**: Easy/Medium/Hard with bright colors
- **Mobile Friendly**: Works on all devices
- **Finish Button**: Skip to results anytime
- **Score Tracking**: See your results
- **Answer Review**: Check what you got wrong

## Setup

1. **Start Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

## How it Works

- Pick difficulty level
- Answer questions within 30 seconds
- Timer turns red at 10 seconds
- Auto-skip if time runs out
- Use "Finish Quiz" to end early
- See your score and review answers

## Tech Used

- React with hooks (useState, useEffect)
- React Router (/quiz, /results)
- Express.js backend
- Open Trivia API with local fallback
- Pure CSS (no frameworks)

Backend: `http://localhost:5000`
Frontend: `http://localhost:3000`