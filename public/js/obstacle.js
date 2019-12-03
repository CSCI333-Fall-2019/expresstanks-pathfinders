
class Obstacle{
    constructor(pos, w, h) {
        this.pos = pos;
        this.width = w;
        this.height = h;
    }

    render() {
        fill(150, 30, 90);
        ellipse(this.pos.x, this.pos.y, this.width, this.height);
    }

    dist(x1, x2, y1, y2) {
        var init = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
        return Math.sqrt(init);
    }

    // one less life for hitting obstacle
    collision(tank) {
        var dist = this.dist(this.pos.x, this.pos.y, tank.pos.x, tank.pos.y);
        // console.log(tank.heading);

        if (dist < this.width) {
            tank.destroyed = true;
        }
    }

    getsHitBy() {
        return false;
    }

}