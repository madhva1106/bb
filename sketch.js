var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bgimage, bgsprite;
var boy,boyani, boystop;
var corona, coronai,coronaG;
var ground;
var life1, life2, life3, lifeImg;
var mask,maski;
var score=0;
var count=0;
var blackH;
var points;
var reseti;
var vaci,vac;
var co=0;

function preload(){
bgimage=loadImage("bg.jpg");

boyani=loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png","boy5.png");
boystop=loadAnimation("boy1.png");

lifeImg= loadImage("heart.png");
blackHeart= loadImage("black-heart.png");
coronai=loadImage("corona.png")

maski=loadImage("Mask.png")

reseti= loadImage("reseet.png");

vaci=loadImage("vac.png");

//blackH = loadSound("oneHeart gone.wav");
//points= loadSound("point.wav");


}


function setup() {
  createCanvas(800,400);
  
  bgsprite=createSprite(400,50);
  bgsprite.addImage(bgimage);
  bgsprite.velocityX=-3;
  bgsprite.scale=1.3
  
  life1= createSprite(30,59);
  life1.addImage(lifeImg);
  life1.scale= 0.1;
  life2= createSprite(60,59);
  life2.addImage(lifeImg);
  life2.scale= 0.1;
  life3= createSprite(90,59);
  life3.addImage(lifeImg);
  life3.scale= 0.1;
  
  boy=createSprite(50,180);
  boy.addAnimation("walking",boyani);
  boy.addAnimation("stop",boystop);

  reset= createSprite(400,200);
  reset.addImage(reseti);
  
  coronaG=createGroup();
  maskG=createGroup();
  vacG=createGroup();
}

function draw() {
  background("white");  

  ground=createSprite(50,400,1000,10);
  ground.visible=false
  boy.collide(ground);

  //console.log(gameState);
if(gameState===PLAY){
  reset.visible=false;
  if(bgsprite.x<0){
    bgsprite.x=400
  }

  if(keyDown("space")&& boy.y >= 159){
    boy.velocityY=-12;
  }
  boy.velocityY = boy.velocityY + 0.8

  spawncorona();

  spawnmask();

  spawnvace();

 
 if(maskG.isTouching(boy)){
   maskG.destroyEach();
   scoreNo= createSprite(725,62);
  score=score + 1
  //points.play();
 }

 for (var i = 0; i  < coronaG.length; i++ ){
  if(coronaG.get(i).isTouching(boy)){
    coronaG.get(i).destroy();
    
    count= count+1;
    if( count === 1){
      life1.addImage(blackHeart);
      //blackH.play();
    }
    if( count === 2){
      life2.addImage(blackHeart);
      //blackH.play();
    }
    if( count === 3){
      life3.addImage(blackHeart);
      //blackH.play();
    }
  }
  if(count === 3){
    gameState=END;
  }

  for (var i = 0; i  < vac.length; i++ ){
    if(vac.get(i).isTouching(boy)){
      vac.get(i).destroy();
      
      co= co+1;
      if( co === 1){
        points.play();
      }
      if( co === 2){
        points.play();
        gameState=WIN;
        WIN();
}
}

  }

if(gameState === END){
  bgsprite.velocityX=0;
  boy.velocityY=0;
  boy.changeAnimation("stop",boystop);
  coronaG.setVelocityXEach(0);
  maskG.setVelocityXEach(0);
  reset.visible=true;
  if(mousePressedOver(reset)){
    restart();
  }
}


drawSprites();
textSize(50);
fill("black");
text(score,713,58);
}


function spawncorona(){
 //if(score>5){ 
  var rand = Math.round(random(1,6));
   if(frameCount%60===0){
    corona= createSprite(800,340);
    corona.addImage(coronai)
  corona.debug=true
  corona.velocityX=-6;

  corona.scale=0.2
  coronaG.add(corona);
  }
}
//}

function spawnmask(){
  if(frameCount%150===0){

    mask=createSprite(800,340);
    
    mask.addImage(maski);
    mask.velocityX=-6;

    mask.scale=0.2
    maskG.add(mask);
  
  }

}

function spawnvace(){
  if (frameCount%60===0){
//if(score>10){
  vac=createSprite(800,340);
  vac.addImage(vaci)
  vac.scale=0.2
  vac.velocityX=-6
//}
  }

}

function restart(){
  coronaG.destroyEach();
  maskG.destroyEach();
  
  boy.changeAnimation("walking",boyani);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;


}

function WIN(){
  bgsprite.velocityX=0;
  boy.velocityY=0;
  boy.changeAnimation("stop",boystop);
  coronaG.setVelocityXEach(0);
  maskG.setVelocityXEach(0);
  reset.visible=true;
 if(mousePressedOver(reset)){
  restart();
 }
  text("WIN",400,300)
}
}
}