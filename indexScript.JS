'use strict'
AOS.init();
//Variables
var height=document.body.scrollHeight;
var width=  window.innerWidth;   
var canvas = document.getElementById("fancyBox");   //Declares canvas
canvas.width = width-17;               //sets width
canvas.height = window.innerHeight-60;                 //sets height
var ctx = canvas.getContext("2d");                  //get context
ctx.fillStyle = "#228df1";                             //set color
ctx.strokeStyle="red";
var dotCount =50;               //particle count
var dotArray = [];             //Where the particles will be stored
var angle = .03;
var centerPoint =[800,500];
var mousePos =1;
console.log(width);
//End Variables

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }




canvas.addEventListener('mousemove', function(evt){
    mousePos = getMousePos(canvas,evt);

})

$("button").click(function() {
    let loc =(this.dataset.link);
    $('html,body').animate({
        scrollTop: $(loc).offset().top-50},
        'slow');
});


//------------------------------------------------------
class dot{
    constructor(){
        this.x = Math.random()*1920;
    
        this.y= Math.random()*height;
        this.color ="gray";
    }
    
}
//create dots
for(let i=0;i<dotCount;i++){
    dotArray.push(new dot());
    
}
console.log("created dots");

function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}
function getMousePos(canvas, evt){
    var rect = canvas.getBoundingClientRect();
    return{
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
function changeColor(i){
    var distance = Math.abs(mousePos.x - dotArray[i].x);
    
    if(distance<70){
        dotArray[i].color ="rgb(50,200,200)";
    } else {
        dotArray[i].color ="gray";
    }
}

function drawDot(i){
    var temp = dotArray[i];
    ctx.beginPath();
    ctx.arc(temp.x,temp.y,2,0,2*Math.PI);
    ctx.fill();
}
function drawLine(i){
    ctx.strokeStyle =dotArray[i].color;
    var temp = dotArray[i];
    ctx.moveTo(temp.x,temp.y);
    ctx.lineTo(temp.x+150,temp.y-2000);
    ctx.stroke();

}
function updateWidth(){
    width= window.innerWidth;
    canvas.width=width-20;
    ctx.fillStyle = "#228df1";     //update color?      
    if(width<=1005){
        canvas.height = window.innerHeight;  
    }            
}

window.setInterval(function(){
    updateWidth();
    
    ctx.clearRect(0,0,width,height);
    for(let i =0;i<dotCount;i++){
        changeColor(i);
        drawDot(i);
        drawLine(i);
        var np = rotate(centerPoint[0],centerPoint[1],dotArray[i].x, dotArray[i].y,angle);
        dotArray[i].x = np[0];
        dotArray[i].y = np[1];

    }

  }, 10);


//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//---------------------------SECOND CANVAS-------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//Variables
var height2=document.body.scrollHeight - window.innerHeight;
var width2=  window.innerWidth;   
var canvas2 = document.getElementById("secondFancyBox");   //Declares canvas
canvas2.width = width2-20;               //sets width
canvas2.height = document.body.scrollHeight -window.innerHeight-0;                 //sets height
var ctx2 = canvas2.getContext("2d");                  //get context
ctx2.fillStyle = 'rgba(255, 165, 0, 1)';                    //set color
var pointCount =30;               //particle count
var pointArray = [];              //Where the particles will be stored

//End Variables


class point {
    constructor(xPos, yPos, size, opacity) {   //initializes dot position
        this.xPos = Math.random()*width2;
        this.yPos = Math.random()*height2;
        this.size = Math.random()*20;
        this.opacity = Math.random()*1;
        if(Math.random()*2>1){ //Direction
            this.velX =(Math.random()*2);  //speed
        }else{
            this.velX =(Math.random()*-2); //speed
        }
        if(Math.random()*2>1){  //Direction
            this.velY =Math.random()*2; //speed
        }else{  
            this.velY =Math.random()*-2;  //speed
        }
    }
    move(){   //updates position
        this.xPos+=this.velX/3; 
        this.yPos+=this.velY/3; 
        //Catches particles that go outside the right border
        if(this.xPos > width2+100){
            this.xPos =-99;
        }
        //Catches particles that go outside the left border
        if(this.xPos <-100){
            this.xPos = width2+100;
        }
        //catches particles that go outside the bottom border
        if(this.yPos > height2){
            this.yPos =0;
        }
        //catches particles that go outside the top border
        if(this.yPos <0){
            this.yPos=height2;
        }
    }
}
//-------------------------------------------------------------




/*Draws the dot the function is passed to the canvas */
function Drawpoint(point){
    ctx2.beginPath();
    ctx2.arc(point.xPos,point.yPos,point.size,0,2*Math.PI);
    ctx2.fill();
}

/*Compares the distance between dot i and all the other dot's in the array.
if the distance is less than the dotConnectDistance, it will draw a line 
between the two dots.*/

function updateWidth2(){
    width2= window.innerWidth -20;
    canvas2.width = width2;
    ctx2.fillStyle = 'rgba(134, 140, 190,.4)';     //update color?                  
   
    if(width2<500){
        pointCount=5;
       
    }
    if(width2<1000 && width2>400){
        pointCount=20;
    }
    if(width2>1000){
        pointCount=30;
    }
}
//-----------------------LOGIC ORDER------------------------------------------

//Creates all the particles, add's them to the dotArray, 
//only the constructor is called inside the dot class
var on =true;
if(on==true){

for(var i=0;i<pointCount;i++){    
    pointArray.push(new point(10,10));
    }

/*First clears the canvas to prevent repeating particles
    Then calls the move function within each dot
    Calls DrawDot function
    Calls getDistances function */
window.setInterval(function(){
    updateWidth2();
    ctx2.clearRect(0,0,width2,height2);
    for(let i=0;i<pointCount;i++){
        pointArray[i].move();
        Drawpoint(pointArray[i]);
    }
  }, 10);
}
