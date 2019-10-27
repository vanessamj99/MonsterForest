function Wiz(x, y, world) {
  // store the player position
  this.x = x;
  this.y = y;

  // store a reference to our "world" object - we will ask the world to tell us about
  // tiles that are in our path
  this.world = world;

  // load & store our artwort
  this.artworkLeft = loadImage('images/char_left.png');
  this.artworkRight = loadImage('images/char_right.png');
  this.artworkUp = loadImage('images/char_up.png');
  this.artworkDown = loadImage('images/char_down.png');
  console.log("image load")

  // assume we are pointing to the right
  this.currentImage = this.artworkRight;

  // define our speed
  this.speed = 3;
  this.accel = .5;
  // display our player
  this.display = function() {
    imageMode(CORNER);
    image(this.currentImage, this.x, this.y);
  }

  // display "sensor" positions
  this.displaySensor = function(direction) {
    fill(255);
    if (direction == "up") {
      ellipse(this.top[0], this.top[1], 20, 20);
    } else if (direction == "down") {
      ellipse(this.bottom[0], this.bottom[1], 20, 20);
    } else if (direction == "right") {
      ellipse(this.right[0], this.right[1], 20, 20);
    } else if (direction == "left") {
      ellipse(this.left[0], this.left[1], 20, 20);
    }
  }

  // set our sensor positions (computed based on the position of the character and the
  // size of our graphic)
  this.refreshSensors = function() {
    this.left = [this.x, this.y + this.currentImage.height / 2];
    this.right = [this.x + this.currentImage.width, this.y + this.currentImage.height / 2];
    this.top = [this.x + this.currentImage.width / 2, this.y];
    this.bottom = [this.x + this.currentImage.width / 2, this.y + this.currentImage.height];
  }

  // move our character
  this.move = function() {
    // refresh our "sensors" - these will be used for movement & collision detection
    this.refreshSensors();

    // see if one of our movement keys is down -- if so, we should try and move
    // note that this character responds to the following key combinations:
    // WASD
    // wasd
    // The four directional arrows
    if (keyIsDown(LEFT_ARROW) || keyIsDown(97) || keyIsDown(65)) {

      // see which tile is to our left
      var tile = world.getTile(this.left[0], this.left[1]);
      console.log(this.left[0], this.left[1])

      // would moving in this direction require a room change?
      if (tile == "roomChange") {
        // ask the world to request a room change
        world.changeRoom("left");

        // move the player into the new room
        this.x = width - this.currentImage.width;
      }

      // otherwise this is a regular tile
      else {

        if (!world.isTileSolid(tile)) {
          // move
          console.log('should move left')

          this.x -= this.speed;
        }
        if (!world.isTileGrass(tile)){
          this.x -= (this.speed *1.8);
        }
        if (!world.isTileWet(tile)){
          this.x -= (this.speed *0.5);
        }

      }
      // if (!world.isTileGrass(tile)){
      //   this.x += (this.speed *1.2);
      // }
      // else{
      //   this.x += this.speed;
      // }

      // change artwork
      this.currentImage = this.artworkLeft;
      this.displaySensor("left");
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(100) || keyIsDown(68)) {
      // see which tile is to our right
      var tile = world.getTile(this.right[0], this.right[1]);

      // would moving in this direction require a room change?
      if (tile == "roomChange") {
        // ask the world to request a room change
        world.changeRoom("right");

        // move the player into the new room
        this.x = 0 + this.currentImage.width;
      }

      // otherwise this is a regular tile
      else {



        // is this tile solid?
        if (!world.isTileSolid(tile)) {
          // move
          this.x += this.speed;
        }
        if (!world.isTileGrass(tile)){
          this.x += (this.speed *1.8);
        }
        if (!world.isTileWet(tile)){
          this.x += (this.speed *0.5);
        }
      }
      // if (!world.isTileGrass(tile)){
      //   this.x += (this.speed *1.2);
      // }
      // else{
      //   this.x += this.speed;
      // }

      // change artwork
      this.currentImage = this.artworkRight;
      this.displaySensor("right");
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(115) || keyIsDown(83)) {
      // see which tile is below us
      var tile = world.getTile(this.bottom[0], this.bottom[1]);

      // would moving in this direction require a room change?
      if (tile == "roomChange") {
        // ask the world to request a room change
        world.changeRoom("down");

        // move the player into the new room
        this.y = 0 + this.currentImage.height;
      }

      // otherwise this is a regular tile
      else {

        // is this tile solid?
        if (!world.isTileSolid(tile)) {
          // move
          this.y += this.speed;
        }
        if (!world.isTileGrass(tile)){
          this.y += (this.speed *1.8);
        }
        if (!world.isTileWet(tile)){
          this.y += (this.speed *0.5);
        }

      }
      // if (!world.isTileGrass(tile)){
      //   this.x += (this.speed *1.2);
      // }
      // else{
      //   this.x += this.speed;
      // }

      // change artwork
      this.currentImage = this.artworkDown;
      this.displaySensor("down");
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(119) || keyIsDown(87)) {
      // see which tile is below us
      var tile = world.getTile(this.top[0], this.top[1]);

      // would moving in this direction require a room change?
      if (tile == "roomChange") {
        // ask the world to request a room change
        world.changeRoom("up");

        // move the player into the new room
        this.y = height - this.currentImage.height;
      }

      // otherwise this is a regular tile
      else {


        // is this tile solid?
        if (!world.isTileSolid(tile)) {
          // move
          this.y -= this.speed;
        }
        if (!world.isTileGrass(tile)){
          this.y -= (this.speed *1.8);
        }
        if (!world.isTileWet(tile)){
          this.y -= (this.speed *0.5);
        }

      }


      // change artwork
      this.currentImage = this.artworkUp;
      this.displaySensor("up");
    }

  }



}
