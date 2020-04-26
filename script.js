// define elements
var start = document.getElementById("start");
var startBtn = document.getElementById("startBtn");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var progress = document.getElementById("progress");
var lastQuestGrade = document.getElementById("lastQuestGrade");
var scoreDiv = document.getElementById("scoreContainer");
var smilyFace = document.getElementById("smilyFace");
var quizScore = document.getElementById("quizScore");

var submitBtn = document.querySelector("#submitBtn");
var inputInitials = document.querySelector("#inputInitials")
var msgDiv = document.querySelector("#msg");
var userInitialsSpan = document.querySelector("#userInitials");
var userFinalScore = document.querySelector("#userFinalScore");


var questions = [
    {
        question: "When a user views a page containing a JavaScript program, which machine actually executes the script?",
        choiceA: "The User's machine running a Web browser",
        choiceB: "The Web server",
        choiceC: "A central machine deep within Netscape's corporate offices",
        choiceD: "None of the above",
        correct: "A",
    },
    {
        question: "Which of these is not a logical operator?",
        choiceA: "!",
        choiceB: "&",
        choiceC: "&&",
        choiceD: "||",
        correct: "B",
    },
    {
        question: "Which of these operators compares two variables by value AND type?",
        choiceA: "===",
        choiceB: "None of these",
        choiceC: "==",
        choiceD: "=",
        correct: "A",
    },
    {
        question: " The `else` statement is ___",
        choiceA: "Does not exist, in JavaScript `or` and `then` are used to specify code to execute for the “false” case of the `if` statement.",
        choiceB: "Used inside of an `if` statement. To specify the code that should execute if the `if` condition is no longer true.",
        choiceC: "used together with the `if` statement to specify the code that should execute when the `if` condition is false.",
        choiceD: "None of the above",
        correct: "C",
    },
    {
        question: "Which is not a primitive data type in JavaScript?",
        choiceA: "boolean",
        choiceB: "number",
        choiceC: "string",
        choiceD: "character",
        correct: "D",
    },
];

var lastQuestionIndex = questions.length - 1;
var runningQuestionIndex = 0;
var count = 0;
var quizTime = 60;
var gaugeWidth = 150;
var gaugeProgressUnit = gaugeWidth/quizTime;
var TIMER;
var final = 0;
var score = 0;

// Render a question
function renderQuestion(){
    let q = questions[runningQuestionIndex];
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = "1. "+ q.choiceA;
    choiceB.innerHTML = "2. "+ q.choiceB;
    choiceC.innerHTML = "3. "+ q.choiceC;
    choiceD.innerHTML = "4. "+ q.choiceD;
}

startBtn.addEventListener("click", startQuiz);

// Start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER=setInterval(renderCounter,1000);
}

// Render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestionIndex; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// Render counter
function renderCounter(){
    if(count <= quizTime){
        counter.innerHTML = quizTime - count;
        timeGauge.style.width = gaugeProgressUnit * count + "px";
        count++;
    } else {
            // end the quiz and show the score
            finalScore = 0;
            console.log(finalScore);
            clearInterval(TIMER);
            renderScore();
    }
}

// Check answer
function checkAnswer(answer){
    
    if(questions[runningQuestionIndex].correct == answer) {
        // Answer is correct
        score++;
        answerIsCorrect();
    } else {
        // Answer is wrong
        answerIsWrong();
    }
    if(runningQuestionIndex < lastQuestionIndex) {
        runningQuestionIndex++;
        renderQuestion();
        } else {
            finalScore = quizTime - count;
            if (finalScore < 0) {finalScore = 0};
            clearInterval(TIMER);
            renderScore();
        }
}
// Answer is correct - green background
function answerIsCorrect(){
    lastQuestGrade = "Correct!";
    document.getElementById("lastQuestGrade").innerHTML = lastQuestGrade;
    document.getElementById(runningQuestionIndex).style.backgroundColor = "green";
}

// Answer is wrong - red background and reduce time by 10
function answerIsWrong(){
    lastQuestGrade = "Wrong!";
    document.getElementById("lastQuestGrade").innerHTML = lastQuestGrade;
    document.getElementById(runningQuestionIndex).style.backgroundColor = "red";
    count = count + 10;
}

// Render score
function renderScore(){
    quiz.style.display = "none";
    scoreDiv.style.display = "block";
    let scorePercent = Math.round(100 * score / questions.length);
    quizScore.innerHTML += "<p>Score = "+ finalScore +"</p>";
}

// Submit Score
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();

    scoreContainer.style.display = "none";

    //highScoreContainer.style.disply = "block";

    var initials = document.querySelector("#inputInitials").value;

    localStorage.setItem("initials", initials);
    localStorage.setItem("finalScore", finalScore);
    console.log(initials);
    console.log(finalScore);
    // renderLastRegistered();
});


