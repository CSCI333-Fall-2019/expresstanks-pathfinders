
class Obstacle {
    constructor(pos) {
        this.pos = pos;
        this.width = 50;
        this.height = 50;
    }

    render() {
        fill(150, 30, 90);
        ellipse(this.pos.x, this.pos.y, this.width, this.height);
    }

    // one less life for hitting obstacle
    collision(tank) {
        var dist = this.dist(this.pos.x, this.pos.y, tank.pos.x, tank.pos.y);
        console.log(tank.heading);

        if (dist < this.width) {
            tank.destroyed = true;
        }
    }

    getsHitBy() {
        return false;
    }

}