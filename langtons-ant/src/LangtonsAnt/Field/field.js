/*
This file handles the computtation of the Cells and the ant
*/

import Cell from "./Cell/cell";
import Ant from "./Ant/ant";

export default class Field{
    constructor(rows,cols,width){
        this.field = this.createField(rows,cols,width);
        this.ant=[];
        this.ant.push(new Ant(Math.floor(rows/2),Math.floor(cols/2),width,rows,cols, true)); 
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
        this.field[this.ant[0].pos.i][this.ant[0].pos.j].draw();
        this.ant[0].setPosition(i,j);
        this.ant[0].draw();
    }

    //Adds a new Ant
    addNewAnt(i,j,width,){
        this.ant.push(new Ant(i,j,width,this.field.length,this.field[0].length));
        this.ant[this.ant.length-1].draw();
    }

    //Calculates the next Step of the ant and display the outcome
    nextStep(){
        for(let i=0;i<this.ant.length;i++){
            let pos = this.ant[i].pos;
            if(this.field[pos.i][pos.j].state===false){
                this.ant[i].turnRight();
                this.field[pos.i][pos.j].setSwitchState();//=false;
                this.field[pos.i][pos.j].draw();
                this.ant[i].moveForward();
            } else {
                this.ant[i].turnLeft();            
                this.field[pos.i][pos.j].setSwitchState();//=true;
                this.field[pos.i][pos.j].draw();
                this.ant[i].moveForward();
            }          
            this.ant[i].draw();
        }

    }

    //Draws the hole field and the ant
    draw(){
        for(let i=0;i<this.field.length;i++){
            for(let j=0;j<this.field[0].length;j++){
                this.field[i][j].draw();
            }
        }
        for(let i=0;i<this.ant.length;i++){
            this.ant[i].draw();
        }
    }
}