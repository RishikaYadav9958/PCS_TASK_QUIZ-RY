const quizData = [
  { question: 'Which of these is a valid data type in Java?', options: ['integer', 'int', 'num', 'digit'], correct: 1 },
  { question: 'Which keyword is used to create a subclass in Java?', options: ['this', 'super', 'extends', 'inherits'], correct: 2 },
  { question: 'What is the default value of a boolean variable in Java?', options: ['true', 'false', '0', 'null'], correct: 1 },
  { question: 'Which method is the entry point of a Java program?', options: ['start() method', 'main() method', 'run() method', 'execute() method'], correct: 1 },
  { question: 'Which operator is used to compare two values in Java?', options: ['=', '==', 'equals', '==='], correct: 1 },
  { question: 'Which of these is not a Java access modifier?', options: ['public', 'private', 'protected', 'package'], correct: 3 },
  { question: 'Which of the following is not a primitive data type in Java?', options: ['int', 'float', 'String', 'char'], correct: 2 },
  { question: 'What does JVM stand for?', options: ['Java Variable Machine', 'Java Virtual Machine', 'Java Verified Machine', 'Java Visual Machine'], correct: 1 },
  { question: 'Which keyword is used to stop a loop in Java?', options: ['exit', 'stop', 'break', 'return'], correct: 2 },
  { question: 'Which exception is thrown when dividing by zero in Java?', options: ['NullPointerException', 'ArithmeticException', 'NumberFormatException', 'DivideByZeroException'], correct: 1 }
];

let userAnswers = [];
const answerElm = document.querySelectorAll(".answer");

const [questionElm, option_1, option_2, option_3, option_4] =
  document.querySelectorAll("#question, #option_1, #option_2, #option_3, #option_4");

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
  options.forEach((curOption, index) => {
    window[`option_${index + 1}`].innerText = curOption;
  });

  deselectedAnswer();
};

const startTimer = () => {
  timerElm.innerText = `Time left: ${timeLeft}s`;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElm.innerText = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      autoNextQuestion();
    }
  }, 1000);
};

const getSelectedOption = () => {
  return Array.from(answerElm).findIndex((curElem) => curElem.checked);
};

const deselectedAnswer = () => {
  answerElm.forEach((curElem) => (curElem.checked = false));
};

const autoNextQuestion = () => {
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
    loadQuiz();
  } else {
    finishQuiz();
  }
};

submitBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  autoNextQuestion();
});

const finishQuiz = () => {
  localStorage.setItem("score", score);
  localStorage.setItem("totalQuestions", quizData.length);
  localStorage.setItem("quizData", JSON.stringify(quizData));
  localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
  window.location.href = "result3.html";
};

loadQuiz();
