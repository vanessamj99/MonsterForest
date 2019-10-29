var theWorld;
var mainWiz;
var forestpic;
var winner = false;
// our user controlled character object - see Player.js for more information
var thePlayer;
var pause = true;
var flag = false;
var end = false;
var theMonster;
var coinCollected1 = false;
var coinCollected2 = false;
var coinCollected3 = false;
var xBar = 0
var yBar = 0
var youwin

var barWidth = 50
var monster1
var monsterArray
var zombies
var microphone
var coin = 0
// var volume
// create an object to hold our "world parameters" - we will send this object into our
// OverheadWorld to tell it how our world is organized
var worldParameters = {
  tileSize: 80,
  tileFolder: 'tiles',
  numTiles: 13,
  solidTiles: {2:true, 11:true},
  grassTiles: {4:true},
  wetTiles: {10:true},
  winnerTiles: {0:true}

};

// room data - loaded in from an external file (see 'data/rooms.json')
var roomData;
var collectNoise;

// handle the tile loading and creating our player object in preload before the game can start
function preload() {

  // load in room data
  roomData = loadJSON("info/rooms.json");

  // create our world
  theWorld = new OverheadWorld(worldParameters);
  theMonster = new Monsters(100,100,theWorld)
  mainWiz = new Wiz(550,640,theWorld)
  collectNoise = loadSound("sounds/collect.mp3")
  mazeSong = loadSound("sounds/wizardmaze.mp3")
  forestpic = loadImage('images/forest.jpeg')
  zombies = loadImage('images/end.jpeg')
  youwin = loadImage('images/youwin.jpeg')
  // create our player
  // thePlayer = new Player(100, 100, theWorld);
}

function setup() {
  var c = createCanvas(800,800);
  userStartAudio()
  c.parent("game_container")
  // now that everything is fully loaded send over the room data to our world object
  // also let the world know which room we should start with
  theWorld.setupRooms( roomData, "start" );
  mazeSong.loop()
  monster1 = new Monsters(300,300)
  noiseDetail(24)
  monsterArray = []
  for(let j = 0; j < 20; j++){
    monsterArray.push(new Monsters(300,300))

  }
  microphone = new p5.AudioIn();

  // start the microphone (will request access to the mic from the user)
  microphone.start();
  // this.tileMap[random(2,9)][random(1,9)] = 12
}

function allDone(worldData) {
  console.log("here");
}

function badStuffHappened(result) {
  console.log(result);
}

function draw() {
if(pause == true){
  background(56,65,36);
  image(forestpic,0,0,800,800)

}
else if(end == true){
  console.log("should be over")
  background(0)
  image(zombies,0,0,800,800)
}
else if(coin == 3 && winner == true){
  image(youwin,0,0,800,800)

}
else{
  background(0)
  theWorld.displayWorld()
  theMonster.display()
  theMonster.movement(microphone.getLevel())


  mainWiz.move()
  mainWiz.display()
  for(let i = 0; i < monsterArray.length; i++){
    monsterArray[i].display()
    monsterArray[i].movement(microphone.getLevel())
    monsterArray[i].checkplayerCollision()
  }
  // volume = microphone.getLevel();


// noFill()


  if(barWidth < 10){
    // console.log("red")
    fill(255,0,0)
    console.log(barWidth)
  }
  else if(barWidth < 25){
    // console.log("yellow")
    fill(255,200,0)

  }
  // else if (barWidth <= 0){
  //   console.log("should be the end")
  //   end = true
  // }
  else{
    // console.log("green")
    fill(0,255,0)
  }
  rect(xBar,yBar,barWidth,10)

}



}
function keyPressed(){

  if (keyCode == 32){

    flag = true
    pause = false

  }
}




class Monsters{

