const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = {x:100,y:100,size:20,health:100};
let score = 0;
let level = 1;
let enemies = [];
let bullets = [];
let doors = [];

function spawnEnemy(){
enemies.push({
x:Math.random()*800+50,
y:Math.random()*500+50,
size:20
});
}

function spawnDoor(){
doors.push({
x:Math.random()*800+50,
y:Math.random()*500+50,
size:30
});
}

for(let i=0;i<3;i++) spawnEnemy();
spawnDoor();

document.addEventListener("keydown",movePlayer);

function movePlayer(e){
if(e.key==="ArrowUp") player.y-=10;
if(e.key==="ArrowDown") player.y+=10;
if(e.key==="ArrowLeft") player.x-=10;
if(e.key==="ArrowRight") player.x+=10;

if(e.key===" "){
bullets.push({x:player.x,y:player.y});
}
}

function gameLoop(){
ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="blue";
ctx.fillRect(player.x,player.y,player.size,player.size);

ctx.fillStyle="red";
enemies.forEach(enemy=>{
ctx.fillRect(enemy.x,enemy.y,enemy.size,enemy.size);
});

ctx.fillStyle="green";
doors.forEach(door=>{
ctx.fillRect(door.x,door.y,door.size,door.size);
});

ctx.fillStyle="yellow";
bullets.forEach(b=>{
b.x+=15;
ctx.fillRect(b.x,b.y,5,5);
});

checkCollisions();

requestAnimationFrame(gameLoop);
}

function checkCollisions(){

// enemy collision
enemies.forEach(enemy=>{
if(Math.abs(player.x-enemy.x)<20 && Math.abs(player.y-enemy.y)<20){
player.health-=1;
document.getElementById("health").innerText=player.health;
}
});

// door collision triggers quiz
doors.forEach((door,index)=>{
if(Math.abs(player.x-door.x)<20 && Math.abs(player.y-door.y)<20){
openQuiz();
doors.splice(index,1);
}
});
}

function openQuiz(){
const modal=document.getElementById("quizModal");
modal.style.display="flex";

let randomQ=quizQuestions[Math.floor(Math.random()*quizQuestions.length)];
document.getElementById("questionText").innerText=randomQ.question;

let answersDiv=document.getElementById("answers");
answersDiv.innerHTML="";

randomQ.answers.forEach((answer,i)=>{
let div=document.createElement("div");
div.className="answer";
div.innerText=answer;
div.onclick=function(){
if(i===randomQ.correct){
score+=100;
document.getElementById("score").innerText=score;
}
modal.style.display="none";
};
answersDiv.appendChild(div);
});
}

gameLoop();
