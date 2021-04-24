//Create variables here
var  dog,dogImg, happyDog, database, foodS, foodStock;
var feed,addFood
var fedTime,lastFed
var foodObj;
var food;
function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
  
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,250,20,20)
  dog.addImage(dogImg)
  dog.scale=0.15

  foodObj = new Food();

  feed = createButton("Feed The Dog")
  feed.position(200,95)
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food")
  addFood.position(300,95)
  addFood.mousePressed(addFood)

  

  foodStock = database.ref('Food')
  foodStock.on("value",readStock)
  
  
}


function draw() {  
  background(46, 139, 87)

  fedTime = database.ref("FeedTime")
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  fill(255);
  textSize(20);
  if(lastFed>= 12){
    text("lastFeed :" + lastFed % 12 + "PM",350,30)
  }
  else if(lastFed == 0 ){
    text("Last Feed : 12 AM",350,30)
  } 
  else{
    text("Last Feed :  ", + lastFed + "AM",350,30)
  }

  foodObj.display();
  

  /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happyDog)
  }*/

  drawSprites();
  //add styles here 
  text("Press up arow to feed the dog",50,50)
  textSize(20)
  fill("red")
  stroke(20)

}

function readStock(data){
  foodS=data.val()
  foodObj.updateFoodStock(foodS)
}

  function feedDog(){
      dog.addImage(happyDog)
      foodObj.updateFoodStock(foodObj.getFoodStock()-1)
      database.ref('/').update({
        Food:foodObj.getFoodStock(),
        FeedTime : hour()
      })
  }

  function addFood(){
    foodS ++ ;
    database.ref('/').update({
      Food : foodS()
    })
    
    
  }

/*function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}*/



