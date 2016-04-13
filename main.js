//initializing function
var init = function () {
    populateQuestion();
    addListenersToButtons();
    submitAnswer();
    clearAnswer();
};

//to generate a random number
var randomNumber = function () {
    //return a number between 1 and 100
    return Math.round(Math.random() * 99 + 1);
};

//to populate the equation to be answered
var populateQuestion = function () {
    var number1 = document.getElementById("number1");
    var number2 = document.getElementById("number2");
    var operator = document.getElementById("operator");
    var answerBox = document.getElementById("answer");
    var answer = 0;
    number1.textContent = randomNumber();
    number2.textContent = randomNumber();
    var randomForOperator = Math.round(Math.random());
    if (randomForOperator === 1) {
        operator.textContent = "+";
        answer = parseInt(number1.textContent) + parseInt(number2.textContent);
    } else {
        operator.textContent = "-";
        answer = parseInt(number1.textContent) - parseInt(number2.textContent);
    };
    console.log(answer)
    answerBox.textContent = answer;
};

//event handler for user number input
var inputHandler = function (event) {
    if (event.target.matches("button")) {
        var numberInputted = event.target.textContent;
        var inputBox = document.getElementById("inputBox");
        inputBox.textContent = inputBox.textContent + numberInputted;
    };
};

//to add event listeners to each button
var addListenersToButtons = function () {
    var buttons = document.getElementsByClassName("numberButtons");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", inputHandler);
    }
};

//timeout function for when the equation is answered
var replayGame =  function () {
    window.setTimeout(function () {
        inputBox.textContent = "";
        answer.style.display = "none";
        answerText.textContent = "";
        populateQuestion();
    }, 4000)
};

//for updating the score
var scoreUpdate = function (outcome) {
    var totalScore = document.getElementById("totalScore");
    var scoreInteger = parseInt(totalScore.textContent);
    if (outcome === "correct") {
        scoreInteger += 1;
        totalScore.textContent = scoreInteger;
    } else {
        totalScore.textContent = 0;
    }
}


//for the submit button
var submitAnswer = function () {
    var submitButton = document.getElementById("submitButton");
    var answerText = document.getElementById("answerText");
    submitButton.addEventListener("click", function () {
        var answer = document.getElementById("answer");
        var userAnswer = document.getElementById("inputBox").textContent;
        var actualAnswer = document.getElementById("answer").textContent;
        if (userAnswer == actualAnswer) {
            answerText.textContent = "You got it! Here's the answer: ";
            answer.style.display = "block";
            replayGame();
            scoreUpdate("correct");
        } else {
            console.log(userAnswer + " and " + actualAnswer);
            answerText.textContent = "You are incorrect. The answer is: ";
            answer.style.display = "block";
            replayGame();
            scoreUpdate("failure");
        }
    })
};

//for the clear button
var clearAnswer = function () {
    var clearButton = document.getElementById("clearButton");
    clearButton.addEventListener("click", function () {
        var currentInput = inputBox.textContent;
        var newInput = currentInput.slice(0, currentInput.length - 1);
        inputBox.textContent = newInput;
    });
};


document.addEventListener("DOMContentLoaded", init);

