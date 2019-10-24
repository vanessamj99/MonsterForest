var monster1
function setup(){
  createCanvas(500,500)
  monster1 = new Monsters(300,300)
  noiseDetail(24)
}

function draw(){
  background(230)
  monster1.display()
  monster1.movement()


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
    // this.growfangs()
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
    movement(){
      this.x += this.dx
      this.y += this.dy
      if(this.x > width - 60){
        this.x = width - 60
      }
      if(this.x < 60){
        this.x = 60
      }
      if(this.y > height - 60){
        this.y = height - 60
      }
      if(this.y < 60){
        this.y = 60
      }
      //speed
      this.dx = 5 * (noise(this.offsetX)-.5)
      this.dy = 5 * (noise(this.offsetY)-.5)
      //more or less jitty
      this.offsetX += .01
      this.offsetY += .01
    }




}
