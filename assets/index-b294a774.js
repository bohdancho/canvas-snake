var L=Object.defineProperty;var P=(i,t,e)=>t in i?L(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var r=(i,t,e)=>(P(i,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function e(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=e(n);fetch(n.href,o)}})();class m{constructor(t){r(this,"sizePx");r(this,"ctx");this.ctx=m.getContext(t);const{width:e,height:s}=t.getBoundingClientRect();t.width=e,t.height=s,this.sizePx=e}static getContext(t){const e=t.getContext("2d");if(!e)throw Error("No ctx");return e}}const g={field:{length:7},snake:{initLength:3,moveFrequencyMs:300},colors:{grid:"#6b7280",snake:"#3b82f6",food:"#ef4444"}};function y(i,t){return Math.floor(Math.random()*(t-i+1))+i}var c=(i=>(i.x_pos="x_pos",i.x_neg="x_neg",i.y_pos="y_pos",i.y_neg="y_neg",i))(c||{});function b(){const i=Object.values(c),t=y(0,i.length-1);return i[t]}function _(i,t){return i[0]!==t[0]}class l{constructor(t,e){this.x=t,this.y=e}static areEqual(t,e){return t.x===e.x&&t.y===e.y}static random(t){const e=y(0,t-1),s=y(0,t-1);return new l(e,s)}}const v={ArrowLeft:c.x_neg,ArrowRight:c.x_pos,ArrowUp:c.y_neg,ArrowDown:c.y_pos,w:c.y_neg,a:c.x_neg,s:c.y_pos,d:c.x_pos};class E{constructor(t){this.actions=t}listen(){document.addEventListener("keydown",({key:t})=>{I(t)&&this.actions.changeDirection(v[t])})}}function I(i){return Object.keys(v).includes(i)}class x{constructor(t,e,s){r(this,"color",g.colors.food);this.field=t,this.location=e,this.onEaten=s,this.field.updateSquare(e,this)}initRender(){this.field.renderSquare(this.location)}onDestroy(){this.onEaten()}}class M{constructor(t){r(this,"food");this.field=t}init(){this.generateFood()}generateFood(){this.food=new x(this.field,this.field.getRandomFreeLocation(),this.onEaten.bind(this)),this.food.initRender()}onEaten(){this.generateFood()}}class u{constructor(t){r(this,"length",g.field.length);r(this,"gridColor",g.colors.grid);r(this,"squares");r(this,"squareLengthPx");this.canvas=t;const e=u.getSquareLengthPx(this.canvas,this.length);this.squareLengthPx=e,this.squares=u.getInitialSquares(this.canvas,this.length,e,this.gridColor)}initRender(){this.squares.forEach(t=>t.forEach(e=>{e.render()})),this.paintInitBorder()}updateSquare(t,e){const s=this.getSquare(t);s.entity=e}renderSquare(t){this.getSquare(t).render()}getRandomFreeLocation(){const t=l.random(this.length);return this.getSquare(t).entity===null?t:this.getRandomFreeLocation()}getSquare(t){return this.squares[t.y][t.x]}isValidLocation(t){const{x:e,y:s}=t;return e>=0&&s>=0&&e<this.length&&s<this.length}paintInitBorder(){this.canvas.ctx.strokeStyle=this.gridColor,this.canvas.ctx.strokeRect(0,0,this.length*this.squareLengthPx,this.length*this.squareLengthPx)}static getConnectedLocation(t,e){let{x:s,y:n}=e;switch(t){case c.x_pos:s++;break;case c.x_neg:s--;break;case c.y_pos:n++;break;case c.y_neg:n--;break}return new l(s,n)}static getSquareLengthPx(t,e){return Math.floor(t.sizePx/e)}static getInitialSquares(t,e,s,n){const o=[];for(let a=0;a<e;a++){o[a]=[];for(let d=0;d<e;d++)o[a][d]=new k(t,s,new l(d,a),n)}return o}}class k{constructor(t,e,s,n){r(this,"_entity",null);this.canvas=t,this.lengthPx=e,this.location=s,this.borderColor=n}render(){this._entity?this.paint(this._entity.color):this.clear()}get entity(){return this._entity}set entity(t){var s,n;this._entity!==t&&((n=(s=this._entity)==null?void 0:s.onDestroy)==null||n.call(s)),this._entity=t}paint(t){this.canvas.ctx.fillStyle=t,this.canvas.ctx.fillRect(this.lengthPx*this.location.x,this.lengthPx*this.location.y,this.lengthPx,this.lengthPx)}clear(){this.canvas.ctx.clearRect(this.lengthPx*this.location.x,this.lengthPx*this.location.y,this.lengthPx,this.lengthPx),this.paintBorder()}paintBorder(){this.canvas.ctx.strokeStyle=this.borderColor,this.canvas.ctx.strokeRect(this.lengthPx*this.location.x,this.lengthPx*this.location.y,this.lengthPx,this.lengthPx)}}class f{constructor(t){r(this,"_location");this._location=t}get location(){return this._location}}class h{constructor(t,e,s,n){r(this,"segments");this.snake=t,this.field=e,this.segments=h.getInitialSegments(this.field,n,s),this.segments.forEach(o=>this.field.updateSquare(o.location,t))}growForward(t){const e=h.getLastSegment(this.segments),s=u.getConnectedLocation(t,e.location),n=h.transpileLocation(s,this.field.length),o=this.field.getSquare(n).entity;if(o===this.snake)return{event:"collapsed"};const a=o instanceof x?"ateFood":null;return this.segments.push(new f(n)),this.field.updateSquare(n,this.snake),this.field.renderSquare(n),{event:a}}trimTail(){const t=this.segments.shift();if(!t)throw Error("Snake trimTail failed");this.field.updateSquare(t.location,null),this.field.renderSquare(t.location)}static transpileLocation(t,e){const s={x:t.x,y:t.y};return["x","y"].forEach(o=>{t[o]>=e&&(s[o]=0),t[o]<0&&(s[o]=e-1)}),new l(s.x,s.y)}static getInitialSegments(t,e,s){const n=l.random(t.length),a=[new f(n)];for(;a.length<s;){const S=h.getLastSegment(a),w=u.getConnectedLocation(e,S.location);a.push(new f(w))}const d=h.getLastSegment(a);return t.isValidLocation(d.location)?a:h.getInitialSegments(t,e,s)}static getLastSegment(t){const e=t.at(-1);if(!e)throw Error("Snake without segments");return e}}class C{constructor(t,e,s,n){r(this,"validDirection");r(this,"requestedDirection");r(this,"moveInterval");this.body=t,this.onCollapse=e,this.moveFrequencyMs=s,this.validDirection=n}get direction(){return this.validDirection}set direction(t){_(this.direction,t)&&(this.requestedDirection=t)}startMoving(){this.move(),this.moveInterval=setInterval(()=>this.move(),this.moveFrequencyMs)}stopMoving(){clearInterval(this.moveInterval)}move(){this.requestedDirection&&(this.validDirection=this.requestedDirection,this.requestedDirection=void 0);const{event:t}=this.body.growForward(this.validDirection);if(t==="collapsed"){this.stopMoving(),this.onCollapse();return}t!=="ateFood"&&this.body.trimTail()}}class F{constructor(t,e){r(this,"color",g.colors.snake);r(this,"body");r(this,"mover");this.field=t,this.onCollapse=e;const s=b();this.body=new h(this,this.field,g.snake.initLength,s),this.mover=new C(this.body,this.onCollapse,g.snake.moveFrequencyMs,s)}startMoving(){this.mover.startMoving()}get direction(){return this.mover.direction}set direction(t){this.mover.direction=t}}class D{constructor(t){r(this,"field");r(this,"snake");r(this,"keyboard");r(this,"foodManager");const e=new m(t);this.field=new u(e),this.snake=new F(this.field,this.onLoss),this.keyboard=new E({changeDirection:s=>this.snake.direction=s}),this.foodManager=new M(this.field),this.init()}init(){this.field.initRender(),this.foodManager.init(),this.keyboard.listen()}start(){this.snake.startMoving()}onLoss(){alert("you lost")}}class R{constructor(t,e){r(this,"gameInstance");this.canvas=t,this.gameInstance=new D(this.canvas),this.addStartListener(e)}addStartListener(t){const e=()=>{t.classList.add("closed"),this.gameInstance.start(),document.removeEventListener("keydown",e)};document.addEventListener("keydown",e)}}const p=document.querySelector("#canvas"),q=document.querySelector("#startScreen");if(!p||!q)throw Error("Necessary HTML Elements missing");new R(p,q);