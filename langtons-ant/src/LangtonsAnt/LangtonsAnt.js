import React from 'react';
import "./LangtonsAnt.css";
import Field from "./Field/field";
import { Button, Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

/**
  Code for the custom slider look
  * */ 
 function ValueLabelComponent(props) {
    const { children, open, value } = props;
  
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }
  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
  };

  const PrettoSlider = withStyles({
    root: {
      color: 'gray',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
      top: 4,
      '& *': {
        background: 'transparent',
        color: 'red',
      },
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);
/**End Slide Code */

const CANVAS_WIDTH=900;
const CANVAS_HEIGHT=380;
const RESOLUTION=5;
const DEAFULT_SPEED=10;

export default class LangtonsAnt extends React.Component{
    intervalID = 0;
    constructor(props){
        super(props);
        this.state = {
            field: new Field(CANVAS_WIDTH/RESOLUTION,CANVAS_HEIGHT/RESOLUTION,RESOLUTION),
            isRunning:false,
            counterIteration:0,
            speed:10,//in ms
            mouseDown: false,
            setNewAntPosition:false,
            addNewAnt: false,
        }
    }

    componentDidMount(){
        this.state.field.draw();
    }

    //Comutes the next Stepof the ant every this.state.speed ms
    start(){
        this.setState({isRunning:true});
        this.intervalID = setInterval(() =>{
           this.oneStep();
        },this.state.speed);        
    }

    //Computes the next Step of the Ant
    oneStep(){
        this.state.field.nextStep();
        this.setState({counterIteration: this.state.counterIteration+1});
    }

    //Stops the Ant
    stop(){
        this.setState({isRunning:false});
        clearInterval(this.intervalID);
    }       

    //Resets the Canvas to the initial State
    reset(){
        this.setState({field: new Field(CANVAS_WIDTH/RESOLUTION,CANVAS_HEIGHT/RESOLUTION,RESOLUTION), counterIteration:0})
        setTimeout(() => {
            this.state.field.draw();    
        }, 10);       
    }

    //Handles the Mousemovment over the Canvas (Adds red Cells)
    mouseMove(e){
        if(!this.state.mouseDown){
            return;
        } 
        var canvas = document.getElementById("2d-plane");
        var pos = this.getMousePos(canvas, e);
        let i= Math.floor(pos.x/(RESOLUTION));
        let j= Math.floor(pos.y/(RESOLUTION));
        this.state.field.setStateOfCell(i,j);
    }

    //Gets the Mouse position on the Canvas
    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
        };
    }

    //Handles the speed change for the iteration timer
    handleSpeedChange(e, val){
        this.setState({speed: val});
        if(this.state.isRunning){
          this.stop();
          this.start();
        }
    }

    //Sets the Variable on Mouse Down to true/ Mouse UP to false
    allowDrawOnCanvas(){
        this.setState({mouseDown: !this.state.mouseDown})
    }

    //Allow two move the first Ant to a new Position by clicking on the canvas
    moveAntOnClick(){
        if(this.state.addNewAnt) this.setState({addNewAnt:false});
        this.setState({setNewAntPosition: !this.state.setNewAntPosition});        
    }

    //Allow two add a new Ant by clicking on the canvas
    addAntOnClick(){
      if(this.state.setNewAntPosition) this.setState({setNewAntPosition:false});
      this.setState({addNewAnt: !this.state.addNewAnt});        
    }

    //Sets the new Position of the first Ant
    setNewAntPosition(e){
        var canvas = document.getElementById("2d-plane");
        var pos = this.getMousePos(canvas, e);
        let i= Math.floor(pos.x/(RESOLUTION));
        let j= Math.floor(pos.y/(RESOLUTION));
        this.state.field.setAntPosition(i,j);
    }

    //Add the new Ant on Click on the given position on the canvas
    addNewAntHere(e){
        var canvas = document.getElementById("2d-plane");
        var pos = this.getMousePos(canvas, e);
        let i= Math.floor(pos.x/(RESOLUTION));
        let j= Math.floor(pos.y/(RESOLUTION));
        this.state.field.addNewAnt(i,j, RESOLUTION);
    }

    render(){
        const {isRunning, counterIteration, setNewAntPosition, addNewAnt} = this.state;
        return(
            <div className="angtonsant">
                <h1>Langton's ant</h1>
                <Button disabled={isRunning} variant="outlined" onClick={()=>this.start()}>Start</Button>
                <Button disabled={isRunning} variant="outlined" onClick={()=>this.oneStep()}>Next Step</Button>
                <Button variant="outlined" onClick={()=>this.stop()}>Stop</Button>
                <Button variant={setNewAntPosition?"contained":"outlined"} color="primary" onClick={()=>this.moveAntOnClick()}>Move Ant</Button>
                <Button variant={addNewAnt?"contained":"outlined"} color="primary" onClick={()=>this.addAntOnClick()}>Add Ant</Button>
                <Button variant="outlined" onClick={()=>this.reset()}>Reset</Button>
                <div className="angtonsant__speed__slider">
                    <h4>Computation Speed of an Iteration (ms)</h4>
                    <PrettoSlider valueLabelDisplay="on"
                        aria-label="pretto slider" defaultValue={DEAFULT_SPEED} min={0.1} max={100} step={0.1}
                        onChange={(e, val) => this.handleSpeedChange(e, val)}  
                    />
                </div>
                <h4>Iterations: {counterIteration}</h4>
                <canvas className="angtonsant_canvas__2dplane" id="2d-plane" width={CANVAS_WIDTH} height={CANVAS_HEIGHT}
                    onMouseDown={!setNewAntPosition? !addNewAnt? ()=>this.allowDrawOnCanvas():(e)=>this.addNewAntHere(e):(e)=>this.setNewAntPosition(e)}
                    onMouseUp={!setNewAntPosition && !addNewAnt ? ()=>this.allowDrawOnCanvas():()=>null}
                    onMouseMove={(e) => this.mouseMove(e)}
                ></canvas>
            </div>
        );
        
    }
}