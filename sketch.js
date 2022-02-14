var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie1, zombieImg1;
var zombie2, zombieImg2;
var zombie3, zombieImg3;
var zombie4, zombieImg4;


var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var bulletImage;

var gunSound;

var gateImg,gate;

var score = 0;
var life = 3;
var bullets = 70;

var heart1, heart2, heart3

var gameState = "fight"

var lose, winning

function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg1 = loadImage("assets/zombie1.png")
  zombieImg2 = loadImage("assets/zombie2.png")
  zombieImg3 = loadImage("assets/zombie3.png")
  zombieImg4 = loadImage("assets/zombie4.png")

  bgImg = loadImage("assets/bg.jpg")

  bulletImage = loadImage("assets/bullet.png")

  gunSound = loadSound("assets/gunloadshoot.mp3")

  gateImg = loadImage("assets/gate.png")
  bgImg2 = loadImage("assets/bg.jpeg")

  lose = loadSound("assets/lose.mp3")
  winning = loadSound("assets/win.mp3")
}

function setup() {

  
  var bg =createCanvas(windowWidth,windowHeight);
  

//creating the player sprite
  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  //player.debug = true
  player.setCollider("rectangle",0,0,300,300)

  gate = createSprite(1160,560)
  gate.addImage("gate1",gateImg)
  gate.scale=0.8


   //creating sprites to depict lives remaining
    heart1 = createSprite(1100,50,-50,40,20,20)
    heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4
    


    heart2 = createSprite(1100,50,-50,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4
    

    heart3 = createSprite(1100,50,-50,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating group for zombies    
    zombieGroup = new Group();
    bulletGroup = new Group();
}

function draw() {
  
if(gameState==="fight"){
  background(bgImg); 
  if(life===3){
    heart3.visible = true
    heart1.visible = false
    heart2.visible = false
  }
  if(life===2){
    heart2.visible = true
    heart1.visible = false
    heart3.visible = false
  }
  if(life===1){
    heart1.visible = true
    heart3.visible = false
    heart2.visible = false
  }

  //go to gameState "lost" when 0 lives are remaining
  if(life===0){
    gameState = "lost"
  
   }
   if(score==100 && player.isTouching(gate)){
    background(bgImg2)
    gameState = "won"
    winning.play();
    }
 

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-10
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+10
}
if(keyDown("LEFT_ARROW")||touches.length>0){
  player.x = player.x-10
}
if(keyDown("RIGHT_ARROW")||touches.length>0){
 player.x = player.x+10
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  
  player.addImage(shooter_shooting)
  createBullets();
  gunSound.play();
  bullets = bullets-1
  
 
}


//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(bullets==0){
  gameState = "bullet"
  lose.play();
    
}


//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){
 

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
       life=life-1
       } 
 }
}
if(zombieGroup.isTouching(bulletGroup)){
 

  for(var i=0;i<zombieGroup.length;i++){     
       
   if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
        score = score+2
        } 
  }
 }

//calling the function to spawn zombies
enemy1();
enemy2();
enemy3();
enemy4();

drawSprites();
textSize(20)
  fill("yellow")
text("Bullets = " + bullets,displayWidth/2-610,displayHeight/2-300)
fill("green")
textSize(20)
text("Score = " + score,displayWidth/2-600,displayHeight/2-270)
fill("red")
textSize(20)
text("Lives = " + life,displayWidth/2-600,displayHeight/2-330)
textSize(30)
fill("white")
text("REACH TO THE GATE WITH A MAXIMUM SCORE OF 100",170,50)



if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("You Lost ",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

//destroy zombie and player and display a message in gameState "won"
else if(gameState == "won"){
 
  textSize(100)
  fill("green")
  text("You Won ",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

//destroy zombie, player and bullets and display a message in gameState "bullet"
else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}
}
}



//creating function to spawn zombies
function enemy1(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie1 = createSprite(random(1000,4000),random(100,800),40,40)

    zombie1.addImage(zombieImg3)
    zombie1.scale = 0.25
    zombie1.velocityX = -3
    //zombie1.debug= true
    zombie1.setCollider("rectangle",0,0,400,400)
   
    zombie1.lifetime = 1000
    zombieGroup.add(zombie1)
  }

}
function enemy2(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie2 = createSprite(random(1000,4000),random(100,800),40,40)

    zombie2.addImage(zombieImg2)
    zombie2.scale = 0.25
    zombie2.velocityX = -3
    //zombie2.debug= true
    zombie2.setCollider("rectangle",0,0,400,400)
   
    zombie2.lifetime = 1000
    zombieGroup.add(zombie2)
  }

}
function enemy3(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie3 = createSprite(random(1000,4000),random(100,800),40,40)

    zombie3.addImage(zombieImg1)
    zombie3.scale = 0.13
    zombie3.velocityX = -3
    //zombie3.debug= true
    zombie3.setCollider("rectangle",0,0,500,500)
   
    zombie3.lifetime = 1000
   zombieGroup.add(zombie3)
  }

}
function enemy4(){
  if(frameCount%100===0){

    //giving random x and y positions for zombie to appear
    zombie4 = createSprite(random(1000,4000),random(100,800),40,40)

    zombie4.addImage(zombieImg4)
    zombie4.scale = 1
    zombie4.velocityX = -3
    //zombie4.debug= true
    zombie4.setCollider("rectangle",0,0,400,400)
   
    zombie4.lifetime = 1000
    zombieGroup.add(zombie4)
  }

}
function createBullets() {
  var  bullet= createSprite(500, 100, 60, 10);
  bullet.addImage(bulletImage);
  player.depth = bullet.depth
  player.depth = player.depth+2
  bullet.y=player.y-25;
  bullet.x=player.x+50;
  bullet.velocityX = 4;
  bullet.lifetime = 1000;
  bullet.scale = 0.02;
  bulletGroup.add(bullet)
  return  bullet;
   
}