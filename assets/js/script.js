var wordContainer = document.querySelector(".word-container");
var startButton = document.querySelector(".start-game");
var startPage = document.querySelector(".starting-page");
var finalResult = document.querySelector(".result");
var timer = document.querySelector(".timer");
var score = document.querySelector(".score");
var usedLetters = [];

var time = 512;
var wordLength = 0;
var lettersGuessed = 0;

var arrayOfRandomWords = ["Oona","Kiki","Sansa","Araceli","Cocoles"] //Añadir nuevas palabras

if (localStorage.getItem("winned") == null) {
    var wins = 0; 
}else{
    var wins = localStorage.getItem("winned");
}

if (localStorage.getItem("losed") == null) {
    var loses = 0; 
}else{
    var loses = localStorage.getItem("losed");
}



function createLetter(letter) {
    var newFrame = document.createElement("div");
    newFrame.setAttribute("class","word-frame");
    var newLetter = document.createElement("p");
    newLetter.setAttribute("class","letter");
    newLetter.setAttribute("style","color:white;"); 
    newLetter.textContent = letter.toUpperCase();

    newFrame.appendChild(newLetter);
    wordContainer.appendChild(newFrame);
}

function setNewWord(event){
    event.preventDefault();
    startPage.setAttribute("style","display:none;");
    wordContainer.setAttribute("style","display:flex;");
    startTime();
    var newWord = arrayOfRandomWords[Math.round(Math.random()*(arrayOfRandomWords.length-1))]; //randomizar esto
    wordLength = newWord.length;
    for (i = 0; i < newWord.length; i++) {
        createLetter(newWord.substring(i,i+1));
    }
}


function prueba(){
    alert("hola")
}

function setWinsAndLoses(){
    score.textContent = 'W: ' + wins + " - L: " + loses;
}

function setTime(){
    var minutes = Math.floor(time/60);
    var seconds = time-minutes*60;

    if(seconds > 9){
        timer.textContent = "Time: " + minutes + ":" + seconds;
    }else{
        timer.textContent = "Time: " + minutes + ":0" + seconds;
    }


}

function startTime(){
    time = 300;
    var timeInternval = setInterval( function(){
        time--;
        setTime();
        if (time <= 0) {
            youLose();
            clearInterval(timeInternval);
        }
        if (lettersGuessed == wordLength) {
            clearInterval(timeInternval);
        }
    },1000)
}

function resetGame() {
    var reset = confirm("Wanna play again?")
    if(reset){
        for (i = 0; i < wordLength; i++) {
            wordContainer.removeChild(wordContainer.childNodes[0]);  
        }
        startPage.setAttribute("style","display:flex;");
        wordContainer.setAttribute("style","display:none;");
        finalResult.textContent = "";
        lettersGuessed = 0;
        usedLetters = [];
    }
}

function youWin() {
    finalResult.textContent = "YOU WIN";
    wins++;
    localStorage.setItem("winned",wins)
    setWinsAndLoses();
    setTimeout(resetGame, 2000);
}

function youLose() {
    loses++;
    localStorage.setItem("losed",loses)  
    setWinsAndLoses();
    finalResult.textContent = "YOU LOSE";
    setTimeout(resetGame, 2000);

}


startButton.addEventListener("click", setNewWord);

document.addEventListener('keydown', function(event) {
    var keyInWord = false;
       
    if (!usedLetters.includes(event.key.toUpperCase())) {
        usedLetters.push(event.key.toUpperCase());
        for (i = 0; i < wordLength; i++) {
            if (wordContainer.children[i].children[0].textContent == event.key.toUpperCase()) {
                wordContainer.children[i].children[0].setAttribute("style","color:black;");  
                keyInWord = true;
                lettersGuessed++;
            }
        }
        if (lettersGuessed == wordLength && wordLength != 0) {
            youWin();
        }
        if(!keyInWord){
            time = time - 30;
        }
    }


})

setWinsAndLoses();
