
class Obstacle{

    constructor(pos) {
        this.pos = pos
        this.width = 50
        this.height = 50
    }

    render() {
        fill(150, 30, 90)
        ellipse(this.pos.x, this.pos.y, this.width, this.height)
    }

    // one less life for hitting obstacle
    hitObstacle(tank) {
        console.log(tank.heading)

        if (dist) {
            
        }
    }

}