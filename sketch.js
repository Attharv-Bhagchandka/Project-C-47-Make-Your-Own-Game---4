var Lander, Shell, Landed;
var Background;
var Target, Bullseye;
var Gamestate = "Play";
var Time = 200, Recharge = 1;

function preload(){
  Shell = loadImage("Lander.png");
  Landed = loadImage("Landed Lander.png");
  Background = loadImage("Bg.jpg");
  Bullseye = loadImage("Target.png")
}

function setup() {
  createCanvas(300, 650);
  frameRate(100);

  Lander = createSprite(150,100,25,50);
  Lander.addImage(Shell);
  Lander.scale = 0.4;
  rectMode(CENTER);
  //Lander.debug = true;
  Lander.setCollider("Rectangle", 0, 0, 220, 185);

  Target = createSprite(150,575,650,50);
  Target.addImage(Bullseye);
  Target.scale = 0.8;
  Target.debug = true;
  Target.setCollider("Rectangle", 0, 0, 240, 50);
  Target.depth = -1;
  rectMode(CENTER);
}

function draw() {
  background(Background);
  Time -= 1;

  if (Time > 50) {
    fill(12, 249, 225);
    textSize(10);
    text("NASA has succeeded in sending a Manned Lander to Mars, ",5, 15);
    text("However it’s Automatic Landing System is Malfunctioning. ",5, 30);
    text("You(The Pilot), have to avoid Dangerous Asteroids, Slow the ",5, 45);
    text("Spacecraft down and land on Target to save the Mission.",5,60);
  }
  if (Time < 50 && Lander.isTouching(Target) == false) {
    fill(12, 249, 225);
    textSize(15);
    text("Land at Less than 1 m/s. Velocity: " + 4*Lander.velocityY,30,15);
  }
  if (Time < 0 && Time > -10){
    Lander.velocityY = 2.5;
  }
  
  if(Lander.isTouching(Target)){
    if(Lander.velocityY <= 0.25){
      fill(12, 249, 225);
      textSize(15);
      text("You Slowed-Down at the Right Time, you Win!",10,15);
    }
    else{
      fill(12, 249, 225);
      textSize(15);
      text("You did not Slow-Down in Time, you Lose!",10,15);
      Lander.collide(Target);
    }
  }
  
  

  drawSprites();
}

function keyPressed(){
  Recharge -= 1;

  if (keyCode == "38" && Recharge <= 0){
    Lander.velocityY -= 0.125;
    Recharge = 1;
  }
}
