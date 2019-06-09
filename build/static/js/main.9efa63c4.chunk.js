(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){e.exports=n(24)},19:function(e,t,n){},20:function(e,t,n){},21:function(e,t,n){},23:function(e,t,n){},24:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(12),o=n.n(i),l=(n(19),n(2)),c=n(3),s=n(6),y=n(4),u=n(7),h={width:15,height:25},d={width:300,height:500},x=20,p=(n(20),function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(y.a)(t).call(this,e))).canvas=a.a.createRef(),n.ctx=null,n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"getCanvasContext",value:function(){this.ctx=this.canvas.current.getContext("2d")}},{key:"clearCanvas",value:function(){var e=this.canvas.current,t=e.width,n=e.height;this.ctx.clearRect(0,0,t,n)}},{key:"drawCell",value:function(e,t){var n=this,r=x,a=r/8,i=r-2*a,o=e.x*r,l=e.y*r;this.ctx.fillStyle=t||e.color,this.ctx.fillRect(o+a,l+a,i,i);var c=function(e){var t=e.coords,r=e.color;n.ctx.fillStyle=r,n.ctx.beginPath(),n.ctx.moveTo(t[0].x,t[0].y),n.ctx.lineTo(t[1].x,t[1].y),n.ctx.lineTo(t[2].x,t[2].y),n.ctx.lineTo(t[3].x,t[3].y),n.ctx.lineTo(t[0].x,t[0].y),n.ctx.fill()},s={color:"#0000d8",coords:[{x:o,y:l},{x:o+a,y:l+a},{x:o+a,y:l+r-a},{x:o,y:l+r}]},y={color:"#0000d8",coords:[{x:o+r-a,y:l+a},{x:o+r,y:l},{x:o+r,y:l+r},{x:o+r-a,y:l+r-a}]},u={color:"#000078",coords:[{x:o+a,y:l+r-a},{x:o,y:l+r},{x:o+r,y:l+r},{x:o+r-a,y:l+r-a}]};c({color:"#b3b3fb",coords:[{x:o,y:l},{x:o+a,y:l+a},{x:o+r-a,y:l+a},{x:o+r,y:l}]}),c(s),c(y),c(u)}},{key:"drawCells",value:function(e,t){var n=this;e.forEach(function(e){return n.drawCell(e,t)})}},{key:"redrawCanvas",value:function(){var e=this.props.state,t=e.filledCells,n=e.activeShape;this.clearCanvas(),this.drawCells(t),this.drawCells(n.cells,n.color)}},{key:"componentDidMount",value:function(){this.getCanvasContext()}},{key:"componentDidUpdate",value:function(){this.redrawCanvas()}},{key:"render",value:function(){var e=d,t=e.width,n=e.height;return a.a.createElement("canvas",{ref:this.canvas,className:"field",width:t,height:n})}}]),t}(r.Component)),f=n(1),v=[{color:"#00f0f0",rotations:[[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0}],[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:0,y:3}]]},{color:"#f0f000",rotations:[[{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:1,y:1}]]},{color:"#a000f0",rotations:[[{x:1,y:0},{x:0,y:1},{x:1,y:1},{x:2,y:1}],[{x:0,y:0},{x:0,y:1},{x:1,y:1},{x:0,y:2}],[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:1,y:1}],[{x:1,y:0},{x:0,y:1},{x:1,y:1},{x:1,y:2}]]},{color:"#0000f0",rotations:[[{x:0,y:0},{x:0,y:1},{x:1,y:1},{x:2,y:1}],[{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:0,y:2}],[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:2,y:1}],[{x:1,y:0},{x:1,y:1},{x:0,y:2},{x:1,y:2}]]},{color:"#00f000",rotations:[[{x:1,y:0},{x:2,y:0},{x:0,y:1},{x:1,y:1}],[{x:0,y:0},{x:0,y:1},{x:1,y:1},{x:1,y:2}]]},{color:"#f0a000",rotations:[[{x:2,y:0},{x:0,y:1},{x:1,y:1},{x:2,y:1}],[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:2}],[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:0,y:1}],[{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:2}]]},{color:"#f00000",rotations:[[{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:2,y:1}],[{x:1,y:0},{x:0,y:1},{x:1,y:1},{x:0,y:2}]]}],E=function(e,t){if(void 0!==e&&void 0!==t){var n=v[e];return{type:e,rotation:t,color:n.color,cells:n.rotations[t]}}var r=v.length,a=Math.floor(Math.random()*r),i=v[a],o=i.color,l=i.rotations.length,c=Math.floor(Math.random()*l);return{type:a,rotation:c,color:o,cells:i.rotations[c]}},S=function(e){var t=e.type,n=e.rotation,r=e.cells,a=E(t,n).cells,i=function(e){var t=e.type,n=e.rotation+1;return n===v[t].rotations.length&&(n=0),{rotation:n,cells:E(t,n).cells}}(e),o=i.cells,l=i.rotation,c=function(e,t){return e.map(function(e,n){return{x:t[n].x-e.x,y:t[n].y-e.y}})}(a,o),s=r.map(function(e,t){return{x:e.x+c[t].x,y:e.y+c[t].y}});return Object(f.a)({},e,{rotation:l,cells:s})},m=function(e){var t=e.nextShape;if(!t)return a.a.createElement("svg",{width:50,height:50});var n=t.type,r=t.rotation,i=E(n,r),o=i.color,l=i.cells,c=l.reduce(function(e,t){return t.x>e?t.x:e},0),s=l.map(function(e){var t=(3-c)/2;return{x:12.5*(e.x+t),y:12.5*e.y}});return a.a.createElement("svg",{width:50,height:50},s.map(function(e,t){return a.a.createElement("rect",{key:t,x:e.x,y:e.y,width:12.5,height:12.5,style:{fill:o,stroke:"red"}})}))},g=(n(21),n(5)),A=n(9),w={score:0,lines:0,level:1},b=Object(g.a)({filledCells:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"START_GAME":return[];case"CLEAR_LINE":var n=t.payload.number;return e.filter(function(e){return e.y!==n}).map(function(e){return Object(f.a)({},e,{y:e.y+(e.y<n?1:0)})});case"REPLACE_SHAPE":var r=t.payload.prevShape,a=r.cells.map(function(e){return{x:e.x,y:e.y,color:r.color}});return[].concat(Object(A.a)(e),Object(A.a)(a));default:return e}},activeShape:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"START_GAME":case"REPLACE_SHAPE":var n=t.payload.activeShape,r=n.cells,a=r.reduce(function(e,t){return{width:t.x>e.width?t.x:e.width,height:t.y>e.height?t.y:e.height}},{width:0,height:0}),i=Math.floor(h.width/2)-Math.floor(a.width/2),o=-a.height;return Object(f.a)({},n,{cells:r.map(function(e){return{x:e.x+i,y:e.y+o}})});case"MAKE_MOVE":return Object(f.a)({},e,{cells:e.cells.map(function(e){return{x:e.x,y:e.y+1}})});case"ROTATE_SHAPE":return S(e);case"MOVE_SHAPE":var l="left"===t.payload.direction?-1:1;return Object(f.a)({},e,{cells:e.cells.map(function(e){return Object(f.a)({},e,{x:e.x+l})})});default:return e}},nextShape:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"START_GAME":case"REPLACE_SHAPE":return t.payload.nextShape;default:return e}},isPlaying:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];switch((arguments.length>1?arguments[1]:void 0).type){case"START_GAME":case"RESUME_GAME":return!0;case"PAUSE_GAME":case"FINISH_GAME":return!1;default:return e}},info:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w;switch((arguments.length>1?arguments[1]:void 0).type){case"MAKE_MOVE":return Object(f.a)({},e,{score:e.score+e.level/10});case"CLEAR_LINE":var t=Math.floor((e.lines+1)/5)+1;return{score:e.score+100*e.level,lines:e.lines+1,level:t>9?9:t};case"START_GAME":return w;default:return e}},isOver:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];switch((arguments.length>1?arguments[1]:void 0).type){case"START_GAME":return!1;case"FINISH_GAME":return!0;default:return e}},speedUp:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];switch((arguments.length>1?arguments[1]:void 0).type){case"DECREASE_SPEED":return!1;case"INCREASE_SPEED":return!0;default:return e}}}),M=Object(g.b)(b),T=function(e){var t=E(),n=t.type,r=t.rotation;return{type:"START_GAME",payload:{activeShape:E(),nextShape:{type:n,rotation:r},cellSide:e}}},k=function(e){return{type:"MOVE_SHAPE",payload:{direction:e}}},O=function(){var e=M.getState(),t=e.nextShape,n=e.isPlaying,r=e.isOver,i=e.info;return a.a.createElement("div",{className:"info"},a.a.createElement("button",{onClick:function(){n?M.dispatch({type:"PAUSE_GAME"}):r?M.dispatch(T()):M.dispatch({type:"RESUME_GAME"})}},n?"PAUSE":"PLAY"),a.a.createElement("span",null,a.a.createElement("b",null,"NEXT SHAPE:")),a.a.createElement(m,{nextShape:t}),a.a.createElement("span",null,a.a.createElement("b",null,"SCORE:"),Math.floor(i.score)),a.a.createElement("span",null,a.a.createElement("b",null,"LEVEL:"),i.level),a.a.createElement("span",null,a.a.createElement("b",null,"LINES:"),i.lines))},_=(n(23),function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(y.a)(t).call(this,e))).timer=null,n.speedTimer=null,n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"canShapeRotate",value:function(){var e=S(M.getState().activeShape).cells;return this.isLegalShapePosition(e)}},{key:"canShapeMoveTo",value:function(e){var t=M.getState().activeShape,n="left"===e?-1:1,r=t.cells.map(function(e){return{x:e.x+n,y:e.y}});return this.isLegalShapePosition(r)}},{key:"addKeyListeners",value:function(){var e=this;document.body.addEventListener("keydown",function(t){var n=M.getState(),r=n.isPlaying,a=n.isOver,i=n.speedUp;if(r)switch(t.code){case"ArrowUp":e.canShapeRotate()&&M.dispatch({type:"ROTATE_SHAPE"});break;case"ArrowLeft":e.canShapeMoveTo("left")&&M.dispatch(k("left"));break;case"ArrowRight":e.canShapeMoveTo("right")&&M.dispatch(k("right"));break;case"ArrowDown":i||M.dispatch({type:"INCREASE_SPEED"});break;case"Space":M.dispatch({type:"PAUSE_GAME"})}else"Space"===t.code&&(a?M.dispatch(T()):M.dispatch({type:"RESUME_GAME"}))}),document.body.addEventListener("keyup",function(e){M.getState().isPlaying&&"ArrowDown"===e.code&&M.dispatch({type:"DECREASE_SPEED"})})}},{key:"isLegalShapePosition",value:function(e){var t=M.getState().filledCells,n=h,r=n.width,a=n.height,i=!0,o=!1,l=void 0;try{for(var c,s=t[Symbol.iterator]();!(i=(c=s.next()).done);i=!0){var y=c.value,u=!0,d=!1,x=void 0;try{for(var p,f=e[Symbol.iterator]();!(u=(p=f.next()).done);u=!0){var v=p.value;if(y.x===v.x&&y.y===v.y)return!1}}catch(b){d=!0,x=b}finally{try{u||null==f.return||f.return()}finally{if(d)throw x}}}}catch(b){o=!0,l=b}finally{try{i||null==s.return||s.return()}finally{if(o)throw l}}var E=!0,S=!1,m=void 0;try{for(var g,A=e[Symbol.iterator]();!(E=(g=A.next()).done);E=!0){var w=g.value;if(w.y>=a)return!1;if(w.x<0||w.x>=r)return!1}}catch(b){S=!0,m=b}finally{try{E||null==A.return||A.return()}finally{if(S)throw m}}return!0}},{key:"clearFullLines",value:function(){for(var e=h,t=e.width,n=function(e){var n=M.getState().filledCells.filter(function(t){return t.y===e}).length;if(n===t)M.dispatch({type:"CLEAR_LINE",payload:{number:e}});else{if(!n)return r=e,"break";e--}r=e},r=e.height-1;r>=0;){if("break"===n(r))break}}},{key:"isShapeOutsideField",value:function(){var e=M.getState().activeShape.cells,t=!0,n=!1,r=void 0;try{for(var a,i=e[Symbol.iterator]();!(t=(a=i.next()).done);t=!0){if(a.value.y<0)return!0}}catch(o){n=!0,r=o}finally{try{t||null==i.return||i.return()}finally{if(n)throw r}}return!1}},{key:"handleMove",value:function(){var e=M.getState(),t=e.activeShape,n=e.nextShape,r=t.cells.map(function(e){return{x:e.x,y:e.y+1}});return this.isLegalShapePosition(r)?M.dispatch({type:"MAKE_MOVE"}):this.isShapeOutsideField()?M.dispatch({type:"FINISH_GAME"}):(M.dispatch(function(e,t){var n=t.type,r=t.rotation,a=E();return{type:"REPLACE_SHAPE",payload:{prevShape:e,activeShape:E(n,r),nextShape:{type:a.type,rotation:a.rotation}}}}(t,n)),this.clearFullLines(),void M.dispatch({type:"MAKE_MOVE"}))}},{key:"updateTimers",value:function(){var e=this,t=M.getState(),n=t.isPlaying,r=t.speedUp,a={normal:2+t.info.level,speedUp:20},i=function(e){return clearInterval(e),null},o=function(t){return setInterval(function(){return e.handleMove()},1e3/t)};n?r?(this.timer&&(this.timer=i(this.timer)),this.speedTimer||(this.speedTimer=o(a.speedUp))):(this.timer||(this.timer=o(a.normal)),this.speedTimer&&(this.speedTimer=i(this.speedTimer))):(this.timer&&(this.timer=i(this.timer)),this.speedTimer&&(this.speedTimer=i(this.speedTimer)))}},{key:"componentDidMount",value:function(){this.addKeyListeners()}},{key:"componentDidUpdate",value:function(){this.updateTimers()}},{key:"render",value:function(){return a.a.createElement("div",{className:"app"},a.a.createElement(p,{state:M.getState()}),a.a.createElement(O,null))}}]),t}(r.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var C=function(){return o.a.render(a.a.createElement(_,null),document.getElementById("root"))};M.subscribe(C),C(),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[14,1,2]]]);
//# sourceMappingURL=main.9efa63c4.chunk.js.map