'use strict'
AOS.init();
//Variables
//Looks like some things are repeated but thats because we have
//two canvases with different particle effects on them
var height = window.innerHeight;
var width =  window.innerWidth;   
var canvas = document.getElementById("fancyBox");   //Declares canvas
var ctx = canvas.getContext("2d");                  //get context
var dotCount =50; 
if(width<=700){dotCount=15;}                                  //dot count
var dotArray = [];                                  //Where the particles will be stored
var angle = .03;                                    //rotation speed
var centerPoint =[800,500];                         //rotates around
var mousePos =1;                                    //needs to init as number
var divider = document.getElementById("divider");
var title = document.getElementById("title");
var height2=document.body.scrollHeight - window.innerHeight;
var canvas2 = document.getElementById("secondFancyBox");   //Declares canvas
var pointCount =30;                                 //particle count
var pointArray = [];                                //all the points
var ctx2 = canvas2.getContext("2d");                //context
canvas2.width = width-20;                           //sets width
canvas2.height = height2;                           //sets height
ctx2.fillStyle = 'rgba(255, 165, 0, 1)';            //set color
canvas.width = width-17;                            //sets width
canvas.height = window.innerHeight-60;              //sets height
ctx.fillStyle = "#228df1";                          
ctx.strokeStyle="red";
//End Variables
//---Classes
class dot{
    constructor(){
        this.x = Math.random()*width;
        this.y= Math.random()*height;
        this.color ="gray";
    }
}
class point {
    constructor() {                            //initializes point
        this.xPos = Math.random()*width;
        this.yPos = Math.random()*height2;
        this.size = Math.random()*20;
        this.opacity = Math.random()*1;
        if(Math.random()*2>1){              //X Direction
            this.velX =(Math.random()*2);   //Pos speed
        }else{
            this.velX =(Math.random()*-2);  //Neg speed
        }
        if(Math.random()*2>1){              //Y Direction
            this.velY =Math.random()*2;     //Pos speed
        }else{  
            this.velY =Math.random()*-2;    //Neg speed
        }
    }
    move(){                                 //updates position
        this.xPos+=this.velX/3; 
        this.yPos+=this.velY/3; 
        //Catches particles that go outside the right border
        if(this.xPos > width+100){
            this.xPos =-99;
        }
        //Catches particles that go outside the left border
        if(this.xPos <-100){
            this.xPos = width+100;
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
//Initializations
canvas.addEventListener('mousemove', function(evt){ //Add mouse listener
    mousePos = getMousePos(canvas,evt);
})
for(let i=0;i<dotCount;i++){                        //create dots
    dotArray.push(new dot());
}
//---Functions
//Gets mouse position for the recoloring effect on canvas one
function getMousePos(canvas, evt){
    var rect = canvas.getBoundingClientRect();
    return{
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
//Smooth scrolling
$("button").click(function() {  
    let loc =(this.dataset.link);
    $('html,body').animate({
        scrollTop: $(loc).offset().top-50},
        'slow');
});
//Dropdown menu
function dropDown() {
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
//Rotates the dots around the centerpoint
function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}
//changes line color based on mouse position
function changeColor(i){
    var distance = Math.abs(mousePos.x - dotArray[i].x);
    if(distance<70){
        dotArray[i].color ="rgb(50,200,200)";
    } else {
        dotArray[i].color ="gray";
    }
}
//draws the dots
function drawDot(i){
    var temp = dotArray[i];
    ctx.beginPath();
    ctx.arc(temp.x,temp.y,2,0,2*Math.PI);
    ctx.fill();
}
//draws the lines
function drawLine(i){
    ctx.strokeStyle =dotArray[i].color;
    var temp = dotArray[i];
    ctx.moveTo(temp.x,temp.y);
    ctx.lineTo(temp.x+150,temp.y-2000);
    ctx.stroke();
}
//updates thhe width of the canvases
function updateWidth(){
    width= window.innerWidth;
    canvas.width=width-20;
    ctx.fillStyle = "#228df1";    
    ctx2.fillStyle = 'rgba(134, 140, 190,.4)';
    if(width<=1180){
        removeAttb();
    }
    if(width<=700){
        centerPoint= [250, 400];
    }      
}
//Updates height to prevent weird resizeing issues when not in full screen desktop mode
function updateHeight(){
    if(width<=1180){
        divider.style.marginTop=canvas.height-20+"px";
    }else{
        divider.style.marginTop="0px";
    }
    if(width<=862){
        divider.style.marginTop=canvas.height-20+"px";
    }
    if(width<=700){
        divider.style.marginTop=canvas.height-105+"px";

    }
    if(width<=579){
        divider.style.marginTop=window.innerHeight-160+"px";
    }
    canvas.height= window.innerHeight-60;
    title.style.top=canvas.height/2 +"px";
    title.style.left=canvas.width/2 -canvas.width/4+"px";
}
//removes AOS attributes from project classes at a certain width
function removeAttb(){
    let x = document.getElementsByClassName("project");
    for(let j=0;j<x.length;j++){
        x[j].removeAttribute("data-aos");
    }
}
//draws the points for the second canvas particle effects
function Drawpoint(point){
    ctx2.beginPath();
    ctx2.arc(point.xPos,point.yPos,point.size,0,2*Math.PI);
    ctx2.fill();
}

//-----------------------LOGIC ORDER------------------------------------------
/*First clears the canvas to prevent repeating points
    Then calls the move function within each point
    Calls Drawpoint function*/
var on =true;
if(on==true){
    //Adds points to array
    for(var i=0;i<pointCount;i++){    
        pointArray.push(new point(10,10));
    }
    //loop
    window.setInterval(function(){
    ctx2.clearRect(0,0,width,height2);
    for(let i=0;i<pointCount;i++){
        pointArray[i].move();
        Drawpoint(pointArray[i]);
    }
    updateWidth();
    updateHeight();
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
}