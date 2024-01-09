//link to canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//score
let gameScore = document.getElementById("gameScore");

//Game Variables



//keyboard
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
let LeftArrow = false;
let RightArrow = false;
let SpaceBar = false;

function keyDownHandler(event){
    //console.log(event);
    event.preventDefault();
    if(event.code === "ArrowLeft"){
        LeftArrow = true;
    }else if(event.code === "ArrowRight"){
        RightArrow = true;
    }else if(event.code === "Space"){
        SpaceBar = true;
    }
}

function keyUpHandler(event){
    event.preventDefault();
    if(event.code === "ArrowLeft"){
        LeftArrow = false;
        console.log("left");
    }else if(event.code === "ArrowRight"){
        RightArrow = false;
        console.log("right");
    }else if(event.code === "Space"){
        SpaceBar = false;
    }
}

function clearCanvas(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

function drawmissile(){
    ctx.fillStyle = missile.color;
    ctx.fillRect(missile.x, missile.y, missile.w, missile.h)
}
function moveMissile(){
    console.log(missile.y);
    missile.y -=10;
    if(missile.y  <0){
        missile.fire = false;
        missile.y = ship.y;
    }
    drawmissile();
    checkMissilePos();
}

function drawEnemy(){
    if(enemy.alive)
   {ctx.fillStyle = "gray";
    ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h,);}
}

function checkMissilePos(){
    if(missile.x >= enemy.x &&
        missile.x <= (enemy.x + enemy.w)&&
        missile.y >= enemy.y &&
        missile.y <= enemy.y + enemy.h)
        {console.log("hit");
            enemy.alive = false;
        }
}

let ex = 5

function moveEnemy(){
enemy.x+= enemy.dx;;
if(enemy.x + enemy.w > canvas.width || enemy.x <= 0){
enemy.dx *= -1
enemy.y += enemy.h;
    ex*= -1
}
}

// ########### End Keyboard

/**************** Your Code Here **************************** */

var ship = {
x: canvas.width/2,
y: canvas.height - 50,
w: 40,
h: 40
}

let missile = {
    x: ship.x/2,
    y: ship.y,
    w: 3,
    h: 3,
    color: "red",
    fire: false
};

let enemy = {
    x:400,
    y:50,
    w:30,
    h:30,
    alive:true,
    dx:7


}

function drawShip(){
    ctx.fillStyle = "lime";
    ctx.fillRect(ship.x, ship.y, ship.w, ship.h,);
    missile.x = ship.x + (ship.w / 2)
    // missile.y = ship.y;
}

function moveShip(){
    if(LeftArrow){
        ship.x -= 10;
        if(ship.x < 0) ship.x = 0;
    }
    if(RightArrow){
        ship.x += 10;
        if(ship.x > (canvas.width - ship.w)) ship.x = canvas.width - ship.w;
    }
    if(SpaceBar){
        missile.fire = true;
    }
}


//**************** END Your Code Here **************************** */

/////MAin 
function gameOver(){
    clearInterval(start);
    clearCanvas();
}

function main(){
    clearCanvas();
    drawShip();
    drawEnemy();
    moveShip();
    moveEnemy();
    if(missile.fire) moveMissile();

}

let start = setInterval(main, 10);