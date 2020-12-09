/*
This class handles the behavior of a Cell for the field
*/

export default class Cell{
    constructor(x,y,width,state=true){
        this.pos={x:x,y:y};
        this.width=width;
        this.x = x;
        this.state=state; //True=red, False=blue
    }

    //Sets the State of the Cell to a given state
    setState(state){
        this.state=state;
    }
    //Switches the State of the Cell
    setSwitchState(){
        this.state=!this.state;
    }

    //Draws the Rectangle on the Canvas
    draw(){
        var canvas = document.getElementById("2d-plane");
        var context = canvas.getContext("2d");
        if(this.state){
            context.fillStyle="crimson";
        } else {
            context.fillStyle="lightblue";    
        }
        
        context.fillRect(this.pos.x,this.pos.y,this.width,this.width); 
    }
}