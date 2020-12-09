/*
This File handles the computation of the moving ant
*/

const ANTUP=0;
const ANTRIGHT=1;
const ANTDOWN=2;
const ANTLEFT=3;

export default class Ant{
    constructor(i=0,j=0,width,max_row,max_col){
        this.pos={i:i,j:j};
        this.direction=ANTUP;
        this.width=width;
        this.max_row=max_row-1;
        this.max_col=max_col-1;
        this.offset=width/2;//to center the ant in an cell
    }

    //Sets the position of the Ant
    setPosition(i,j){
        this.pos.i=i;
        this.pos.j=j;
    }

    //Sets a new Direction for the Ant ()
    turnRight(){
        this.direction++;
        if(this.direction > ANTLEFT){
            this.direction=ANTUP;
        }
    }
    //Sets a new Direction fo the Ant
    turnLeft(){
        this.direction--;
        if(this.direction < ANTUP){
            this.direction = ANTLEFT;
        }
    }

    //Sets the new Position of the Ant in depedence of the direction
    moveForward(){
        if(this.direction===ANTUP){
            this.pos.i--;
        } else if(this.direction===ANTRIGHT){
            this.pos.j++;
        } else if(this.direction===ANTDOWN){
            this.pos.i++;
        } else {
            this.pos.j--;
        }

        //Handles the Edge Cases
        if (this.pos.i > this.max_row){
            this.pos.i=0;
        } else if (this.pos.i<0){
            this.pos.i=this.max_row;
        }
        //Handles the Edge Cases
        if (this.pos.j > this.max_col){
            this.pos.j=0;
        } else if (this.pos.j<0){
            this.pos.j=this.max_col;
        }
    }

    //Draws the Ant as an Point
    draw(){
        var canvas = document.getElementById("2d-plane");
        var context = canvas.getContext("2d");
        context.fillStyle ="blue";
        context.beginPath();
        context.arc(this.pos.i*this.width+this.offset, this.pos.j*this.width+this.offset, this.offset, 0, 2*Math.PI);
        context.fill();
    }
}