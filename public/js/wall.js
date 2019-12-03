
class Wall{

    constructor(pos, w, h) {
        this.pos = pos;
        this.width = w;
        this.height = h;
        this.color = color(120, 100, 200);
    }

    render() {
        fill(this.color);
        rect(this.pos.x, this.pos.y, this.width, this.height);

    }

    dist(x1, x2, y1, y2) {
        var init = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
        return Math.sqrt(init);
    }

    collision(tank) {
        var dist = this.dist(this.pos.x, tank.pos.x, this.pos.y, tank.pos.y);
        if (dist < this.width) {
            tank.moveForward(-0.4);
        }
    }

    getsHitBy(shot){
        var dist = this.dist(this.pos.x, shot.pos.x, this.pos.y, shot.pos.y);
        return(dist < this.width*3/4); 
    }
}
