console.log('Hangman has started.');
alert("Welcome to hangman, submit a word and then guess using characters, you get 6 mistakes and it is not case sensitive. You're incorrect guesses are in red on the side, while your correct ones are on the bottom, the game has been initialized with an arbitrary word but you may submit your own at any given time, good luck!");
const canvas = document.getElementById('gameArea');
const ctx = canvas.getContext('2d');
const word = document.getElementById('inputWord');
const letter = document.getElementById('inputLetter');
let theWord = "";
let wordArray = [];
let progress = [];
let guesses = [];
let guess = "";
let lives = 6;
let marks = 0;

function drawGame(){
    clearScreen();
    drawStand();

    for(let i = 1; i <= 2; i++){
        for(let j = 1; j <= 3; j++){
            ctx.fillStyle = 'rgb(100, 5, 5)';
            ctx.fillRect(40 * (i*i),150 * j,70,10);
        }
    }
}

function drawStand(){
    ctx.fillStyle = "white";
    ctx.fillRect(200, 600, 550, 20);

    ctx.fillStyle = "white";
    ctx.fillRect(300, 50, 20, 550);

    ctx.fillStyle = "white";
    ctx.fillRect(300, 50, 250, 20);

    ctx.fillStyle = "white";
    ctx.fillRect(550, 50, 20, 60);
}

function drawHead(){
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(560, 160, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(560, 160, 40, 0, Math.PI * 2);
    ctx.fill();
}

function drawBody(){
    ctx.fillStyle = "green";
    ctx.fillRect(555, 210, 10, 170);
}

function drawArmLeft(){
    ctx.save();
    ctx.fillStyle = "green";
    ctx.translate(562, 250);
    ctx.rotate(135*Math.PI/180);
    ctx.fillRect(0, 0, 100, 10);
    ctx.restore();
}

function drawArmRight(){
    ctx.save();
    ctx.fillStyle = "green";
    ctx.translate(562, 240);
    ctx.rotate(45*Math.PI/180);
    ctx.fillRect(0, 0, 100, 10);
    ctx.restore();
}

function drawLegLeft(){
    ctx.save();
    ctx.fillStyle = "green";
    ctx.translate(562, 380);
    ctx.rotate(120*Math.PI/180);
    ctx.fillRect(0, 0, 150, 10);
    ctx.restore();
}

function drawLegRight(){
    ctx.save();
    ctx.fillStyle = "green";
    ctx.translate(562, 370);
    ctx.rotate(60*Math.PI/180);
    ctx.fillRect(0, 0, 150, 10);
    ctx.restore();
}

function drawGuessProgress(i){
    ctx.fillStyle="white";
    ctx.font = "40px Verdana";
    ctx.fillText(guess,55 + i * 700/marks,740);
}

function isGameOver(){
    if(!progress.includes('0')) {
        ctx.fillStyle = 'yellow';
        ctx.font = '100px Verdana';
        ctx.fillText("Success!", canvas.clientWidth / 5, canvas.clientHeight / 2);

        alert('Submit a new word to start over.');
    }
    if(lives < 1) {
        ctx.fillStyle = 'yellow';
        ctx.font = '100px Verdana';
        ctx.fillText("You Lost!", canvas.clientWidth / 6.5, canvas.clientHeight / 2);

        alert('Submit a new word to start over.');
    }
}

function badGuess(){
    switch(lives){
        case 1:
            drawLegRight();
            ctx.fillStyle = 'rgb(100,5,5)';
            ctx.font = "90px Verdana";
            ctx.fillText(guess,165,440);
            break;
        case 2:
            drawLegLeft();
            ctx.fillStyle = 'rgb(100,5,5)';
            ctx.font = "90px Verdana";
            ctx.fillText(guess,40,440);
            break;
        case 3:
            drawArmRight();
            ctx.fillStyle = 'rgb(100,5,5)';
            ctx.font = "90px Verdana";
            ctx.fillText(guess,165,290);
            break;
        case 4:
            drawArmLeft();
            ctx.fillStyle = 'rgb(100,5,5)';
            ctx.font = "90px Verdana";
            ctx.fillText(guess,40,290);
            break;
        case 5:
            drawBody();
            ctx.fillStyle = 'rgb(100,5,5)';
            ctx.font = "90px Verdana";
            ctx.fillText(guess,165,140);
            break;
        case 6:
            drawHead();
            ctx.fillStyle = 'rgb(100,5,5)';
            ctx.font = "90px Verdana";
            ctx.fillText(guess,40,140);
            break;
        default:
            console.log('There has been an error calculating or interpreting the lives!');
            break;
    }
    lives--;
}

function wordErrorCheck(str){
    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; // the /  / indicate a regular expression, while the [ ] are called a character class and match any of the characters between, the \ is used to escape
    const numbers = /[123456790]/;

    if(specialChars.test(str)) {
        alert('Special characters or spaces not allowed!');
        return false;
    } else if(numbers.test(str)) {
        alert('Numbers not allowed!');
        return false;
    }
    return true;
}

function limit(element){
    if(element.value.length > 1)
        element.value=element.value.substr(0,1); //limits the number of characters in the letter guess box
}

function submitLetter(){
    if(theWord == null || theWord == "") {
        alert("You must have a word already submitted!");
        letter.value = null;
        return 0;
    }
        
    guess = null;
    if(letter.value != null && wordErrorCheck(letter.value)){
            guess = letter.value.toUpperCase();
    } else
        return 0;
    letter.value = null;

    let used = false;
    for(let i = 0; i < guesses.length; i++) {
        let temp = guesses[i];
        if(temp === guess){
            alert('You have already guessed this letter submit another!');
            used = true;
            break;
        }
    }

    let worked = false;
    if(!used) {
        guesses[guesses.length] = guess;
        for(let i = 0; i < wordArray.length; i++){
            let temp = wordArray[i];
            if(guess === temp){
                worked = true;
                progress[i] = guess;
                drawGuessProgress(i);
            }
        }
        if(!worked)
            badGuess();
    }
    isGameOver();
    letter.value=null;
}

function submitWord(){
    drawGame();
    lives = 6;
    if (word.value != null) {
        if(wordErrorCheck(word.value)) {
            theWord = word.value.toUpperCase();
            wordArray = theWord.split("");
            progress = new Array(wordArray.length).fill('0');
            marks = wordArray.length;
            for(let i = 0; i < marks; i++){
                ctx.fillStyle="white";
                ctx.fillRect(50 + i * 700/marks,750,40,10);
            }
        }
    }
    word.value = null;
}

function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);
    theWord = "";
    wordArray = [];
    progress = [];
    guesses = [];
    guess = "";
    lives = 6;
    marks = 0;
}

drawGame();
word.value = 'javascript';
submitWord();