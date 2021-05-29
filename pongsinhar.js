const canvas = document.getElementById("pinpon");
const context= canvas.getContext("2d");
const user={
	x:0,
	y:canvas.height/2-100/2,
	width: 10,
	height:100,
	color:'red',
	score:0
}
const com={
	x:canvas.width-10,
	y:canvas.height/2-100/2,
	width: 10,
	height:100,
	color:'red',
	score:0
}
const ball={
	x:canvas.width/2,
	y:canvas.width/2,
	radius : 10,
	speed : 5,
	velx : 5,
	vely : 5,
	color : "green"
}
const net ={
	x : canvas.width/2-1,
	y : 0,
	width : 2,
	height : 10,
	color : "white"
}
function drawnet(){
   for(let i=0;i<=canvas.height; i+=15){
   	drawrect(net.x,net.y+i,net.width,net.height,net.color);
   }
}
function drawrect(x,y,w,h,color){
      context.fillStyle= color;
      context.fillRect(x,y,w,h);
}


function drawcir(x,y,r,color){
	context.fillStyle=color;
	context.beginPath();
	context.arc(x,y,r,0,Math.PI*2,false);
	context.closePath();
	context.fill();
}
// drawcir(100,100,50,"white");
function drawtext(text,x,y,color){
	context.fillStyle=color;
	context.font="50px fantasy";
	context.fillText(text,x,y);
	// context.fontSize="25px";
}
function render(){
    drawrect(0,0,canvas.width,canvas.height,"grey");
    drawnet();
    drawtext(user.score,canvas.width/4,canvas.height/5,"black");
    drawtext(com.score,3*canvas.width/4,canvas.height/5,"black");
    drawrect(user.x,user.y,user.width,user.height,user.color);
    drawrect(com.x,com.y,com.width,com.height,com.color);
    drawcir(ball.x,ball.y,ball.radius,ball.color);
}
// canvas.addEventListener("mousemove",movePadd);
// function movePadd(evt){
// 	let rect = canvas.getBoundingClientRect();
// 	user.y=evt.clientY-user.height/2;}
// 


function colldec(b,p){
	b.top=b.y-b.radius;
	b.bottom=b.y+b.radius;
	b.left=b.x-b.radius;
	b.right=b.x+b.radius;
	p.top=p.y;
    p.bottom=p.y+p.height;
    p.left=p.x;
    p.right=p.x+p.width;
    return b.right>p.left && b.bottom > p.top&& b.left <p.right&& b.top<p.bottom ;
}
window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);
// window.addEventListener('KeyW', www);
// window.addEventListener('KeyS', sss);
let upArrowPressed,downArrowPressed,wpressed,spressed,dPressed,aPressed,dowPressed,upPressed;
// gets activated when we press down a key
function keyDownHandler(event) {
  // get the keyCode
  switch (event.keyCode) {
    // "up arrow" key
    case 38:
      // set upArrowPressed = true
      upArrowPressed = true;
      break;
    // "down arrow" key
    case 40:
      downArrowPressed = true;
      break;
    case 39:
      // set upArrowPressed = true
      dowPressed = true;
      break;
    // "down arrow" key
    case 37:
      upPressed = true;
      break;
    
    case 87:
      // set upArrowPressed = true
      wpressed = true;
      break;
    // "down arrow" key
    case 83:
      spressed = true;
      break;
    case 68:
      dPressed = true;
      break;
    case 65:
      aPressed = true;
      break;
  }
}

// gets activated when we release the key
function keyUpHandler(event) {
  switch (event.keyCode) {
    // "up arraow" key
    case 38:
      upArrowPressed = false;
      break;
    // "down arrow" key
    case 40:
      downArrowPressed = false;
      break;
    case 87:
      wpressed = false;
      break;
    // "down arrow" key
    case 83:
      spressed = false;
      break;
    case 39:
      // set upArrowPressed = true
      dowPressed = false;
      break;
    // "down arrow" key
    case 37:
      upPressed = false;
      break;
    case 68:
      dPressed = false;
      break;
    case 65:
      aPressed = false;
      break;
  }
}
// function www(event) {
//   // get the keyCode
//   switch (event.keyCode) {
//     // "up arrow" key
//     case 87:
//       // set upArrowPressed = true
//       wpressed = true;
//       break;
//     // "down arrow" key
//     case 83:
//       spressed = true;
//       break;
//   }
// }

// // gets activated when we release the key
// function sss(event) {
//   switch (event.keyCode) {
//     // "up arraow" key
//     case 87:
//       wpressed = false;
//       break;
//     // "down arrow" key
//     case 83:
//       spressed = false;
//       break;
//   }
// }
function resetball(){
	ball.x=canvas.width/2;
	ball.y=canvas.height/2;
	// ball.speed=5;
	ball.velx=5*-1*(ball.velx/Math.abs(ball.velx));
	ball.vely=5;
	user.y=canvas.height/2;
	com.y=canvas.height/2;
}
let t=0,n=0;
function update(){

	ball.x+=ball.velx;
	ball.y+=ball.vely;
	let comlev=0.26;
	user.y+=(ball.y-(user.y+user.height/2))*comlev;
	if (com.y<0){
		com.y=0;
	}
	if (com.y+com.height>canvas.height){
		com.y=canvas.height-com.height;
	}
	if (user.y<0){
		user.y=0;
	}
	if (user.y+user.height>canvas.height){
		user.y=canvas.height-user.height;
	}
	// user.y+=(ball.y-(user.y+user.height/2))*comlev;
	if (ball.radius + ball.y > canvas.height || ball.y - ball.radius < 0){
		ball.vely=-ball.vely;
	}
	let player=(ball.x<canvas.width/2)?user:com;

	if(colldec(ball,player)){
      let collidepoint = ball.y -(player.y+player.height/2);
	  collidepoint=collidepoint/(player.height/2);
	  let anglerad=collidepoint*Math.PI/4;
	  let dir=(ball.x<canvas.width/2)?1:-1;
	  ball.velx=-ball.velx+(dir);
	  if (ball.vely>=0) ball.vely+=1;
	  else ball.vely-=1;
      t=0;
      n=0;
	  // ball.vely= ball.vely;
	  // ball.vely=ball.speed*Math.sin(anglerad);
	}
	if (upArrowPressed && com.y > 0) {
    com.y -= Math.abs(2*ball.velx)+2;
  } else if (downArrowPressed && (com.y < canvas.height)) {
    com.y += Math.abs(2*ball.velx)+2;
  }
  else if (dowPressed && n==0 ) {
    ball.vely=ball.vely+ball.vely;
    n=1;
  } else if (upPressed && n==0) {
    ball.vely=-ball.vely;
    n=1;
  }

  if (wpressed && user.y > 0) {
    user.y -= Math.abs(2*ball.velx);
  } else if (spressed && (user.y < canvas.height)) {
    user.y += Math.abs(2*ball.velx)+2;
  }
  // else if (dPressed && t==0 ) {
  //   ball.vely=ball.vely+ball.vely;
  //   t=1;
  // } else if (aPressed && t==0) {
  //   ball.vely=-ball.vely;
  //   t=1;
  // }
	if (ball.x>2*canvas.width){
		user.score++;
		resetball();
	}
	else if(ball.x<-1*canvas.width){
		com.score++;
		resetball();
	}
}


function game(){
	update();
	render();
}

const fra=50;
setInterval(game,1000/fra); 