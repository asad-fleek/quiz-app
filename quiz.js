const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Who is the king of the jungle?",
        answers: [
            { text: "Tiger", correct: false },
            { text: "Lion", correct: true },
            { text: "Bear", correct: false },
            { text: "Elephant", correct: false },
        ]
    },
    {
        question: "Who is the GOAT in football?",
        answers: [
            { text: "CR7", correct: true },
            { text: "LM10", correct: false },
            { text: "R9", correct: false },
            { text: "KM10", correct: false },
        ]
    },
    {
        question: "Who is MV1 in Formula 1?",
        answers: [
            { text: "Max Verstappen", correct: true },
            { text: "Lewis Hamilton", correct: false },
            { text: "Charles Leclerc", correct: false },
            { text: "Carlos Sainz", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML =
        `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Play Again") {
        startQuiz();
    } else {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }
});

startQuiz();
