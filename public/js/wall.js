


class Wall{

    constructor(pos){
        this.pos = pos;
        this.width = 60;
        this.height = 60;
        this.color = color(120, 100, 200);
    }

    render(){
        fill(this.color);
        rect(this.pos.x, this.pos.y, this.width, this.height);
    }

    dist(x1,x2,y1,y2){
        var init  = Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2);
        return Math.sqrt(init);
    }

    collision(tank){

        var dist = this.dist(this.pos.x, this.pos.y, tank.pos.x, tank.pos.y);
        console.log(tank.heading);
  
        if(dist < this.width){
            console.log(dist);
          if((tank.heading < -1.6 && tank.heading  > -4.7)||(tank.heading > 1.6 && tank.heading  < 4.7)){
            if(tank.pos.x > this.pos.x + this.width){
              console.log("STOP");
              tank.pos.x = this.pos.x + this.width;
            }
          }
          if((tank.heading > -2.4 && tank.heading  < -.9)||(tank.heading > 4.2 && tank.heading  < 5.6)){
            console.log("please");
            if(tank.pos.y > this.pos.y){
                tank.pos.y = this.pos.y + this.width;
               
            }
          }
          if((tank.heading < 0 && tank.heading > -1 && tank.heading  < -5.2 )||(tank.heading > 0 && tank.heading < 1 && this.heading  > 5.6) ){
            if(this.pos.x > tank.pos.x){
              console.log("STOP");
              tank.stopMotion();
            }
          }
          if((this.heading > -5.2 && this.heading  < -4.1)||(this.heading > 1 && this.heading  < 2.4)){
            if(this.pos.y > wall.pos.y){
              console.log("STOP");
              tank.stopMotion();
            }
          }
        }
      }
  

}