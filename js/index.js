"use strict";

// Time Limit
const TIME_LIMIT = 60;

// Define Quotes to be Used
const quotes_array = [
    "Push yourself, because no one else is going to do it for you.",
    "Failure is the condiment that gives success its flavor.",
    "Wake up with determination. Go to bed with satisfaction.",
    "It's going to be hard, but hard does not mean impossible.",
    "Learning never exhausts the mind.",
    "The only way to do great work is to love what you do.",
];

// Select Required elements
let timerText = document.querySelector(".curr_time");
let accuracyText = document.querySelector(".curr_accuracy");
let errorText = document.querySelector(".curr_errors");
let cpmText = document.querySelector(".curr_cpm");
let wpmText = document.querySelector(".curr_wpm");
let quoteText = document.querySelector(".typer__quote");
let wpm = document.querySelector(".wpm");
let cpm = document.querySelector(".cpm");
let errorsGroup = document.querySelector(".errors");
let timerGroup = document.querySelector(".timer");
let accuracyGroup = document.querySelector(".accuracy");
let btnRestart = document.querySelector(".btn-restart");
let input = document.querySelector(".input");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let charactersTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

// Functions
function updateQuote() {
    quoteText.textContent = null;
    current_quote = quotes_array[quoteNo];

    current_quote.split("").forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.innerText = char;
        quoteText.appendChild(charSpan);
    });

    if (quoteNo < quotes_array.length - 1) quoteNo++;
    else quoteNo = 0;
}

function processCurrentText(input) {
    const curInput = input.value;
    const currTextArray = curInput.split("");

    charactersTyped++;
    errors = 0;

    const qouteSpanArr = document.querySelectorAll("span");
    qouteSpanArr.forEach((char, i) => {
        let typedChar = currTextArray[i];

        if (typedChar == null) {
            char.classList.remove("correct");
            char.classList.remove("incorrect");
        } else if (typedChar === char.innerText) {
            char.classList.add("correct");
            char.classList.remove("incorrect");
        } else if (typedChar !== char.innerText) {
            char.classList.add("incorrect");
            char.classList.remove("correct");

            errors++;
        }
    });

    errorText.textContent = total_errors + errors;

    const correctCharacters = charactersTyped - (total_errors + errors);
    const accuracyVal = (correctCharacters / charactersTyped) * 100;
    accuracyText.textContent = Math.round(accuracyVal);

    if (curInput.length == current_quote.length) {
        updateQuote();

        total_errors += errors;

        input.value = "";
    }
}

function resetValues() {
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0;
    charactersTyped = 0;
    quoteNo = 0;
    input.disabled = false;

    input.value = "";
    quoteText.textContent = "Click on the area below to start the game";
    accuracyText.textContent = 100;
    timerText.textContent = timeLeft + "s";
    errorText.textContent = 0;
    btnRestart.style.display = "none";
    cpm.style.display = "none";
    wpm.style.display = "none";
}

function startGame() {
    resetValues();
    updateQuote();

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function finishGame() {
    clearInterval(timer);

    input.disabled = true;

    quoteText.textContent = "Click on restart to start a new game.";

    btnRestart.style.display = "block";

    const calcCpm = Math.round((charactersTyped / timeElapsed) * 60);
    const calcWpm = Math.round((charactersTyped / 5 / timeElapsed) * 60);

    cpmText.textContent = calcCpm;
    wpmText.textContent = calcWpm;

    cpm.style.display = "block";
    wpm.style.display = "block";
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;

        timeElapsed++;

        timerText.textContent = timeLeft + "s";
    } else finishGame();
}

// Attach Event Listeners on elements
btnRestart.addEventListener("click", (e) => {});

input.addEventListener("focus", (e) => startGame());

input.addEventListener("input", (e) => {
    const { target } = e;
    processCurrentText(target);
});
