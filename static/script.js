const questionDiv = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const feedbackDiv = document.getElementById("feedback");


let currentTonality = null;
let optionsData = null;
let currentNoteNumber = null;

async function loadQuestion() {
    const questionResponse = await fetch("/get_question");
    const questionData = await questionResponse.json();
    const questionId = Object.keys(questionData)[0];
    const questionText = questionData[questionId];

    const questionValues = questionData[questionId].split('-'); // Split the values

    var quality = ""
    currentTonality = questionText;
    currentNoteNumber = questionId;
    if (questionValues[1] === "natural_minor") {
        quality = "minor"
    } else {
        quality = "major"
    }
    questionDiv.textContent = `What is the ${Object.keys(questionData)[0]}° of ${questionValues[0]} ${quality}?`;

    loadOptions(currentTonality);
}
async function loadOptions(tonality) {
    const optionsResponse = await fetch(`/get_chords/${tonality}`);
    optionsData = await optionsResponse.json();

    optionsDiv.innerHTML = "";

    // Crea un array di indici e mescolali casualmente
    const shuffledIndices = shuffleArray([...optionsData.keys()]);

    shuffledIndices.forEach((optionIndex) => {
        const optionText = optionsData[optionIndex];
        const button = document.createElement("button");
        button.textContent = optionText;
        button.addEventListener("click", () => checkAnswer(currentNoteNumber, currentTonality, optionIndex));
        optionsDiv.appendChild(button);
    });
}

function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

function showFeedback(message, isCorrect) {
    feedbackDiv.textContent = message;
    feedbackDiv.classList.remove("correct", "incorrect");
    feedbackDiv.classList.add(isCorrect ? "correct" : "incorrect");
}

function hideFeedback() {
    feedbackDiv.textContent = "";
    feedbackDiv.classList.remove("correct", "incorrect");
}

async function checkAnswer(noteNumber, tonality, selectedOptionIndex) {
    const userResponse = optionsData[selectedOptionIndex];

    const answerResponse = await fetch(`/check_answer/${noteNumber}/${tonality}/${userResponse}`);
    const isCorrectData = await answerResponse.json();

    if (isCorrectData.Response) {
        showFeedback("Risposta esatta", true);
    } else {
        showFeedback("Risposta errata. Riprova.", false);
    }

    setTimeout(() => {
        hideFeedback();
    }, 1000);

    loadQuestion();
}

loadQuestion();