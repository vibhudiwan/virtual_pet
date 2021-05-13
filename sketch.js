var dog,sadDog,happyDog,database;
var foodS,foodStock;
var feed,addFood;
var foodObj;
var milkObj,mImage,foodn;
var name1,feedTime;
var lastFed,currentTime,Iname,name2;

function preload(){
sadDog=loadImage("images/dogImg.png");
happyDog=loadImage("images/dogImg1.png");
mImage = loadImage("images/milk.png");
}

function setup() {
  
  database=firebase.database();
  foodStock=database.ref('food')
  foodStock.on("value",readStock);
  createCanvas(500,500);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feedTime=database.ref('FeedTime');
  feedTime.on("value",function(data){
    lastFed=data.val();
  });

  Iname = database.ref('Name');
  Iname.on("value",function(data){
    name2=data.val();
  });
    
          
  dog=createSprite(200,400,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(600,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(700,95);
  addFood.mousePressed(addFoods);

  name1 = createInput("ROCKY");
  name1.position(550,510);


  }

function draw() {
  currentTime = hour();
  background(46,139,87);
  foodObj.display();
  textSize(20);
  stroke("white");
  text("FOOD REMAINING :" + foodS ,250,250);
  text("Name your dog :" ,20,475)
  textSize(15); 
   
  if (lastFed>=12){
    text("LAST FED :" + lastFed + "th Hour",200,200);
  }
  else if (lastFed===0){
    text("LAST FED : 12AM ",200,200);
  } 
  else{
    text("LAST FED :" + feedTime + "th Hour",200,200);
  }

  if(foodS<=0){
    foodS=0;
  }

  //console.log(currentTime);
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
 foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime :hour(),
    //lastFed : hour(),
    
            
  })
}

//function to add food in stock
function addFoods(){
  dog.addImage(sadDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()+1);
  foodS++;
  database.ref('/').update({
    Food:foodS
      })
}
