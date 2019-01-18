'use strict'
$(document).ready(function(){

    $(".carousel").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            prevArrow:"<img  src='images/buttons/backward.png'>",
            nextArrow:"<img  src='images/buttons/forward.png'>"
    })
    $('#blogOne').load('blog.html #1');
    $('#blogTwo').load('blog.html #2');
    $('#blogThree').load('blog.html #3');
})
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

  var x=false;
  var token = '3039070503.1677ed0.988d779908024281b8ade9ad6e78e443',
  num_photos=15;    
      if(window.innerWidth<975){
          num_photos = 10;
           }
           
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
  


