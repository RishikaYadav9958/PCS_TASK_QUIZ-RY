const quizData = [
  { question: 'What is React primarily used for?', options: ['Building databases', 'Building user interfaces', 'Server-side programming', 'Data analysis'], correct: 1 },
  { question: 'What is the correct command to create a new React app?', options: ['npx create-react-app myApp', 'npm install react', 'react-new myApp', 'npm start react-app'], correct: 0 },
  { question: 'What is JSX in React?', options: ['A JavaScript syntax extension', 'A React function', 'A CSS framework', 'A database query language'], correct: 0 },
  { question: 'Which hook is used to manage state in a functional component?', options: ['useEffect', 'useState', 'useContext', 'useReducer'], correct: 1 },
  { question: 'Which hook is used for performing side effects in React?', options: ['useEffect', 'useSideEffect', 'useState', 'useRef'], correct: 0 },
  { question: 'What is the default port for a React development server?', options: ['3000', '8000', '5000', '8080'], correct: 0 },
  { question: 'What is the purpose of React Router?', options: ['To handle API requests', 'To manage application routing', 'To style components', 'To manage database connections'], correct: 1 },
  { question: 'Which method is used to render a React component into the DOM?', options: ['React.mount()', 'React.render()', 'ReactDOM.render()', 'render.ReactDOM()'], correct: 2 },
  { question: 'What is the purpose of keys in React lists?', options: ['To style list items', 'To uniquely identify elements', 'To sort the list', 'To store list data'], correct: 1 },
  { question: 'Which of the following is NOT a React hook?', options: ['useEffect', 'useState', 'useReducer', 'useRequest'], correct: 3 }
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
  startTimer();

  const { question, options } = quizData[currentQuiz];
  questionElm.innerText = question;
  option_1.innerText = options[0];
  option_2.innerText = options[1];
  option_3.innerText = options[2];
  option_4.innerText = options[3];
};

const startTimer = () => {
  timerElm.innerText = `Time Left: ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerElm.innerText = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      moveToNextQuestion();
    }
  }, 1000);
};

const getSelectedOption = () => {
  return Array.from(answerElm).findIndex(curElem => curElem.checked);
};

const deselectedAnswer = () => {
  answerElm.forEach(curElem => curElem.checked = false);
};

const moveToNextQuestion = () => {
  const selectedOptionIndex = getSelectedOption();

  if (selectedOptionIndex === quizData[currentQuiz].correct) {
    score++;
  }
  userAnswers.push(selectedOptionIndex !== -1 ? selectedOptionIndex : null);

  currentQuiz++;

  if (currentQuiz < quizData.length) {
    deselectedAnswer();
    loadQuiz();
  } else {
    localStorage.setItem("score", score);
    localStorage.setItem("totalQuestions", quizData.length);
    localStorage.setItem("quizData", JSON.stringify(quizData));
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    window.location.href = "result6.html";
  }
};

submitBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  moveToNextQuestion();
});

loadQuiz();
