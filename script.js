// define elements
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var qImg = document.getElementById("qImg");
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
        question: "This is question #1?",
        imgSrc: "assets/html.png",
        choiceA: "The 1st Choice",
        choiceB: "The 2nd Choice",
        choiceC: "The 3rd Choice",
        choiceD: "The 4th Choice",
        correct: "A",
    },
    {
        question: "This is question #2?",
        imgSrc: "assets/css.png",
        choiceA: "The 1st Choice",
        choiceB: "The 2nd Choice",
        choiceC: "The 3rd Choice",
        choiceD: "The 4th Choice",
        correct: "B",
    },
    {
        question: "This is question #3?",
        imgSrc: "assets/js.png",
        choiceA: "The 1st Choice",
        choiceB: "The 2nd Choice",
        choiceC: "The 3rd Choice",
        choiceD: "The 4th Choice",
        correct: "C",
    },
    {
        question: "This is question #4?",
        imgSrc: "assets/html.png",
        choiceA: "The 1st Choice",
        choiceB: "The 2nd Choice",
        choiceC: "The 3rd Choice",
        choiceD: "The 4th Choice",
        correct: "D",
    },
    {
        question: "This is question #5?",
        imgSrc: "assets/css.png",
        choiceA: "The 1st Choice",
        choiceB: "The 2nd Choice",
        choiceC: "The 3rd Choice",
        choiceD: "The 4th Choice",
        correct: "A",
    },
    {
        question: "This is question #6?",
        imgSrc: "assets/js.png",
        choiceA: "The 1st Choice",
        choiceB: "The 2nd Choice",
        choiceC: "The 3rd Choice",
        choiceD: "The 4th Choice",
        correct: "B",
    },
    {
        question: "This is question #7?",
        imgSrc: "assets/html.png",
        choiceA: "The 1st Choice",
        choiceB: "The 2nd Choice",
        choiceC: "The 3rd Choice",
        choiceD: "The 4th Choice",
        correct: "C",
    },
    {
        question: "This is question #8?",
        imgSrc: "assets/css.png",
        choiceA: "The 1st Choice",
        choiceB: "The 2nd Choice",
        choiceC: "The 3rd Choice",
        choiceD: "The 4th Choice",
        correct: "D",
    },
    {
        question: "This is question #9?",
        imgSrc: "assets/js.png",
        choiceA: "The 1st Choice",
        choiceB: "The 2nd Choice",
        choiceC: "The 3rd Choice",
        choiceD: "The 4th Choice",
        correct: "A",
    },
    {
        question: "This is question #10?",
        imgSrc: "assets/html.png",
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
var questionTime = 10;
var gaugeWidth = 150;
var gaugeProgressUnit = gaugeWidth/questionTime;
var TIMER;
var score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestionIndex];
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click", startQuiz);

// Start quiz
function startQuiz(){
    start.style.display = "none";
    renderCounter();
    quiz.style.display = "block";
    renderProgress();
    renderQuestion();
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
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = gaugeProgressUnit * count + "px";
        count++;
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestionIndex < lastQuestionIndex) {
            runningQuestionIndex++;
            renderQuestion();
        } else { 
            // end the quiz and show the score
            clearInterval(TIMER);
            renderScore();
        }
    }
}

// Check answer
function checkAnswer(answer){
    console.log(questions[runningQuestionIndex].coreect);
    console.log(answer);
    
    if(questions[runningQuestionIndex].coreect == answer) {
        // Answer is correct
        score++;
        // Change progress color to green
        answerIsCorrect();
    } else {
        // Answer is wrong
        // Change color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestionIndex < lastQuestionIndex) {
        runningQuestionIndex++;
        renderQuestion();
    } else {
        // End the quiz and show the score
        clearInterval(TIMER);
        renderScore();
    }
}
// Answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestionIndex).style.backgroundColor = "green";
}

// Answer is wrong
function answerIsWrong(){
    document.getElementById(runningQuestionIndex).style.backgroundColor = "red";
}

// Render score
function renderScore(){
    scoreDiv.style.display = "block";

    // Calculate quiz score in percent correct
    let scorePercent = Math.round(100 * score / questions.length);
    
    // Choose the image based upon score
    let img = ( scorePercent >= 80 ) ? "assets/5.png" :
              ( scorePercent >= 60 ) ? "assets/4.png" :
              ( scorePercent >= 40 ) ? "assets/3.png" :
              ( scorePercent >= 20 ) ? "assets/2.png" : 
              "assets/1.png"; 

      scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePercent +"%</p>";
}
