var theWorld;
var mainWiz;
var forestpic;
// our user controlled character object - see Player.js for more information
var thePlayer;
var pause = true;
var flag = false;
var theMonster;

// create an object to hold our "world parameters" - we will send this object into our
// OverheadWorld to tell it how our world is organized
var worldParameters = {
  tileSize: 80,
  tileFolder: 'tiles',
  numTiles: 12,
  solidTiles: {2:true, 11:true},
  grassTiles: {6:true},
  wetTiles: {10:true}
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
  mainWiz = new Wiz(550,700,theWorld)
  collectNoise = loadSound("sounds/collect.mp3")
  mazeSong = loadSound("sounds/wizardmaze.mp3")
  forestpic = loadImage('images/forestpic.jpeg')

  // create our player
  // thePlayer = new Player(100, 100, theWorld);
}

function setup() {
  var c = createCanvas(800,800);
  c.parent("game_container")
  // now that everything is fully loaded send over the room data to our world object
  // also let the world know which room we should start with
  theWorld.setupRooms( roomData, "start" );
  mazeSong.loop()
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
  fill(255)
  text("Welcome to Monster Forest! Press the Space Bar to Start",260,100);
}
else{
  background(0)
  theWorld.displayWorld()
  theMonster.display()
  theMonster.movement()

  mainWiz.move()
  mainWiz.display()
}
  //test comment
  // thePlayer.move();
  // thePlayer.display();
}
function keyPressed(){

  if (keyCode == 32){

    flag = true
    pause = false

  }
}
