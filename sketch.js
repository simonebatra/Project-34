const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,groceries,ground;
var groceries_con;
var groceries_con_2;
var groceries_con_3;
var rope, rope2;

var bg_img;
var food;
var personImg;
var star, emptyStar, starImage;

var button,button2,button3;
var person;
var score = 0;

function preload()
{
  bg_img = loadImage('download.jpg');
  food = loadImage('download-2.jpg');
  personImg = loadImage('download-copy.jpg');

  starImage = loadImage("filled_star.png");
}

function setup() 
{
  createCanvas(600,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('download-1.jpg');
  button.position(100,90);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('download-1.jpg');
   button2.position(400,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);
  
 
   rope = new Rope(7,{x:110,y:90});
   rope2 = new Rope(7,{x:430,y:90});

  star = createSprite(280, 100);
  star.addAnimation('star',starImage);
  star.scale = 0.02;

  ground = new Ground(300,height,width,20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  person = createSprite(300,height-80,100,100);
  person.scale = 0.2;
  person.addImage(personImg);

  
  groceries = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,groceries);

  groceries_con = new Link(rope,groceries);
  groceries_con_2 = new Link(rope2,groceries);

  textSize(20);
  text("Score: " + score, 10, 10);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(groceries!=null){
    image(food,groceries.position.x,groceries.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(groceries,person,80)==true)
  {
    World.remove(engine.world,groceries);
    groceries = null;
    person.changeAnimation('eating');
  }

  if(groceries!=null && groceries.position.y>=650)
  {
    groceries=null;
   }
  
}

if(collide(groceries,star,20)==true)
  {
    star.visible = false;
    score = score+1;
  }

function drop()
{
  rope.break();
  groceries_con.dettach();
  groceries_con = null; 
}

function drop2()
{
  rope2.break();
  groceries_con_2.dettach();
  groceries_con_2 = null;
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}

function airBlow(){
  Matter.Body.applyForce(groceries, {x:0, y:0},{x:0, y:-0.03})
}


