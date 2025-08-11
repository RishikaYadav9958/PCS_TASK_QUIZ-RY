const quizData = [
  {
    question: 'Which of the following is an example of runtime polymorphism in C++?',
    options: ['Function Overloading', 'Operator Overloading', 'Virtual Functions', 'Default Arguments'],
    correct: 2,
  },
  {
    question: 'If no access specifier is mentioned for a class, members are by default:',
    options: ['private', 'protected', 'public', 'none'],
    correct: 0,
  },
  {
    question: 'Which special function is automatically invoked when an object is created?',
    options: ['Destructor', 'Constructor', 'Virtual Function', 'Friend Function'],
    correct: 1,
  },
  {
    question: 'What is the purpose of a destructor in C++?',
    options: ['To initialize objects', 'To delete an object', 'To clean up resources before object is destroyed', 'To overload operators'],
    correct: 2,
  },
  {
    question: 'Which operator is used to allocate memory dynamically in C++?',
    options: ['malloc', 'calloc', 'new', 'alloc'],
    correct: 2,
  },
  {
    question: 'Which keyword is used to declare a pure virtual function?',
    options: ['pure', 'virtual', 'abstract', 'override'],
    correct: 1,
  },
  {
    question: 'An abstract class in C++ is a class that:',
    options: ['Cannot have constructors', 'Has at least one pure virtual function', 'Cannot have any data members', 'Must have all functions virtual'],
    correct: 1,
  },
  {
    question: 'What is function overriding in C++?',
    options: ['Same function name, different signatures in same class', 'Same function name in base and derived class with same parameters', 'Changing return type only', 'Overloading operators'],
    correct: 1,
  },
  {
    question: 'Which feature of OOP helps in hiding implementation details?',
    options: ['Polymorphism', 'Encapsulation', 'Inheritance', 'Overloading'],
    correct: 1,
  },
  {
    question: 'Which constructor takes no parameters?',
    options: ['Default constructor', 'Parameterized constructor', 'Copy constructor', 'Virtual constructor'],
    correct: 0,
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

let timerElm = document.createElement("div");
timerElm.id = "timer";
timerElm.style.fontWeight = "bold";
timerElm.style.marginBottom = "10px";
document.getElementById("quiz").prepend(timerElm);

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

  deselectedAnswer();
};

const startTimer = () => {
  timerElm.innerText = `Time Left: ${timeLeft}s`;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElm.innerText = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleSubmit(); 
    }
  }, 1000);
};

const getSelectedOption = () => {
  return Array.from(answerElm).findIndex((curElem) => curElem.checked);
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
  } else {
    userAnswers.push(null); 
  }

  currentQuiz++;

  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    localStorage.setItem("score", score);
    localStorage.setItem("totalQuestions", quizData.length);
    localStorage.setItem("quizData", JSON.stringify(quizData));
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));

    window.location.href = "result2.html";
  }
};

submitBtn.addEventListener("click", () => {
  clearInterval(timerInterval); 
  handleSubmit();
});

loadQuiz();
