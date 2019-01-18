'use strict'
AOS.init();
//Variables
var height=document.body.scrollHeight;
var width=  window.innerWidth;   
var canvas = document.getElementById("fancyBox");   //Declares canvas
canvas.width = width-17;               //sets width
canvas.height = window.innerHeight-200;                 //sets height
var ctx = canvas.getContext("2d");                  //get context
ctx.fillStyle = "#228df1";                             //set color
ctx.strokeStyle="red";
var dotCount =50;               //particle count
var dotArray = [];             //Where the particles will be stored

var angle = .03;
var centerPoint =[800,500];

var mousePos;
//End Variables
canvas.addEventListener('mousemove', function(evt){
    mousePos = getMousePos(canvas,evt);

})




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
    console.log(distance);
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


//Instagram api


var x=false;
  var token = '2174196449.1677ed0.850e074c1b9647ec9d3ffc67ec475f3b',
  num_photos=9;    

           
  $.ajax({
      
      url: 'https://api.instagram.com/v1/users/self/media/recent',
      dataType: 'jsonp',
      type: 'GET',
      data: {access_token: token, count: num_photos},
      success: function(data){
          console.log(data);
          for( x in data.data ){
              $('#instagramGallery').append('<div class="igPhoto"><img src="'+data.data[x].images.low_resolution.url+'"></div>');
          }
      },
      error: function(data){
          console.log(data);
          console.log("error");
      }
  });
  


