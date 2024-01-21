let currentQuestionIndex = 0;
let score = 0;

document.addEventListener("DOMContentLoaded", loadQuestion);

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options-container");
    const nextButton = document.getElementById("next-button");
    const scoreElement = document.getElementById("score");

    // Add fade-out animation to the current question
    questionElement.style.opacity = 0;
    optionsContainer.style.opacity = 0;

    // Fetch questions from the Open Trivia Database API
    fetch("https://opentdb.com/api.php?amount=1&type=multiple")
        .then(response => response.json())
        .then(data => {
            const currentQuestion = data.results[0];

            // Update the score and question text before fading in
            scoreElement.textContent = score;
            questionElement.innerHTML = decodeHtmlEntities(currentQuestion.question);

            optionsContainer.innerHTML = "";
            const allOptions = currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer);
            shuffleArray(allOptions);

            allOptions.forEach((option) => {
                const optionButton = document.createElement("button");
                optionButton.textContent = decodeHtmlEntities(option);
                optionButton.onclick = function () {
                    checkAnswer(option, currentQuestion.correct_answer);
                };
                optionsContainer.appendChild(optionButton);
            });

            // Fade in the new question and options
            setTimeout(() => {
                questionElement.style.opacity = 1;
                optionsContainer.style.opacity = 1;
            }, 500); // 500 milliseconds delay for the fade-out animation

            nextButton.style.display = "none";

            if (currentQuestionIndex === 0) {
                nextButton.textContent = "Next Question";
            } else if (currentQuestionIndex === 9) {
                nextButton.textContent = "Finish Quiz";
            } else {
                nextButton.textContent = "Next Question";
            }
        })
        .catch(error => {
            console.error("Error fetching questions:", error);
        });
}

function checkAnswer(selectedAnswer, correctAnswer) {
    const nextButton = document.getElementById("next-button");
    nextButton.style.display = "block";

    const options = document.querySelectorAll("#options-container button");
    options.forEach(option => {
        option.disabled = true; // Disable buttons after an answer is selected
        if (option.textContent === decodeHtmlEntities(correctAnswer)) {
            option.classList.add("correct");
        } else if (option.textContent === decodeHtmlEntities(selectedAnswer)) {
            option.classList.add("incorrect");
        }
        if (option.classList.contains("correct")) {
            option.style.backgroundColor = "#2ecc71"; // Green for correct answers
        } else if (option.classList.contains("incorrect")) {
            option.style.backgroundColor = "#e74c3c"; // Red for incorrect answers
        }
    });

    if (selectedAnswer === correctAnswer) {
        score++;
    }
}

function nextQuestion() {
    const resultContainer = document.getElementById("result-container");
    const nextButton = document.getElementById("next-button");

    currentQuestionIndex++;

    if (currentQuestionIndex < 10) {
        loadQuestion();
        const options = document.querySelectorAll("#options-container button");
        options.forEach(option => {
            option.classList.remove("correct", "incorrect");
            option.disabled = false; // Re-enable buttons for the next question
            option.style.backgroundColor = "#3498db"; // Reset background color
        });
        nextButton.style.display = "none";
        resultContainer.textContent = ""; // Clear result container
    } else {
        resultContainer.textContent = `Your score: ${score} out of 10`;
        nextButton.style.display = "none";
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function decodeHtmlEntities(text) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
}
