const gameData = {
    currentWord: "darbas",
    progress: 0,
    progressIncrement: 15,
    possibleWords: ["obuolys", "bitas", "saldainis", "monitorius", "sofa"],
    chooseRandomWord: function() {
        const randomIndex = Math.floor(Math.random() * this.possibleWords.length);
        this.currentWord = this.possibleWords[randomIndex];
    }
};

// Math.random(0.5) = 1
// Math.random(2.1) = 2
// Math.floor(2.8) = 2
// Math.ceil(2.1) = 3

const UI = {
    wordElement: document.querySelector(".word"),
    progressBar: document.querySelector(".bar"),

    difficulty: document.querySelector("#difficultyEasy"),
    difficulty: document.querySelector("#difficultyNormal"),
    difficulty: document.querySelector("#difficultyHard")
}

function generateLetters() {
    UI.wordElement.innerHTML = "";

    for (let i = 0; i < gameData.currentWord.length; i++) {
        UI.wordElement.innerHTML += "<div></div>";
    }
}

function drawProgressBar() {
    UI.progressBar.style.width = `${gameData.progress}%`;
}

function initGame() {
    renderNewWord();
    drawProgressBar();
}

initGame();

// Kai žmogus paspaudžia klaviatūros mygtuką
document.addEventListener("keydown", (e) => {
    const letter = e.key;

    console.log(letter);

    let letterFound = false;

    // Patikrinti, ar tokia raidė egzistuoja žodyje
    for (let i = 0; i < gameData.currentWord.length; i++) {
        const wordLetter = gameData.currentWord[i];

        // Jei žmogus atspėjo raidę
        if (letter === wordLetter) {
            console.log(`Žaidėjas atspėjo raidę ${i} pozicijoje`);

            UI.wordElement.childNodes[i].innerHTML = letter;
            letterFound = true;
        }
    }

    // Patikriname, ar nebuvo rasta nei viena raidė
    if (letterFound === false) {
        console.log("Pridedame žmogui baudos taškų!");
        addProgress(gameData.progressIncrement);

    }

    checkLoseCondition();
    checkWinCondition();
});

// Word guessed wrong
function checkLoseCondition() {
    if (gameData.progress >= 100) {
        alert("Word guessed wrong!!");
    }
}

// Word guessed right
function checkWinCondition() {
    for (let letterElement of UI.wordElement.childNodes) {
        if (letterElement.innerHTML === "")
            return;
    }
    alert("Word guessed right!!");
}

function addProgress(progressAmount) {
    gameData.progress += progressAmount;

    // if (gameData.progress > 100)
    //     gameData.progress = 100;
    gameData.progress = Math.min(100, gameData.progress);

    drawProgressBar();
}

function newWordWithProgress(progressAmount) {
    //Finish new word regerator and progressbar reset.
}

function renderNewWord() {
    gameData.chooseRandomWord();
    generateLetters();
}

//Difficulty Settings
document.querySelector("#difficultyEasy").addEventListener("click", onEasyClicked);

function onEasyClicked() {
    gameData.progressIncrement = 15;
    console.log("Difficulty set on easy");
}

document.querySelector("#difficultyNormal").addEventListener("click", onNormalClicked);

function onNormalClicked() {
    gameData.progressIncrement = 25;
    console.log("Difficulty set on normal");
}

document.querySelector("#difficultyHard").addEventListener("click", onHardClicked);

function onHardClicked() {
    gameData.progressIncrement = 50;
    console.log("Difficulty set on hard");
}

// Sound on keyboard click
document.addEventListener('keydown', function(e) {
    const letter = e.key;

    console.log(letter);

    let letterFound = false;

    for (let i = 0; i < gameData.currentWord.length; i++) {
        const wordLetter = gameData.currentWord[i];

        if (letter === wordLetter) {
            console.log(`Žaidėjas atspėjo raidę ${i} pozicijoje`);

            UI.wordElement.childNodes[i].innerHTML = letter;
            letterFound = true;
            document.getElementById('audio').play();
        }
    }
    // Code just for one button
    // if (e.keyCode == 65) {
    //     document.getElementById('audio').play();
})