  constructor(x,y){
    this.x = x
    this.y = y
    this.circlesize = random(10,20)
    this.bodywidth = random(5,20)
    this.head = 0
    this.legs = 0
    this.arms = 0
    this.body = 0
    this.bodylonger = 0
    this.colorhead = color(random(255),random(255),random(255))
    this.ovalsize = random(15,30)
    this.colorbody = color(random(255),random(255),random(255))
    this.colorarms = color(random(255),random(255),random(255))
    this.colorlegs = color(random(255),random(255),random(255))
    this.growth = 0.5
    this.growing = 0.15
    this.leggrowth = 0.3
    this.legheight = random(30,45)
    this.armgrowth = 0.3
    this.armlength = random(7,30)
    this.colorfangs = color(random(255),random(255),random(255))
    this.eyebrowlength = random(5,10)
    this.colorbrows = color(random(255),random(255),random(255))
    this.dx = 0
    this.dy = 0
    this.offsetX = random(0,10000)
    this.offsetY = random(0,10000)
    // this.state1 = 0
  }

  display(){

    this.move()
  }
  move(){

    this.growhead()
  }
  growhead(){

    this.head += this.growth

    if(this.head >= this.circlesize){
      this.head = this.circlesize
    }
    this.growbody()
    fill(this.colorhead)
    ellipse(this.x,this.y,this.head,this.head)
    this.growfangs()
    this.groweyebrows()
  }
  growbody(){
    fill(this.colorbody)

    this.body += this.growing
    this.bodylonger += this.growth
    if(this.bodylonger >= this.ovalsize){
      this.bodylonger = this.ovalsize
    }
    if(this.body >= this.bodywidth){
      this.body = this.bodywidth
    }

    this.growlegs()
    ellipse(this.x,this.y + this.head,this.body,this.bodylonger)

  }
  growlegs(){
    stroke(this.colorlegs)
    line(this.x,this.y + this.head,this.x+10, this.y + this.legs)
    line(this.x,this.y + this.head,this.x-10, this.y + this.legs)
    this.legs += this.leggrowth
    if(this.legs >= this.legheight){
      this.legs = this.legheight
    }

    this.growarms()
  }
  growarms(){
    stroke(this.colorarms)
    line(this.x,this.y + this.head,this.x + this.arms, this.y + this.head -7)
    line(this.x,this.y + this.head,this.x - this.arms, this.y + this.head -7)
    this.arms += this.armgrowth
    if(this.arms >= this.armlength){
      this.arms = this.armlength
    }
  }
    growfangs(){
      fill(this.colorfangs)
      triangle(this.x-4,this.y+0.3,this.x,this.y+2, this.x -3, this.y +7)
      triangle(this.x,this.y+2,this.x+4,this.y+0.3, this.x +2, this.y +7)
    }
    groweyebrows(){
      stroke(this.colorbrows)
      line(this.x, this.y-2, this.x -4, this.y-4)
      line(this.x, this.y-2, this.x +5, this.y-4)
    }
    movement(volume){
      this.x += this.dx
      this.y += this.dy

      // console.log(volume)
      // volume = microphone.getLevel();
      // console.log(volume)
      console.log(volume>.0000001)
      console.log("VOLUME: "+volume)

      if (dist(mainWiz.x,mainWiz.y, this.x, this.y) < 100 && volume > 0.1) {
        // run away!
        if (mainWiz.x > this.x) {
          this.x -= 3;
        }
        else {
          this.x += 3;
        }
        if (mainWiz.y > this.y) {
          this.y -= 3;
        }
        else {
          this.y += 3;
        }
      }
      if(this.x > width - 90){
        this.x = width - 90
      }
      if(this.x < 90){
        this.x = 90
      }
      if(this.y > height - 100){
        this.y = height - 100
      }
      if(this.y < 90){
        this.y = 90
      }
      //speed
      this.dx = 5 * (noise(this.offsetX)-.5)
      this.dy = 5 * (noise(this.offsetY)-.5)
      //more or less jitty
      this.offsetX += .01
      this.offsetY += .01
    }
    checkplayerCollision(){
      xBar = mainWiz.x
      yBar = mainWiz.y + 60
      if(dist(this.x,this.y,mainWiz.x,mainWiz.y) <45){
        barWidth = constrain(barWidth,0,100)
        barWidth -= .1
        if (barWidth <= 0){
          end = true
        }


      }

    }



}
