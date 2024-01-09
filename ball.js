//link to canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//Keyboard
document.addEventListener("keydown", keydownhadler,false );
document.addEventListener("keyup", keyuphadler, false);
let upArrow = false;
let downArrow = false;
let w = false;
let s = false;

let leftscore = document.getElementById("leftscore");
let rightscore = document.getElementById("rightscore");
let rightPlayerScore = leftPlayerScore = 0;

function keydownhadler(event){
    // consle.log(event);
    event.preventDefault();
    if(event.keyCode === 38){
        upArrow = true;
    }else if(event.keyCode === 40){
        downArrow = true;
    }else if(event.keyCode == 83){
        s = true;
    }else if(event.keyCode == 87){
        w = true;
    }
}

function keyuphadler(event){
    if(event.keyCode == 38){
        upArrow = false;
    }else if(event.keyCode == 40){
        downArrow = false;
    }else if(event.keyCode == 87){
        w = false;
    }else if(event.keyCode == 83){
        s = false;
    }
    
}
//End keyboard

let x = y = 30;
let dx = dy = 6;



//sound
let coin = new Audio();
coin.src = "coin.wav";

//sound
let game = new Audio();
game.src = "game.wav";

//paddles
//left
let lpw = 10;
let lph = 400;
let lpx = 20;
let lpy = canvas.height - lph / 2;
//right
let rpw = 10;
let rph = 400;
let rpx = canvas.width-30;
let rpy = canvas.height - rph / 2;



function drawBall(){
    ctx.fillStyle="white";

    //draw the ball
     ctx.beginPath();
     ctx.arc(x,y, 20, 0, 2 * Math.PI,false);
     ctx.closePath();
     ctx.fill();
   
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function moveBall(){
    x += dx;
    y += dy;
    console.log("x: "+ x +" y: "+ y);
}

function checkBallPos(){
   //bottom
    if(y > canvas.height){
        dy = dy * -1;
        coin.play();
    }
    //right
    if(x > canvas.width){
        dx =  dx * -1
        coin.play();
        leftPlayerScore++;
        if(leftPlayerScore == 5){
            gameover();
        }
    }
    //top
    if(y < 0){
    dy = dy * -1
    coin.play();
    }
    //left
    if(x < 0){
        dx =  dx * -1
        coin.play();
        rightPlayerScore++;
        if(rightPlayerScore == 5){
            gameover();
        }
    }
    //checkrightpaddle
    if(x > rpx &&
        x <= rpx + rpw &&
        y >= rpy &&
        y <= rpy + rph){
        dx = dx * -1;
    }

    //checkleftpaddle
    if(x > lpx &&
        x <= lpx + lpw &&
        y >= lpy &&
        y <= lpy + lph){
        dx = dx * -1;
    }

}

function drawPadles(){
    //left
ctx.fillStyle="red";
ctx.fillRect(lpx, lpy, lpw, lph);
  

    //right
    ctx.fillStyle="cyan";
    ctx.fillRect(rpx, rpy, rpw, rph);
}

function movePaddles(){
    if(upArrow){
        rpy -= 10;
        if(rpy < 0){
           rpy = 0;
        }
        

    }else if(downArrow){
        rpy += 10;
        if( rpy + rph > canvas.height){
            rpy = canvas.height - rph;
            
        }
    }else if(w){
        lpy -= 10;
        if(lpy < 0){
           lpy = 0;
        }
        

    }else if(s){
        lpy += 10;
        if( lpy + rph > canvas.height){
            lpy = canvas.height - lph;
            
        }
    }
}


function displayScore(){
    leftscore.innerHTML = "left: "+ leftPlayerScore;
    rightscore.innerHTML = "right: "+ rightPlayerScore;
}

function gameover(){
    clearInterval(startBall);
    clearCanvas();
    ctx.fillStyle="white";
    ctx.textAlign = "center";
    ctx.font="bold 48px sans serif";
    ctx.fillText ("Game Over You Loser", canvas.width/2, canvas.height/2);
    if(leftPlayerScore == 5){
        ctx.fillText ("Left Player Wins", canvas.width/2, canvas.height/2 + 48);
    }else{
        ctx.fillText ("Right Player Wins", canvas.width/2, canvas.height/2 + 48);
    }
    game.play();
   
}

function main(){
clearCanvas();
drawBall();
drawPadles();
moveBall();
movePaddles();
checkBallPos();
displayScore();
// console.log("in main")
}

let startBall = setInterval(main, -10000)


