// variables to keep track of quiz state

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


// variables to ref DOM elements

var questionsEl = document.getElementById("questions");

var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

function startQuiz() {
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    getQuestion()
}

function clockTick() {
    time--
    timerEl.textContent = time;
    if (
        time <= 0
    ) {
        quizEnd()
    }
}

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex]
    var titleEl = document.getElementById("question-title")
    titleEl.textContent = currentQuestion.title
    choicesEl.innerHTML = ""
    currentQuestion, choices.forEach(function (choice) {
        var choiceNode = document.createElement("button")
        choiceNode.setAttribute("class", "choice")
        choiceNode.setAttribute("value", choice)
        choiceNode.textContent = choice
        choiceNode.onclick = questionClick
        choicesEl.appendChild(choiceNode)
    })
}

function questionClick() {
    if (
        this.Value !== questions[currentQuestionIndex].answer
    ) {
        time = time - 15
        timerEl.textContent = time
        // Insert sfx here
        feedbackEl.textContent = "Incorrect answer."
    } else {
        feedbackEl.textContent = "Correct answer!"
        // Insert sfx
    }

    currentQuestionIndex++

    if (
        currentQuestionIndex === questions.length
        
    ) {
        quizEnd()
    } else {
        getQuestion()
    }


}

function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute ("class");
    questionsEl.setAttribute ("class", "hide");

}

// user clicks button to start quiz

startBtn.onclick = startQuiz;
