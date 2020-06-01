//variable of player,enemy,powerball
var score=0,gscore = 0, ghost = false;
var player = {
    x:30,y:30,    
    pacmouth:320,
    pacdir :0,
    speed:10
}
var enemy = {
    x:100,y:100,    
    speed:5,ghostNum :0, ghostupgrade:0,num:10,
    ghosteat:false,
    dirx:0, diry:0,
    moving:0
}
var powerball = {
    x:85,y:99,    
    power:false,
    count:0,
     ghostNum:0
}
var enery={
    x:0,
    y:0,
    speed:5,
    ball :false
}

//pacman keyevent find for listening 
var keyclick = {}

document.addEventListener("keydown",function(event){
    keyclick[event.keyCode]=true;
    console.log(keyclick);    
    move(keyclick);
});

document.addEventListener("keyup",function(event){
   delete keyclick[event.keyCode]; 
},false);

// moving pacman
function move(keyclick){
if(37 in keyclick){
player.x -=player.speed;
player.pacdir  = 64;    
}
if(38 in keyclick){
player.y -=player.speed;
player.pacdir  = 94;    
    }
if(39 in keyclick){
player.x +=player.speed;
player.pacdir  = 0;    
     }
 if(40 in keyclick){
 player.y +=player.speed;
 player.pacdir = 32;    
   }    
   //moving bound
if(player.x < 0){
    player.x = (canvas.width-32);
}else if (player.x >= (canvas.width-32)){
    player.x = 0;
}
if(player.y <0){
    player.y = (canvas.height-32);
}  else if(player.y >= (canvas.height-32)){
    player.y = 0;
}
   //paccman bite
if(player.pacmouth == 320){
    player.pacmouth = 352;
}
else player.pacmouth = 320;
render();
}



//canvas designing
var canvas = document.createElement('canvas');
canvas.width = 600;
canvas.height = 600;
document.body.appendChild(canvas);
var ctx  = canvas.getContext("2d"); 
var myimg = new Image();
myimg.ready = false;
myimg.onload = checkready;
myimg.src = "pacmanudemy.png";

function checkready(){
    myimg.ready = true;
    playgame();
}
function playgame(){
render();
requestAnimationFrame(playgame);
}
//render function 
function render(){
    //contextof canvas fillstyle
ctx.fillStyle = 'blue';
ctx.fillRect(0,0,canvas.width,canvas.height);
//ghost
ctx.drawImage(myimg,enemy.ghostNum,enemy.ghostupgrade,32 ,32,enemy.x,enemy.y,32,32);
//player
ctx.drawImage(myimg,player.pacmouth,player.pacdir,32 ,32,player.x,player.y,38,38);
//score values : 
ctx.font=("24px verdana");
ctx.fillStyle = 'white';
ctx.fillText('player : '+score+' vs ghost : '+gscore ,4,18);

//creating powerball
if(!powerball.power){
    powerball.x=Randomval(500)+30;
    powerball.y= Randomval(530)+30;
    powerball.power = true;
    
}
if(powerball.power && powerball.count <5){
    ctx.fillStyle = 'yellow';
    // ctx.fillRect (powerball.x,powerball.y,20,20);
    ctx.beginPath();
    ctx.arc(powerball.x,powerball.y,10,0,Math.PI*2);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
    player.speed =10;

}
//eating powerball
if(player.x<= powerball.x+10 && powerball.x <= player.x+32 && player.y <= powerball.y+10 && powerball.y <= player.y+32){
    console.log('hit');
    powerball.ghostNum = enemy.ghostNum;
    enemy.ghostNum= 384;
    powerball.count = 300;
    powerball.power = false;
    enemy.ghosteat = true;
}
//ghost creating 
if(!ghost){
enemy.ghostNum = Randomval(5)*64;
enemy.x = Randomval(500)+30;
enemy.y = Randomval(500)+30;
ghost = true;
}
// upgrade ghost 
if(enemy.num >0){
    enemy.num--;
}else{ enemy.num =10;
if(enemy.ghostupgrade == 0){
enemy.ghostupgrade = 32;
}else {
    enemy.ghostupgrade =0;
}
}
//ghost moving
if(enemy.moving <0)
{  enemy.moving = Randomval(20)*3+ Randomval(1);
    enemy.dirx=0;
    enemy.diry=0;
    enemy.speed = Randomval(2)+1;
    
    //if powerboll then ran away
    if(enemy.ghosteat){
        enemy.speed = enemy.speed*-1;
    }

    if(enemy.moving%2) {
        if(player.x < enemy.x){
            enemy.dirx = -enemy.speed; 
             } 
             else{
                enemy.dirx = enemy.speed; 
             }
    } else {
        if(player.y < enemy.y){
            enemy.diry = -enemy.speed; 
              } 
            else{
           enemy.diry = enemy.speed; 
        }
    } 
}
enemy.moving--;
enemy.x +=enemy.dirx;
enemy.y +=enemy.diry;

//time limiting ghosteat
if(  powerball.count >0){
    powerball.count--;
    console.log(powerball.count);
    if(  powerball.count <= 0){
    enemy.ghosteat = false;
    enemy.ghostNum = powerball.ghostNum;
       }
    player.speed = 30;

}
//ghost ran off 
if(enemy.x < 0){
    enemy.x = (canvas.width-32);
}else if (enemy.x >= (canvas.width-32)){
    enemy.x = 0;
}
if(enemy.y <0){
    enemy.y = (canvas.height-32);
}  else if(enemy.y >= (canvas.height-32)){
    enemy.y = 0;
}
//ghost eating
if(player.x<= enemy.x+32 && enemy.x <= player.x+32 && player.y <= enemy.y+32 && enemy.y <= player.y+32){
    console.log('ghost');
if(enemy.ghosteat){
    score++;

}
else {
    gscore++;
}
ghost = false;
powerball.count = 0;
player.x=30;
player.y = 30;
}

}//end render()

function Randomval(n){
    return Math.floor(Math.random()*n);
}
