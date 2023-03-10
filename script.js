// GAME CONSTANTS AND VARIABLE
const upBtn=document.querySelector(".up");
const downBtn=document.querySelector(".down");
const leftBtn=document.querySelector(".left");
const rightBtn=document.querySelector(".right");


let inputDir={x:0,y:0};
const foodSound=new Audio("food.mp3");
const gameoverSound=new Audio("gameOver.mp3");
const moveSound=new Audio("move.mp3");
const musicSound=new Audio ("music.mp3");
let speed=2;
let lastPaintTime=0;
let snakeArr=[
  {x:13,y:15}
]
let food={x:6,y:7};
let score=0;
// GAME FUNCTIONS
function main(ctime){
  window.requestAnimationFrame(main);
  if((ctime-lastPaintTime)/1000<1/speed){
    return;
  }
  lastPaintTime=ctime;
gameEngine();
}

function isCollide(snake){
  //if snake pump itself
  for(let i=1;i<snake.length;i++){
  if(snake[i].x===snake[0].x&&snake[i].y===snake[0].y){
    score=0;
    return true;
  }
    }
  
  //If snake pump into the wall
  
    if(snake[0].x>=18||snake[0].x<=0 ||snake[0].y>=18||snake[0].y<=0){
      score=0;
      return true;
    }
  
  
}

function gameEngine(){
  // UPDATING THE SNAKE ARRAY
  musicSound.play();
  if(isCollide(snakeArr)){
    gameoverSound.play();
    musicSound.pause();
    inputDir={x:0,y:0};
    speed=2;
    alert("Game Over, Press any key to restart");
    snakeArr=[{x:13,y:15}];
    musicSound.play();
    score=0;
    scoreBox.innerHTML=`Score: ${score}`;
  }
  //If you eat food thhen increment  the score and regenerate the food
  
  if(snakeArr[0].y===food.y&&snakeArr[0].x===food.x){
    foodSound.play();
    score+=1;
    speed+=0.5;
    if(score>highScoreValue){
    highScoreValue=score; 
    localStorage.setItem("highScore",JSON.stringify(highScoreValue));
    highscoreBox.innerHTML=`High-Score:${highScoreValue}`
           }
    scoreBox.innerHTML=`Score: ${score}`
    snakeArr.unshift({x:snakeArr[0].x+inputDir.x, y:snakeArr[0].y+inputDir.y});
    let a=2;
    let b=16;
    food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
  }
  
  //Move Snake
  
  for(let i=snakeArr.length-2;i>=0;i--){
    const element=snakeArr[i];
    snakeArr[i+1]={...snakeArr[i]};
  }
  
  snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;
  
  //DISPLAY THE SNAKE AND FOOD
  // DISPLAY THE SNAKE
  board.innerHTML="";
  snakeArr.forEach((e,index)=>{
     snakeElement=document.createElement("div");
    snakeElement.style.gridRowStart=e.y;
    snakeElement.style.gridColumnStart=e.x;
    if(index===0){
           snakeElement.classList.add("head");
    }else{
        snakeElement.classList.add("snake");}
         board.appendChild(snakeElement);
  });
  // DISPLAY THE FOOD
    foodElement=document.createElement("div");
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
  
}

// MAIN LOGICS START FROM HERE

let highScore=localStorage.getItem("highScore");
if(highScore==null){
  highScoreValue=0;
highScore=localStorage.setItem("highScore",JSON.stringify(highScoreValue));}
else{
  highScoreValue=JSON.parse(highScore);
  highscoreBox.innerHTML=`High-Score:${highScore}`
}
window.requestAnimationFrame(main);
window.addEventListener("keydown",movedBtn)
// WHEN USER PLAY ON MOBILE
function movedBtn(value){
  console.log("called",value);
  inputDir={x:0,y:1} //start game
 if(this===window){
   value=value.key;
   console.log("wrong")
 }
  moveSound.play();
  
  switch(value){
    case "ArrowUp":
                   inputDir.x=0;
                   inputDir.y=-1;
      break;
      
    case "ArrowDown":console.log('ArrowDown');
                     inputDir.x=0;
                     inputDir.y=1;
      break;
      
    case "ArrowLeft":console.log('ArrowLeft');
                      inputDir.x=-1;
                      inputDir.y=0;
      break;
      
    case "ArrowRight":console.log('ArrowRight');
                      inputDir.x=1;
                      inputDir.y=0;
      break;
    
    default:break;
  }}

upBtn.addEventListener("click", function() {
  movedBtn.call(upBtn, "ArrowUp");
});
downBtn.addEventListener("click", function() {
  movedBtn.call(downBtn, "ArrowDown");
});
leftBtn.addEventListener("click", function() {
  movedBtn.call(leftBtn, "ArrowLeft");
});
rightBtn.addEventListener("click", function() {
  movedBtn.call(rightBtn, "ArrowRight");
});

