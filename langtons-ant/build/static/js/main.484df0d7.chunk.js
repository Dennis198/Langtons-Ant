(this["webpackJsonplangtons-ant"]=this["webpackJsonplangtons-ant"]||[]).push([[0],{47:function(t,e,i){},48:function(t,e,i){},49:function(t,e,i){},55:function(t,e,i){"use strict";i.r(e);var n=i(3),s=i(0),a=i.n(s),o=i(9),r=i.n(o),l=(i(47),i(48),i(15)),h=i(16),u=i(38),c=i(37),d=(i(49),function(){function t(e,i,n){var s=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];Object(l.a)(this,t),this.pos={x:e,y:i},this.width=n,this.x=e,this.state=s}return Object(h.a)(t,[{key:"setState",value:function(t){this.state=t}},{key:"setSwitchState",value:function(){this.state=!this.state}},{key:"draw",value:function(){var t=document.getElementById("2d-plane").getContext("2d");this.state?t.fillStyle="crimson":t.fillStyle="lightblue",t.fillRect(this.pos.x,this.pos.y,this.width,this.width)}}]),t}()),f=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2?arguments[2]:void 0,s=arguments.length>3?arguments[3]:void 0,a=arguments.length>4?arguments[4]:void 0,o=arguments.length>5&&void 0!==arguments[5]&&arguments[5];Object(l.a)(this,t),this.pos={i:e,j:i},this.direction=0,this.width=n,this.max_row=s-1,this.max_col=a-1,this.offset=n/2,this.firstAnt=o}return Object(h.a)(t,[{key:"setPosition",value:function(t,e){this.pos.i=t,this.pos.j=e}},{key:"turnRight",value:function(){this.direction++,this.direction>3&&(this.direction=0)}},{key:"turnLeft",value:function(){this.direction--,this.direction<0&&(this.direction=3)}},{key:"moveForward",value:function(){0===this.direction?this.pos.i--:1===this.direction?this.pos.j++:2===this.direction?this.pos.i++:this.pos.j--,this.pos.i>this.max_row?this.pos.i=0:this.pos.i<0&&(this.pos.i=this.max_row),this.pos.j>this.max_col?this.pos.j=0:this.pos.j<0&&(this.pos.j=this.max_col)}},{key:"draw",value:function(){var t=document.getElementById("2d-plane").getContext("2d");t.fillStyle=this.firstAnt?"yellow":"blue",t.beginPath(),t.arc(this.pos.i*this.width+this.offset,this.pos.j*this.width+this.offset,this.offset,0,2*Math.PI),t.fill()}}]),t}(),v=function(){function t(e,i,n){Object(l.a)(this,t),this.field=this.createField(e,i,n),this.ant=[],this.ant.push(new f(Math.floor(e/2),Math.floor(i/2),n,e,i,!0))}return Object(h.a)(t,[{key:"createField",value:function(t,e,i){for(var n=new Array(t),s=0;s<n.length;s++){n[s]=new Array(e);for(var a=0;a<n[s].length;a++)n[s][a]=new d(s*i,a*i,i,!1)}return n}},{key:"setStateOfCell",value:function(t,e){this.field[t][e].setState(!0),this.field[t][e].draw()}},{key:"setAntPosition",value:function(t,e){this.field[this.ant[0].pos.i][this.ant[0].pos.j].draw(),this.ant[0].setPosition(t,e),this.ant[0].draw()}},{key:"addNewAnt",value:function(t,e,i){this.ant.push(new f(t,e,i,this.field.length,this.field[0].length)),this.ant[this.ant.length-1].draw()}},{key:"nextStep",value:function(){for(var t=0;t<this.ant.length;t++){var e=this.ant[t].pos;!1===this.field[e.i][e.j].state?(this.ant[t].turnRight(),this.field[e.i][e.j].setSwitchState(),this.field[e.i][e.j].draw(),this.ant[t].moveForward()):(this.ant[t].turnLeft(),this.field[e.i][e.j].setSwitchState(),this.field[e.i][e.j].draw(),this.ant[t].moveForward()),this.ant[t].draw()}}},{key:"draw",value:function(){for(var t=0;t<this.field.length;t++)for(var e=0;e<this.field[0].length;e++)this.field[t][e].draw();for(var i=0;i<this.ant.length;i++)this.ant[i].draw()}}]),t}(),p=i(77),w=i(76),g=i(11);i(75);var j=Object(g.a)({root:{color:"gray",height:8},thumb:{height:24,width:24,backgroundColor:"#fff",border:"2px solid currentColor",marginTop:-8,marginLeft:-12,"&:focus, &:hover, &$active":{boxShadow:"inherit"}},active:{},valueLabel:{left:"calc(-50% + 4px)",top:4,"& *":{background:"transparent",color:"red"}},track:{height:8,borderRadius:4},rail:{height:8,borderRadius:4}})(p.a),b=900,y=380,m=function(t){Object(u.a)(i,t);var e=Object(c.a)(i);function i(t){var n;return Object(l.a)(this,i),(n=e.call(this,t)).intervalID=0,n.state={field:new v(180,76,5),isRunning:!1,counterIteration:0,speed:10,mouseDown:!1,setNewAntPosition:!1,addNewAnt:!1,resolution:5},n}return Object(h.a)(i,[{key:"componentDidMount",value:function(){this.state.field.draw()}},{key:"start",value:function(){var t=this;this.setState({isRunning:!0}),this.intervalID=setInterval((function(){t.oneStep()}),this.state.speed)}},{key:"oneStep",value:function(){this.state.field.nextStep(),this.setState({counterIteration:this.state.counterIteration+1})}},{key:"stop",value:function(){this.setState({isRunning:!1}),clearInterval(this.intervalID)}},{key:"reset",value:function(){var t=this;this.setState({field:new v(Math.ceil(b/this.state.resolution),Math.ceil(y/this.state.resolution),this.state.resolution),counterIteration:0}),setTimeout((function(){t.state.field.draw()}),10)}},{key:"mouseMove",value:function(t){if(this.state.mouseDown){var e=document.getElementById("2d-plane"),i=this.getMousePos(e,t),n=Math.floor(i.x/this.state.resolution),s=Math.floor(i.y/this.state.resolution);this.state.field.setStateOfCell(n,s)}}},{key:"getMousePos",value:function(t,e){var i=t.getBoundingClientRect();return{x:e.clientX-i.left,y:e.clientY-i.top}}},{key:"handleResolutionChange",value:function(t,e){var i=this;this.stop(),this.setState({resolution:e,field:new v(Math.ceil(b/e),Math.ceil(y/e),e)}),setTimeout((function(){i.state.field.draw()}),10)}},{key:"handleSpeedChange",value:function(t,e){this.setState({speed:e}),this.state.isRunning&&(this.stop(),this.start())}},{key:"allowDrawOnCanvas",value:function(){this.setState({mouseDown:!this.state.mouseDown})}},{key:"moveAntOnClick",value:function(){this.state.addNewAnt&&this.setState({addNewAnt:!1}),this.setState({setNewAntPosition:!this.state.setNewAntPosition})}},{key:"addAntOnClick",value:function(){this.state.setNewAntPosition&&this.setState({setNewAntPosition:!1}),this.setState({addNewAnt:!this.state.addNewAnt})}},{key:"setNewAntPosition",value:function(t){var e=document.getElementById("2d-plane"),i=this.getMousePos(e,t),n=Math.floor(i.x/this.state.resolution),s=Math.floor(i.y/this.state.resolution);this.state.field.setAntPosition(n,s)}},{key:"addNewAntHere",value:function(t){var e=document.getElementById("2d-plane"),i=this.getMousePos(e,t),n=Math.floor(i.x/this.state.resolution),s=Math.floor(i.y/this.state.resolution);this.state.field.addNewAnt(n,s,this.state.resolution)}},{key:"render",value:function(){var t=this,e=this.state,i=e.isRunning,s=e.counterIteration,a=e.setNewAntPosition,o=e.addNewAnt;return Object(n.jsxs)("div",{className:"angtonsant",children:[Object(n.jsx)("h1",{children:"Langton's ant"}),Object(n.jsx)(w.a,{disabled:i,variant:"outlined",onClick:function(){return t.start()},children:"Start"}),Object(n.jsx)(w.a,{disabled:i,variant:"outlined",onClick:function(){return t.oneStep()},children:"Next Step"}),Object(n.jsx)(w.a,{variant:"outlined",onClick:function(){return t.stop()},children:"Stop"}),Object(n.jsx)(w.a,{variant:a?"contained":"outlined",color:"primary",onClick:function(){return t.moveAntOnClick()},children:"Move Ant"}),Object(n.jsx)(w.a,{variant:o?"contained":"outlined",color:"primary",onClick:function(){return t.addAntOnClick()},children:"Add Ant"}),Object(n.jsx)(w.a,{variant:"outlined",onClick:function(){return t.reset()},children:"Reset"}),Object(n.jsxs)("div",{className:"langtonsant__sliders",children:[Object(n.jsxs)("div",{className:"langtonsant__sliders_slider",children:[Object(n.jsx)("h4",{children:"Resolution"}),Object(n.jsx)(j,{disabled:i,valueLabelDisplay:"off","aria-label":"pretto slider",defaultValue:10,min:5,max:40,step:5,onChange:function(e,i){return t.handleResolutionChange(e,i)}})]}),Object(n.jsxs)("div",{className:"langtonsant__sliders_slider",children:[Object(n.jsx)("h4",{children:"Computation Speed(ms)"}),Object(n.jsx)(j,{valueLabelDisplay:"on","aria-label":"pretto slider",defaultValue:10,min:.1,max:100,step:.1,onChange:function(e,i){return t.handleSpeedChange(e,i)}})]})]}),Object(n.jsxs)("h4",{children:["Iterations: ",s]}),Object(n.jsx)("canvas",{className:"angtonsant_canvas__2dplane",id:"2d-plane",width:b,height:y,onMouseDown:a?function(e){return t.setNewAntPosition(e)}:o?function(e){return t.addNewAntHere(e)}:function(){return t.allowDrawOnCanvas()},onMouseUp:a||o?function(){return null}:function(){return t.allowDrawOnCanvas()},onMouseMove:function(e){return t.mouseMove(e)}})]})}}]),i}(a.a.Component);var k=function(){return Object(n.jsx)("div",{className:"app",children:Object(n.jsx)(m,{})})},x=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,78)).then((function(e){var i=e.getCLS,n=e.getFID,s=e.getFCP,a=e.getLCP,o=e.getTTFB;i(t),n(t),s(t),a(t),o(t)}))};r.a.render(Object(n.jsx)(a.a.StrictMode,{children:Object(n.jsx)(k,{})}),document.getElementById("root")),x()}},[[55,1,2]]]);
//# sourceMappingURL=main.484df0d7.chunk.js.map