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


//Starting timer + unhiding quiz

function startQuiz() {
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    getQuestion()
}

// Timer 

function clockTick() {
    time--
    timerEl.textContent = time;
    if (
        time <= 0
    ) {
        quizEnd()
    }
}

// Showing question + choices, create loop through all qs

function getQuestion() {
    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex];
  
    // update title with current question
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;
  
    // clear out any old question choices
    choicesEl.innerHTML = "";
  
    // loop over choices
    currentQuestion.choices.forEach(function(choice, i) {
      // create new button for each choice
      var choiceNode = document.createElement("button");
      choiceNode.setAttribute("class", "choice");
      choiceNode.setAttribute("value", choice);
  
      choiceNode.textContent = i + 1 + ". " + choice;
  
      // attach click event listener to each choice
      choiceNode.onclick = questionClick;
  
      // display on the page
      choicesEl.appendChild(choiceNode);
    });
  }

// Create feedback on user selection + move to next step

function questionClick() {
    if (
        this.Value = questions[currentQuestionIndex].answer
    ) {
        feedbackEl.textContent = "Correct!"
        // Insert sfx
        
    } else {
        time = time - 15
        timerEl.textContent = time
        // Insert sfx 
        feedbackEl.textContent = "Incorrect!"
    }

// Notify user of choice selection
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    currentQuestionIndex++

    if (
        currentQuestionIndex === questions.length
        
    ) {
        quizEnd()
    } else {
        getQuestion()
    }

}



// End quiz

function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute ("class");
    questionsEl.setAttribute ("class", "hide");

}

// User clicks button to start quiz

startBtn.onclick = startQuiz;
