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
var scoreDiv = document.getElementById("scoreContainer");

var questions = [
    {
        question: "This is question #1?This is question #1?This is question #1?",
        choiceA: "The 1st Choice",
        choiceB: "The 2nd Choice",
        choiceC: "The 3rd Choice",
        choiceD: "The 4th Choice",
        correct: "A",
    },
    {
        question: "This is question #2?",
        choiceA: "The 1st Choice",
        choiceB: "The 2nd Choice",
        choiceC: "The 3rd Choice",
        choiceD: "The 4th Choice",
        correct: "B",
    },
    {
        question: "This is question #3?",
        choiceA: "The 1st Choice",
        choiceB: "The 2nd Choice",
        choiceC: "The 3rd Choice",
        choiceD: "The 4th Choice",
        correct: "C",
    },
    {
        question: "This is question #4?",
        choiceA: "The 1st Choice",
        choiceB: "The 2nd Choice",
        choiceC: "The 3rd Choice",
        choiceD: "The 4th Choice",
        correct: "D",
    },
    {
        question: "This is question #5?",
        choiceA: "The 1st Choice",
        choiceB: "The 2nd Choice",
        choiceC: "The 3rd Choice",
        choiceD: "The 4th Choice",
        correct: "A",
    },
    {
        question: "This is question #6?",
        choiceA: "The 1st Choice",
        choiceB: "The 2nd Choice",
        choiceC: "The 3rd Choice",
        choiceD: "The 4th Choice",
        correct: "B",
    },
    {
        question: "This is question #7?",
        choiceA: "The 1st Choice",
        choiceB: "The 2nd Choice",
        choiceC: "The 3rd Choice",
        choiceD: "The 4th Choice",
        correct: "C",
    },
    {
        question: "This is question #8?",
        choiceA: "The 1st Choice",
        choiceB: "The 2nd Choice",
        choiceC: "The 3rd Choice",
        choiceD: "The 4th Choice",
        correct: "D",
    },
    {
        question: "This is question #9?",
        choiceA: "The 1st Choice",
        choiceB: "The 2nd Choice",
        choiceC: "The 3rd Choice",
        choiceD: "The 4th Choice",
        correct: "A",
    },
    {
        question: "This is question #10?",
        choiceA: "The 1st Choice",
        choiceB: "The 2nd Choice",
        choiceC: "The 3rd Choice",
        choiceD: "The 4th Choice",
        correct: "B",
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
            console.log(finalScore);
            clearInterval(TIMER);
            renderScore();
        }
}
// Answer is correct - green background
function answerIsCorrect(){
    document.getElementById(runningQuestionIndex).style.backgroundColor = "green";
}

// Answer is wrong - red background and reduce time by 10
function answerIsWrong(){
    document.getElementById(runningQuestionIndex).style.backgroundColor = "red";
    count = count + 10;
}

// Render score
function renderScore(){
    console.log(count);
    scoreDiv.style.display = "block";

    // Calculate quiz score in percent correct
    let scorePercent = Math.round(100 * score / questions.length);
    
    // Choose the image based upon score
    let img = ( finalScore >= 30 ) ? "assets/5.png" :
              ( finalScore >= 22 ) ? "assets/4.png" :
              ( finalScore >= 16 ) ? "assets/3.png" :
              ( finalScore >= 8 ) ? "assets/2.png" : 
              "assets/1.png"; 

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>Score = "+ finalScore +"</p>";
}
