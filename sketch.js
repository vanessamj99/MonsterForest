var theWorld;

// our user controlled character object - see Player.js for more information
var thePlayer;

var theMonster;

// create an object to hold our "world parameters" - we will send this object into our
// OverheadWorld to tell it how our world is organized
var worldParameters = {
  tileSize: 50,
  tileFolder: 'tiles',
  numTiles: 12,
  solidTiles: {0:true, 18:true, 6:true}
};

// room data - loaded in from an external file (see 'data/rooms.json')
var roomData;

// handle the tile loading and creating our player object in preload before the game can start
function preload() {

  // load in room data
  roomData = loadJSON("info/rooms.json");

  // create our world
  theWorld = new OverheadWorld(worldParameters);
  theMonster = new Monsters(100,100,theWorld)

  // create our player
  // thePlayer = new Player(100, 100, theWorld);
}

function setup() {
  var c = createCanvas(500,500);
  c.parent("game_container")
  // now that everything is fully loaded send over the room data to our world object
  // also let the world know which room we should start with
  theWorld.setupRooms( roomData, "start" );
}

function allDone(worldData) {
  console.log("here");
}

function badStuffHappened(result) {
  console.log(result);
}

function draw() {
  background(0)
  theWorld.displayWorld()
  theMonster.display()
  theMonster.movement()

  // thePlayer.move();
  // thePlayer.display();
}
