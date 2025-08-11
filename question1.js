const quizData = [
  {
    question: 'Which of the following is the correct syntax for a single-line comment in C++?',
    options: ['# This is a comment', '// This is a comment', '/* This is a comment */', '<!-- This is a comment -->'],
    correct: 1,
  },
  {
    question: 'What is the default return type of main() in C++?',
    options: ['void', 'int', 'float', 'char'],
    correct: 1,
  },
  {
    question: 'Which header file is used for input and output in C++?',
    options: ['<stdio.h>', '<iostream>', '<stdlib.h>', '<fstream>'],
    correct: 1,
  },
  {
    question: 'What does the "endl" manipulator do in C++?',
    options: [
      'Ends the program',
      'Prints a newline and flushes the output buffer',
      'Clears the screen',
      'Ends a loop'
    ],
    correct: 1,
  },
  {
    question: 'Which operator is used to access members of a structure through a pointer?',
    options: ['.', '->', '*', '&'],
    correct: 1,
  },
  {
    question: 'What is the correct way to allocate memory for an integer in C++?',
    options: [
      'int *p = malloc(sizeof(int));',
      'int p = new int;',
      'int *p = new int;',
      'int p = alloc(int);'
    ],
    correct: 2,
  },
  {
    question: 'Which function is used to release dynamically allocated memory in C++?',
    options: ['free()', 'delete', 'dispose()', 'remove()'],
    correct: 1,
  },
  {
    question: 'What will "sizeof(char)" return in C++?',
    options: ['2', '4', '1', 'Depends on compiler'],
    correct: 2,
  },
  {
    question: 'Which of these keywords is used to define a constant in C++?',
    options: ['constant', 'const', '#define', 'static const'],
    correct: 1,
  },
  {
    question: 'What is the file extension for a C++ source file?',
    options: ['.c', '.cpp', '.cc', 'Both .cpp and .cc'],
    correct: 3,
  },
];

let userAnswers = [];
const answerElm = document.querySelectorAll(".answer");
const questionElm = document.getElementById("question");
const option_1 = document.getElementById("option_1");
const option_2 = document.getElementById("option_2");
const option_3 = document.getElementById("option_3");
const option_4 = document.getElementById("option_4");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;
let timer;
let timeLeft = 60;

const timerDisplay = document.createElement("div");
timerDisplay.id = "timer";
timerDisplay.style.fontSize = "18px";
timerDisplay.style.fontWeight = "bold";
timerDisplay.style.margin = "10px 0";
document.querySelector(".quiz-section").prepend(timerDisplay);

const startTimer = () => {
  clearInterval(timer);
  timeLeft = 60;
  timerDisplay.textContent = `Time left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleSubmit();
    }
  }, 1000);
};

const loadQuiz = () => {
  const { question, options } = quizData[currentQuiz];
  questionElm.innerText = question;
  options.forEach((curOption, index) => {
    document.getElementById(`option_${index + 1}`).innerText = curOption;
  });
  deselectedAnswer();
  startTimer();
};

const getSelectedOption = () => {
  let answerElement = Array.from(answerElm);
  return answerElement.findIndex((curElem) => curElem.checked);
};

const deselectedAnswer = () => {
  answerElm.forEach((curElem) => (curElem.checked = false));
};

const handleSubmit = () => {
  const selectedOptionIndex = getSelectedOption();
  if (selectedOptionIndex === quizData[currentQuiz].correct) {
    score++;
  }
  if (selectedOptionIndex !== -1) {
    userAnswers.push(selectedOptionIndex);
  }

  currentQuiz++;
  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    localStorage.setItem("score", score);
    localStorage.setItem("totalQuestions", quizData.length);
    localStorage.setItem("quizData", JSON.stringify(quizData));
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));

    window.location.href = "result1.html";
  }
};

submitBtn.addEventListener("click", () => {
  clearInterval(timer);
  handleSubmit();
});

loadQuiz();
