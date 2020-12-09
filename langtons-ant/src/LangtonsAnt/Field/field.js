/*
This file handles the computtation of the Cells and the ant
*/

import Cell from "./Cell/cell";
import Ant from "./Ant/ant";

export default class Field{
    constructor(rows,cols,width){
        this.field = this.createField(rows,cols,width);
        this.ant = new Ant(Math.floor(rows/2),Math.floor(cols/2),width,rows,cols); 
    }

    //Creates the initial Field
    createField(rows,cols,width){
        let field = new Array(rows);
        for(let i=0;i<field.length;i++){
            field[i]= new Array(cols);
            for(let j=0;j<field[i].length;j++){
                field[i][j]=new Cell(i*width,j*width,width,false);
            }
        }
        return field;
    }

    //Sets the Cell.state with the index i,j to True
    setStateOfCell(i,j){
        this.field[i][j].setState(true);
        this.field[i][j].draw();
    }

    //sets the Ant Position
    setAntPosition(i,j){
        this.field[this.ant.pos.i][this.ant.pos.j].draw();
        this.ant.setPosition(i,j);
        this.ant.draw();
    }

    //Calculates the next Step of the ant and display the outcome
    nextStep(){
        let pos = this.ant.pos;
        if(this.field[pos.i][pos.j].state===false){
            this.ant.turnRight();
            this.field[pos.i][pos.j].setSwitchState();//=false;
            this.field[pos.i][pos.j].draw();
            this.ant.moveForward();
        } else {
            this.ant.turnLeft();            
            this.field[pos.i][pos.j].setSwitchState();//=true;
            this.field[pos.i][pos.j].draw();
            this.ant.moveForward();
        }
        
        this.ant.draw();
    }

    //Draws the hole field and the ant
    draw(){
        for(let i=0;i<this.field.length;i++){
            for(let j=0;j<this.field[0].length;j++){
                this.field[i][j].draw();
            }
        }
        this.ant.draw();
    }
}