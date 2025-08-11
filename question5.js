const quizData = [
  {
    question: 'Which SQL statement is used to retrieve data from a database?',
    options: ['GET', 'OPEN', 'SELECT', 'EXTRACT'],
    correct: 2,
  },
  {
    question: 'Which clause is used to filter records in SQL?',
    options: ['ORDER BY', 'WHERE', 'FILTER', 'HAVING'],
    correct: 1,
  },
  {
    question: 'Which SQL keyword is used to sort the result-set?',
    options: ['ORDER BY', 'SORT', 'GROUP BY', 'ARRANGE'],
    correct: 0,
  },
  {
    question: 'What does the COUNT() function do in SQL?',
    options: ['Counts the number of rows', 'Counts the columns', 'Counts NULL values', 'Counts only unique values'],
    correct: 0,
  },
  {
    question: 'Which SQL clause is used to group rows sharing a property?',
    options: ['GROUP BY', 'ORDER BY', 'HAVING', 'JOIN'],
    correct: 0,
  },
  {
    question: 'Which JOIN returns all rows when there is a match in either table?',
    options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'],
    correct: 3,
  },
  {
    question: 'Which command is used to remove all records from a table without deleting the table itself?',
    options: ['REMOVE', 'DELETE', 'DROP', 'TRUNCATE'],
    correct: 3,
  },
  {
    question: 'Which SQL keyword is used to prevent duplicate values in the result set?',
    options: ['UNIQUE', 'DISTINCT', 'NO DUPLICATE', 'FILTER'],
    correct: 1,
  },
  {
    question: 'Which SQL function is used to find the highest value in a column?',
    options: ['TOP()', 'MAX()', 'HIGH()', 'UPPER()'],
    correct: 1,
  },
  {
    question: 'What is the correct syntax to delete a table in SQL?',
    options: ['DELETE TABLE table_name', 'REMOVE table_name', 'DROP TABLE table_name', 'TRUNCATE TABLE table_name'],
    correct: 2,
  }
];

let userAnswers = [];
const answerElm = document.querySelectorAll(".answer");
const questionElm = document.getElementById("question");
const option_1 = document.getElementById("option_1");
const option_2 = document.getElementById("option_2");
const option_3 = document.getElementById("option_3");
const option_4 = document.getElementById("option_4");

const submitBtn = document.getElementById("submit");
const timerElm = document.getElementById("timer");

let currentQuiz = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

const loadQuiz = () => {
  clearInterval(timerInterval); 
  timeLeft = 60;
  updateTimer();
  startTimer();

  const { question, options } = quizData[currentQuiz];
  questionElm.innerText = question;
  option_1.innerText = options[0];
  option_2.innerText = options[1];
  option_3.innerText = options[2];
  option_4.innerText = options[3];
};

const startTimer = () => {
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      submitAnswer(); 
    }
  }, 1000);
};

const updateTimer = () => {
  timerElm.innerText = `Time Left: ${timeLeft}s`;
};

const getSelectedOption = () => {
  let answerElement = Array.from(answerElm);
  return answerElement.findIndex((curElem) => curElem.checked);
};

const deselectedAnswer = () => {
  answerElm.forEach((curElem) => (curElem.checked = false));
};

const submitAnswer = () => {
  const selectedOptionIndex = getSelectedOption();
  if (selectedOptionIndex === quizData[currentQuiz].correct) {
    score++;
  }
  if (selectedOptionIndex !== -1) {
    userAnswers.push(selectedOptionIndex);
  } else {
    userAnswers.push(null);
  }

  currentQuiz++;

  if (currentQuiz < quizData.length) {
    deselectedAnswer();
    loadQuiz();
  } else {
    clearInterval(timerInterval);
    localStorage.setItem("score", score);
    localStorage.setItem("totalQuestions", quizData.length);
    localStorage.setItem("quizData", JSON.stringify(quizData));
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    window.location.href = "result5.html";
  }
};

submitBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  submitAnswer();
});

loadQuiz();
