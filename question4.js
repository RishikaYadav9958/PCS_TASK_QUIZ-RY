const quizData = [
  { question: 'Which of the following is the correct file extension for Python files?', options: ['.pyt', '.pt', '.py', '.p'], correct: 2 },
  { question: 'Which keyword is used to define a function in Python?', options: ['func', 'def', 'function', 'define'], correct: 1 },
  { question: 'What is the output of: print(type(10))?', options: ['<class "float">', '<class "int">', '<class "str">', '<class "number">'], correct: 1 },
  { question: 'Which symbol is used for comments in Python?', options: ['//', '#', '/* */', '<!-- -->'], correct: 1 },
  { question: 'What is the output of: bool(0)?', options: ['True', 'False', '0', 'None'], correct: 1 },
  { question: 'Which method is used to add an item to a list in Python?', options: ['append()', 'add()', 'insert()', 'push()'], correct: 0 },
  { question: 'Which of the following is a mutable data type in Python?', options: ['tuple', 'list', 'str', 'int'], correct: 1 },
  { question: 'What will be the output of: print("5" + "5")?', options: ['10', '55', 'Error', 'None'], correct: 1 },
  { question: 'Which of the following is used to define a block of code in Python?', options: ['Brackets {}', 'Indentation', 'Parentheses ()', 'Quotation marks'], correct: 1 },
  { question: 'What is the default value of a local variable in Python?', options: ['0', 'None', 'False', 'Undefined'], correct: 3 }
];

let userAnswers = [];
const answerElm = document.querySelectorAll(".answer");
const [questionElm, option_1, option_2, option_3, option_4] =
document.querySelectorAll("#question, .option_1, .option_2, .option_3, .option_4");

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
    options.forEach((curOption, index) => (window[`option_${index + 1}`].innerText = curOption));
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
    let answerElement = Array.from(answerElm);
    return answerElement.findIndex((curElem) => curElem.checked);
};

const deselectedAnswer = () => {
    return answerElm.forEach((curElem) => (curElem.checked = false));
};

const moveToNextQuestion = () => {
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
        localStorage.setItem("score", score);
        localStorage.setItem("totalQuestions", quizData.length);
        localStorage.setItem("quizData", JSON.stringify(quizData));
        localStorage.setItem("userAnswers", JSON.stringify(userAnswers));

        window.location.href = "result4.html";
    }
};

submitBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    moveToNextQuestion();
});

loadQuiz();
