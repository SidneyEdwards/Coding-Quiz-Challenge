var mainEl = document.querySelector(".main");
var startBtnEl = document.querySelector('#start-btn');
var timerEl = document.querySelector("#time-al");
var interval;
var time = 100;
var questionIndex = 0;

//these need work
var userInfo = document.querySelector (".user-info");  
var userScore = document.querySelector (".user-score")


var lastQuestionCorrect= "";
var score = 0;
var viewScore = document.querySelector("#view-score");
var viewHighScore = document.querySelector("#high-score-view");
var highScoreArr = JSON.parse(localStorage.getItem(".highScores")) || [];
var highScoresDisplayUl = document.querySelector("#high-scores-display");
var button2 = document.createElement ("button");
var input = document.createElement ("input");


//Three questions with three multiple choice options
var questions= [
{
    questionText: "Which style of punk was developed by The Misfits?",
    questionChoices: ["Folk Punk", "Horror Punk", "Hardcore Punk"],
    correctAnswer: 1
},
{
    questionText:"Which act did Sid Vicious play drums for at their notorious first gig at the 100 Club Punk Festival in London's Oxford Street?",
    questionChoices: ["Black Flag", "Siouxsie and the Banshees", "The Sex Pistols"],
    correctAnswer: 2
},
{
    questionText:"What Canadian 70's punk band, featuring Joe Keithley, reunited in 2002 and then again in 2014?",
    questionChoices: ["The Riptides", "The Real McKenzies", "D.O.A"],
    correctAnswer: 2
}

];



//Empty out the main div to loop through the questions
function displayQuestion () {
    mainEl.innerHTML = "";

    if (questionIndex >= questions.length){
        endGame();
        return;
    }

    var h1El = document.createElement('h1');
    h1El.textContent =  questions [questionIndex].questionText;
    mainEl.appendChild(h1El);

    var btnDivEl = document.createElement("div");
    mainEl.appendChild(btnDivEl);

    var pEl = document.createElement('p');
    pEl.textContent = lastQuestionCorrect;
    mainEl.appendChild(pEl);

    btnDivEl.addEventListener("click", function (event) {
        var target = event.target;

        if (target.getAttribute("class") !== 'btn') return;

    var clickedQuestionIndex = parseInt(target.getAttribute("data-index"));
    
    console.log(clickedQuestionIndex);
    if(clickedQuestionIndex ===  questions[questionIndex].correctAnswer) {
        lastQuestionCorrect = "Correct!"
        score += 10;
    } else {
        time = time - 10;
        lastQuestionCorrect = "Sorry- Incorrect."
    }

    questionIndex++;

    displayQuestion();

    });

    for (var i = 0; i < questions[questionIndex].questionChoices.length; i++){
    var buttonEl = document.createElement('button');
    buttonEl.textContent = questions[questionIndex].questionChoices[i];   
    buttonEl.setAttribute("class", "btn");
    buttonEl.setAttribute("data-index", i);
    btnDivEl.appendChild(buttonEl);
    }

    
};

//need function to send score to userScore element


//Start button to signal the start of the game and the timer.
startBtnEl.addEventListener ("click", function (event) {
    console.log("hit");

    mainEl.innerHTML="";

    interval = setInterval (function () {
        time--;
        timerEl.textContent = `Time: ${time}`;

    if(time <= 0){
        clearInterval(interval);
        endGame();
        return;
    }

}, 1000);

displayQuestion();

});

//need to add the score from the game to the userScore element
function submitFunction (event) {
    userScore.innerHTML = score;
console.log(event.target);
    var scoreObj = {
        score: score,
        userInfo: document.getElementById("user-info").value

        // var val = document. querySelector('input'). value;
    }
console.log(scoreObj);
        var highScoreArr = JSON.parse(localStorage.getItem("highScores")) || [];
        highScoreArr.push(scoreObj);
        localStorage.setItem("highScores", JSON.stringify(highScoreArr));
        questionIndex = 0;
        startBtnEl.disabled = false;
        score = 0;
        viewScore.innerHTML = "";
        displayHighScore();
        userScore.textContent = "";


}

//end game and clear the questions---> High Scores Page
function endGame() {
        clearInterval(interval);
        
        // score = score + EventCounts (lastQuestionCorrect === "correct!")
        userInfo.innerHTML ="";
        var h2El = document.createElement ("h2");
        input.setAttribute ("placeholder", "Enter your Name");
        viewScore.appendChild(h2El);
        input.setAttribute("id", "user-info")
        viewScore.appendChild(input);
        viewScore.appendChild(button2);

        h2El.textContent = "Your Score:" + score;
        button2.textContent = "Submit";

        
};



function displayHighScore(){
    var highScoreArr = JSON.parse(localStorage.getItem("highScores")) || [];
        highScoresDisplayUl.innerHTML = "";

    highScoreArr.forEach(function (scoreObj) {
        var liEl = document.createElement("li");
        liEl.textContent = `${scoreObj.userInfo}: ${scoreObj.score}`;
        highScoresDisplayUl.appendChild(liEl);

    });
        
    }

    button2.addEventListener("click", submitFunction);