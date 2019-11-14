


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


}