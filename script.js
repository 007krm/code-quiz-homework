// DOM SELECORS
const highScoreBtn = document.querySelector(".highScoreBtn");
const timer = document.querySelector(".timer");

const startView = document.querySelector(".startView");
const startQuizBtn = document.querySelector(".startQuizBtn");

const quizView = document.querySelector(".quizView");
const quizQuestion = document.querySelector(".quizQuestion");
const quizAnswersUl = document.querySelector(".quizAnswersUl");
const answer = document.querySelector(".answer");
const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");
const correctWrong = document.querySelector(".correctWrong");

const endGameView = document.querySelector(".endGameView");
const highScoreInput = document.querySelector("#highScoreInput");
const submitScore = document.querySelector("#submitScore");

const highScoreView = document.querySelector(".highScoreView");
const highScoresUl = document.querySelector(".highScoresUl");
const highScore = document.querySelector(".highScore");
const initials = document.querySelector(".initials");
const score = document.querySelector(".score");
const restartGame = document.querySelector("#restartGame");

const questionsArray = [
  {
    question: "What is short for JavaScript?",
    correctAnswer: "JS",
    options: ["perl", "css", "JS", "java"],
  },
  {
    question: "What is short for variable?",
    correctAnswer: "var",
    options: ["vable", "var", "ver", "vab"],
  },
  {
    question: "What does px mean?",
    correctAnswer: "pixel",
    options: ["pax", "pex", "piex", "pixel"],
  },
  {
    question: "What does CSS stand for?",
    correctAnswer: "Cascading style sheets",
    options: [
      "Computer Style",
      "Cascading style sheets",
      "Create style sheet",
      "Computer science",
    ],
  },
  {
    question: "What can Flexbox do?",
    correctAnswer: "makes a row or column axis layout",
    options: [
      "creates a box",
      "makes a row or column axis layout",
      "create column",
      "make items move",
    ],
  },
];

let currentQuestion = 0;

const playerHighScores = [];
let playerScore = 0;

let countDown;

// START THE QUIZ
function startQuiz() {
  // hide other views
  startView.style.display = "none";
  highScoreView.style.display = "none";

  // clear initials input
  highScoreInput.value = "";

  // clear correct / wrong message
  correctWrong.innerHTML = "";

  // reset questions from start
  currentQuestion = 0;

  // restart score from 0
  playerScore = 0;

  // show quiz view & timer
  quizView.style.display = "block";
  timer.style.display = "inline";
  timer.innerHTML = 75;

  // start timer
  let timeLeft = 75;
  countDown = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(countDown);
      timer.style.display = "none";
      gameOver();
    }
    timer.innerHTML = timeLeft -= 1;
  }, 1000);

  // present first question and options
  quizQuestion.innerHTML = questionsArray[currentQuestion].question;
  option1.innerHTML = questionsArray[currentQuestion].options[0];
  option2.innerHTML = questionsArray[currentQuestion].options[1];
  option3.innerHTML = questionsArray[currentQuestion].options[2];
  option4.innerHTML = questionsArray[currentQuestion].options[3];
}

// LISTEN FOR AN ANSWER
function chooseAnswer(event) {
  currentQuestion = currentQuestion + 1;

  for (let i = 0; i < questionsArray.length; i++) {
    let answer;
    let foundQuestion = quizQuestion.innerHTML;

    if (event.target.id === "option1") {
      answer = questionsArray[i].options[0];
    }
    if (event.target.id === "option2") {
      answer = questionsArray[i].options[1];
    }
    if (event.target.id === "option3") {
      answer = questionsArray[i].options[2];
    }
    if (event.target.id === "option4") {
      answer = questionsArray[i].options[3];
    }

    if (questionsArray[i].question === foundQuestion) {
      if (answer === questionsArray[i].correctAnswer) {
        correctWrong.innerHTML = "CORRECT!";
      } else {
        correctWrong.innerHTML = "WRONG!";
        let newTimeLeft;
        // stop timer
        clearInterval(countDown);

        // get current time left
        let currentTime = timer.innerHTML;

        // if time hits 0, end game
        if (currentTime - 20 <= 0) {
          timer.innerHTML = 0;
          newTimeLeft = 0;
          gameOver();
        }

        // take away some seconds
        newTimeLeft = currentTime - 20;

        // if less than 0, turn to 0
        if (newTimeLeft <= 0) {
          newTimeLeft = 0;
        }

        timer.innerHTML = newTimeLeft;
        // start quiz over again
        countDown = setInterval(function () {
          if (newTimeLeft <= 0) {
            clearInterval(countDown);
            timer.style.display = "none";
            gameOver();
          }
          timer.innerHTML = newTimeLeft -= 1;
        }, 1000);
      }
    }
  }

  if (questionsArray[currentQuestion] !== undefined) {
    //show next question and options
    quizQuestion.innerHTML = questionsArray[currentQuestion].question;
    option1.innerHTML = questionsArray[currentQuestion].options[0];
    option2.innerHTML = questionsArray[currentQuestion].options[1];
    option3.innerHTML = questionsArray[currentQuestion].options[2];
    option4.innerHTML = questionsArray[currentQuestion].options[3];
  }

  if (questionsArray[currentQuestion] === undefined) {
    gameOver();
  }
}

function gameOver() {
  // stop timer
  clearInterval(countDown);

  // grab score
  const timeLeft = timer.innerHTML;
  playerScore = timeLeft;

  // hide quiz view
  quizView.style.display = "none";

  // show end game view
  endGameView.style.display = "flex";
}

function submitEndGame() {
  // clear high score ul
  highScoresUl.innerHTML = "";

  playerHighScores.push({
    highScoreInitials: highScoreInput.value,
    highScoreScore: playerScore,
  });

  // hide end game view
  endGameView.style.display = "none";
  // show high score view
  highScoreView.style.display = "block";

  for (let i = 0; i < playerHighScores.length; i++) {
    const li = document.createElement("li");
    li.className = "highScore btn answer";

    const span1 = document.createElement("span");
    span1.className = "initials";
    span1.id = `initials-${i}`;
    span1.innerHTML = playerHighScores[i].highScoreInitials;

    const span2 = document.createElement("span");
    span2.className = "score";
    span2.id = `score-${i}`;
    span2.innerHTML = playerHighScores[i].highScoreScore;

    li.innerHTML = `<span class="initals" id=${span1.id}>${playerHighScores[i].highScoreInitials}</span> - <span class="score" id=${span2.id}>${playerHighScores[i].highScoreScore}</span>`;

    highScoresUl.appendChild(li);
  }
}

function showHighScore() {
  // stop timer
  clearInterval(countDown);

  // hide other views
  startView.style.display = "none";
  quizView.style.display = "none";
  endGameView.style.display = "none";

  // show high score view
  highScoreView.style.display = "block";
}

// EVENT LISTNERS
startQuizBtn.addEventListener("click", startQuiz);
quizAnswersUl.addEventListener("click", chooseAnswer);
submitScore.addEventListener("click", submitEndGame);
restartGame.addEventListener("click", startQuiz);
highScoreBtn.addEventListener("click", showHighScore);
