const quizData = [
  {
    question: 'What does scanf("%4s", str); do?',
    options: [
      'Reads exactly four characters into str',
      'Reads up to four characters into str (plus null)',
      'Reads four characters repeatedly',
      'Is invalid usage of scanf'
    ],
    correct: 1,
  },
  {
    question: 'What is the output of: printf(5 + "GeeksQuiz"); ?',
    options: ['GeeksQuiz', 'Quiz', '5GeeksQuiz', 'Compile error'],
    correct: 1,
  },
  {
    question: 'Which of these is a valid way to allocate memory dynamically in C?',
    options: [
      'int *p = new int;',
      'int *p = (int*)malloc(sizeof(int));',
      'malloc(int);',
      'int p = malloc(sizeof(int));'
    ],
    correct: 1,
  },
  {
    question: 'What does the expression (a & b) compute?',
    options: ['Bitwise OR', 'Logical AND', 'Bitwise AND', 'Logical OR'],
    correct: 2,
  },
  {
    question: 'What’s the result of: 5 / 2 in C if both are integers?',
    options: ['2.5', '2', '3', 'Compiler error'],
    correct: 1,
  },
  {
    question: 'In C, which header is required for strlen()?',
    options: ['<string>', '<cstring>', '<string.h>', '<strings.h>'],
    correct: 2,
  },
  {
    question: 'Which storage class specifier gives a local variable static lifetime?',
    options: ['auto', 'extern', 'register', 'static'],
    correct: 3,
  },
  {
    question: 'What is the output of: printf("%d", sizeof(long double)); typically?',
    options: ['4', '8', '12 or more', 'Depends on compiler/settings'],
    correct: 3,
  },
  {
    question: 'Which one of these causes a compile-time error?',
    options: [
      'int x = 0;',
      'int arr[5] = {1,2,3,4,5};',
      'int arr[] = {1,2,3};',
      'int arr[2] = {1,2,3};'
    ],
    correct: 3,
  },
  {
    question: 'What happens if main() returns no value in hosted C?',
    options: [
      'Undefined behavior',
      'Returns 0 implicitly',
      'Returns random value',
      'Runtime error occurs'
    ],
    correct: 1,
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

    window.location.href = "result.html"; 
  }
};

submitBtn.addEventListener("click", () => {
  clearInterval(timer);
  handleSubmit();
});

loadQuiz();