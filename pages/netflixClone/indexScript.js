'use strict'

  $(document).ready(function(){
    $('.carousel').slick({
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 6,
       
        nextArrow: '<i class="fas fa-angle-right"></i>',
        prevArrow: '<i class="fas fa-angle-left"></i>',
      });
  });