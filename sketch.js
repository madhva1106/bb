var bgimage, bgsprite;
var boy,boyani, boystop;
var corona, coronai,coronaG;
var ground;
var mask,maski;
var score=0;


function preload(){
bgimage=loadImage("bg.jpg");

boyani=loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png","boy5.png");
boystop=loadAnimation("boy1.png");


coronai=loadImage("corona2.png")

maski=loadImage("Mask.png")

}


function setup() {
  createCanvas(800,400);
  
  bgsprite=createSprite(400,50);
  bgsprite.addImage(bgimage);
  bgsprite.velocityX=-3;
  bgsprite.scale=1.3
  

  
  boy=createSprite(50,180);
  boy.addAnimation("walking",boyani);
  boy.addAnimation("stop",boystop);
  
  coronaG=createGroup();
  maskG=createGroup();
}

function draw() {
  background("white");  
  

  


  ground=createSprite(50,400,1000,10);
  ground.visible=false

  boy.collide(ground);


  if(bgsprite.x<0){
    bgsprite.x=400
  }

  if(keyDown("space")&& boy.y >= 159){
    boy.velocityY=-12;
  }
  boy.velocityY = boy.velocityY + 0.8

  spawncorona();

  spawnmask();

 if(coronaG.isTouching(boy)){
   score=score-1
 }

 if(maskG.isTouching(boy)){
   maskG.destroyEach();
   scoreNo= createSprite(725,62);
  score=score + 1
 }



 
  drawSprites();
  textSize(50);
  fill("black");
  text(score,713,58);
}

function spawncorona(){
  if(frameCount%200===0){
    corona= createSprite(800,340);
    corona.addImage(coronai)
  corona.debug=true
  corona.velocityX=-6;

  corona.scale=0.2
  coronaG.add(corona);
  }

}

function spawnmask(){
  if(frameCount%100===0){

    mask=createSprite(800,340);
    mask.addImage(maski);
    mask.velocityX=-6

    mask.scale=0.2
    maskG.add(mask);
  
  }

}