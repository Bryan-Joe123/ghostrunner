var ghost, ghostImage;
var tower, towerImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup, invisibleClimber,invisibleClimberGroup;

var PLAY=1, END=0;
var gameState=PLAY;



function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600,600);
  
  //Groups
  climberGroup=new Group();
  doorGroup=new Group();
  invisibleClimberGroup=new Group();
  
  
  //Tower
  tower=createSprite(300,300,50,400);
  tower.velocityY=2;
  tower.addImage(towerImage);
  tower.scale=0.8;
  
  //ghost
  ghost=createSprite(300,300,50,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.4;
  ghost.setCollider("rectangle",-20,30,200,220);
  //ghost.debug=true;
}

function draw(){
  if(gameState==PLAY){
    background("black");

    //Reset Ghost X velocity
    ghost.velocityX=0;

    //Ghost Movement
    if(keyDown("a")||keyDown("LEFT_ARROW")){
      ghost.velocityX=-5;
      //ghost.scale=0.4;
    }
    if(keyDown("d")||keyDown("RIGHT_ARROW")){
      ghost.velocityX=5;
      //ghost.scale=-0.4;
    }

    //Gravity
    ghost.velocityY=ghost.velocityY+0.8;

    //Jump
    if(keyDown("w")||keyDown("space")){
      ghost.velocityY=-10;
    }

    if(tower.y>400){
      tower.y=200;
    }

    ghost.collide(climberGroup);
    
    if(ghost.isTouching(invisibleClimberGroup)||ghost.y>600){
      gameState=END;
    }

    spawnObst();
    drawSprites();
  }else if(gameState==END){
    tower.velocityY=0;
    ghost.velocityY=0;
    doorGroup.destroyEach(0);
    climberGroup.destroyEach();
    background("white");
    textSize(40);
    fill("black");
    text("GAME OVER",200,300);
  }
  
  
}

function spawnObst(){
  if(frameCount%200==0){
    door=createSprite(Math.round(random(200,400)),-20,100,100)
    door.velocityY=2;
    door.addImage(doorImage);
    door.lifetime=width/door.velocityY;
    doorGroup.add(door);
    
    door.depth=ghost.depth;
    ghost.depth+=1;
    
    climber=createSprite(door.x,door.y+60);
    climber.addImage(climberImage);
    climber.velocityY=2;
    climber.lifetime=width/climber.velocityY;
    climberGroup.add(climber);
    //climber.debug=true;
    
    invisibleClimber=createSprite(door.x,door.y+70,100,10)
    invisibleClimber.velocityY=2;
    invisibleClimber.visible=false;
    invisibleClimberGroup.add(invisibleClimber);
    
  }
}