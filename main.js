console.log('Hangman has started.');
const canvas = document.getElementById('gameArea');
const ctx = canvas.getContext('2d');

function drawGame(){
    clearScreen();
    drawStand();

    //drawHead();
    //drawBody();
    //drawArmLeft();
    //drawArmRight();
    //drawLegLeft();
    //drawLegRight();
}

function drawStand(){
    ctx.fillStyle = "white";
    ctx.fillRect(200, 650, 550, 20);

    ctx.fillStyle = "white";
    ctx.fillRect(300, 50, 20, 600);

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
    ctx.fillRect(555, 210, 10, 200);
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
    ctx.translate(562, 410);
    ctx.rotate(120*Math.PI/180);
    ctx.fillRect(0, 0, 150, 10);
    ctx.restore();
}

function drawLegRight(){
    ctx.save();
    ctx.fillStyle = "green";
    ctx.translate(562, 400);
    ctx.rotate(60*Math.PI/180);
    ctx.fillRect(0, 0, 150, 10);
    ctx.restore();
}

function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);
}

drawGame();