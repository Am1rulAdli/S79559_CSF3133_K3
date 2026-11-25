// Questions Array: stores questions, possible options, and the correct answer
const questions = [
    {
        question: "Which HTML tag is used to embed JavaScript code?",
        options: ["<javascript>", "<script>", "<js>", "<code>"],
        answer: "<script>"
    },
    {
        question: "Which method is used to select an HTML element by its ID?",
        options: [
            "document.getElementById()",
            "document.getElementByClass()",
            "document.queryId()",
            "document.findId()"
        ],
        answer: "document.getElementById()"
    },
    {
        question: "Which event is triggered when a user right-clicks on a webpage?",
        options: ["onclick", "onrightclick", "contextmenu", "mousedown"],
        answer: "contextmenu"
    },
    {
        question: "What does Math.random() return in JavaScript?",
        options: [
            "A random integer between 1 and 10",
            "A floating-point number between 0 (inclusive) and 1 (exclusive)",
            "A random boolean value",
            "A floating-point number between 1 and 100"
        ],
        answer: "A floating-point number between 0 (inclusive) and 1 (exclusive)"
    },
    {
        question: "Which JavaScript function checks whether a value is Not-a-Number?",
        options: ["isNumber()", "checkNaN()", "isNaN()", "parseInt()"],
        answer: "isNaN()"
    },
    {
        question: "Which semantic HTML5 tag is best used for the bottom section of a page?",
        options: ["<bottom>", "<section>", "<footer>", "<aside>"],
        answer: "<footer>"
    }
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timerInterval = null;
let timeLeft = 15;
let answered = false;

const progressEl = document.getElementById("progress");
const timerEl = document.getElementById("timer");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const feedbackSectionEl = document.getElementById("feedback-section");
const scoreDisplayEl = document.getElementById("score-display");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

// Randomly shuffles the questions array using Fisher-Yates shuffle
function shuffleQuestions() {
    shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
}

// Sets a countdown timer for answering each question
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 15;
    timerEl.textContent = `Time Left: ${timeLeft}s`;
    timerEl.classList.remove("warning");

    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 5) {
            timerEl.classList.add("warning");
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}

// Handles when the countdown reaches 0 before submitting
function handleTimeout() {
    if (answered) return;
    answered = true;

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    disableOptions();
    highlightCorrectAnswer(currentQuestion.answer);

    feedbackSectionEl.textContent = `Time's up! The correct answer is: ${currentQuestion.answer}`;
    feedbackSectionEl.className = "incorrect";

    submitBtn.disabled = true;
    nextBtn.disabled = false;
}

// Displays the current question and answer options
function displayQuestion() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    answered = false;

    progressEl.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
    questionTextEl.textContent = currentQuestion.question;
    optionsContainerEl.innerHTML = "";
    feedbackSectionEl.textContent = "";
    feedbackSectionEl.className = "";

    currentQuestion.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.className = "option-label";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "quiz-option";
        radio.value = option;
        radio.id = `option-${index}`;

        const textSpan = document.createElement("span");
        textSpan.textContent = option;

        label.appendChild(radio);
        label.appendChild(textSpan);
        optionsContainerEl.appendChild(label);
    });

    submitBtn.disabled = false;
    nextBtn.disabled = true;
    nextBtn.textContent =
        currentQuestionIndex === shuffledQuestions.length - 1 ? "Finish Quiz" : "Next Question";

    startTimer();
}

// Checks whether the selected answer is correct and updates the score
function checkAnswer() {
    if (answered) return;

    const selectedRadio = document.querySelector('input[name="quiz-option"]:checked');
    if (!selectedRadio) {
        feedbackSectionEl.textContent = "Please select an answer before submitting.";
        feedbackSectionEl.className = "info";
        return;
    }

    clearInterval(timerInterval);
    answered = true;

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const selectedValue = selectedRadio.value;
    const selectedLabel = selectedRadio.parentElement;

    disableOptions();

    if (selectedValue === currentQuestion.answer) {
        score++;
        selectedLabel.classList.add("correct");
        feedbackSectionEl.textContent = "Correct! Great job.";
        feedbackSectionEl.className = "correct";
    } else {
        selectedLabel.classList.add("incorrect");
        highlightCorrectAnswer(currentQuestion.answer);
        feedbackSectionEl.textContent = `Incorrect. The correct answer is: ${currentQuestion.answer}`;
        feedbackSectionEl.className = "incorrect";
    }

    scoreDisplayEl.textContent = `Score: ${score} / ${shuffledQuestions.length}`;
    submitBtn.disabled = true;
    nextBtn.disabled = false;
}

// Moves to the next question, resetting the timer and updating the score
function nextQuestion() {
    clearInterval(timerInterval);
    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
        scoreDisplayEl.textContent = `Score: ${score} / ${shuffledQuestions.length}`;
        displayQuestion();
    } else {
        showFinalResult();
    }
}

// Displays the final score after finishing all questions
function showFinalResult() {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);

    progressEl.textContent = "Quiz Completed!";
    timerEl.textContent = "Done";
    timerEl.classList.remove("warning");
    questionTextEl.textContent = `You scored ${score} out of ${shuffledQuestions.length} (${percentage}%).`;
    optionsContainerEl.innerHTML = "";

    feedbackSectionEl.textContent =
        percentage >= 60
            ? "Well done! You passed the quiz."
            : "Keep practicing and try again!";
    feedbackSectionEl.className = percentage >= 60 ? "correct" : "info";

    scoreDisplayEl.textContent = `Final Score: ${score} / ${shuffledQuestions.length} (${percentage}%)`;

    submitBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
}

// Starts the quiz by shuffling questions, displaying the first question, and starting the timer
function startQuiz() {
    clearInterval(timerInterval);
    currentQuestionIndex = 0;
    score = 0;

    shuffleQuestions();
    scoreDisplayEl.textContent = `Score: 0 / ${shuffledQuestions.length}`;

    submitBtn.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
    restartBtn.classList.add("hidden");

    displayQuestion();
}

function disableOptions() {
    const radios = document.querySelectorAll('input[name="quiz-option"]');
    radios.forEach((radio) => {
        radio.disabled = true;
    });
}

function highlightCorrectAnswer(correctAnswer) {
    const radios = document.querySelectorAll('input[name="quiz-option"]');
    radios.forEach((radio) => {
        if (radio.value === correctAnswer) {
            radio.parentElement.classList.add("correct");
        }
    });
}

// Start the quiz automatically when the page loads
startQuiz();