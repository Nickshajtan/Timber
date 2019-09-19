(function ($) {
/*---Initialization progressbar---*/    
  $(function() {
        $(window).on("scroll resize", function() {
            var o = $(window).scrollTop() / ($(document).height() - $(window).height());
            $(".progress-bar").css({
                "width": (100 * o | 0) + "%"
            });
            $('progress')[0].value = o;
        })
    });    
/*---Fixed scroll menu---*/     

//Check device type
if(window.screen.width > 1050){ 
    jQuery(function($) {
                $(window).scroll(function(){
                    if($(this).scrollTop()>250){
                        $('.menu-nav-top').addClass('navbar-fixed-top');
                        $('.progress').addClass('fixed-top');
                        $('.mod-languages').addClass('fixed-top');
                        
                    }
                    else if ($(this).scrollTop()<250){
                        $('.menu-nav-top').removeClass('navbar-fixed-top');                         $('.progress').removeClass('fixed-top');
                        $('.mod-languages').removeClass('fixed-top');
                    }
                });

    });       
}
 /*--- To content arrow ---*/  
if(window.screen.width > 1050){     
$(function(){    
$(document).ready(function(){
	$("#arrow").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).offset().top - 150;//becouse fixed menu
		$('body,html').animate({scrollTop: top}, 1200);
	});
});   
});    
}
//mobile device    
else{
$(function(){    
$(document).ready(function(){
	$("#arrow").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 1200);
	});
});   
});   
}    
//to h2 page item
$(function(){
$(document).ready(function(){    
    $(".page-header h2").append("<span id='arrow_goal'></span>");
});
});    
/*----Dropdown and mobile menu---*/
$(function(){
    //add classes to parent elements
    $('.parent').addClass('dropdown');
    $('.parent a').addClass('caret-parent');
    $('.parent a').addClass('dropdown-toggle');
    $('.nav-child a').removeClass('caret-parent');
    $(".caret-parent").append("<span class='caret'></span>");
    //add atributes
    $('.caret-parent').each(function() {
        $(this).attr("data-toggle", "dropdown");
        $(this).attr("role", "button");
        $(this).attr("aria-haspopup", "true");
        $(this).attr("aria-expanded", "false");
    });
    //add classes to child elements
    $('ul.nav-child').addClass('dropdown-menu');
    $('ul.dropdown-menu li>a, ul.dropdown-menu li>a:hover, ul.dropdown-menu li>a:focus').css({background: 'transparent'}); 
       //click function
    $(".dropdown-menu li").click(function(){
   window.location=$(this).find("a").attr("href"); 
   return false;
});    
});
/*----Doble click open link---*/
$(function(){
    $('li.parent').dblclick(function(){
        window.location=$(this).find("a").attr("href");
        return false;
    });
});
/*---Canvas hover effect---*/    
if(window.screen.width > 760){
$(function(){    
$(document).ready(function(){ 
    $("#content-read").bind("mouseover.body","div", function (event){
         $("body").css({
            background: "rgba(0,0,0,0.3)",
        });
    });
    $("#content-read").bind("mouseout.body","div", function (event){
         $("body").css({
            background: "rgba(255,255,255,1)",
        });
    });
    $("#content-read").bind("touchstart.body","div", function (event){
         $("body").css({
            background: "rgba(0,0,0,0.3)",
        });
    });
    $("#content-read").bind("touchmove.body","div", function (event){
         $("body").css({
            background: "rgba(0,0,0,0.3)",
        });
    });
    $("#content-read").bind("touchend.body","div", function (event){
         $("body").css({
            background: "rgba(255,255,255,1)",
        });
    });
});
});     
}
/*---Back button click function---*/    
$(function(){   
     $(".back").click(function(){
   window.location=$(this).find("a").attr("href"); 
   return false;
});
});
/*---Animation---*/
$(function(){
    if(window.screen.width > 760){
    $('.item-page .col-md-7').addClass('wow');
    $('.item-page .col-md-7').addClass('zoomIn');
    $('.item-page .col-md-5').addClass('wow');
    $('.item-page .col-md-5').addClass('zoomIn');
    $('.blog').addClass('wow');
    $('.blog').addClass('zoomIn');
    $('.blog .span6').addClass('wow');
    $('.blog .span6').addClass('zoomIn');
    $('.sigProContainer').addClass('wow');
    $('.sigProContainer').addClass('zoomIn');
/*  $('.itemBody').addClass('wow');
    $('.itemBody').addClass('zoomIn');*/
    $(".sigProThumb").bind("mouseover","a", function (event){
        $('.sigProThumb a:hover').addClass('one-sigProThumb');
    });
    $(".sigProThumb").bind("mouseout","a", function (event){
         $("a.one-sigProThumb").removeClass('one-sigProThumb');
    });
    }
});     
$(function(){
       if(window.screen.width > 1000){  
            $(window).scroll(function(){
                if($(window).scrollTop()>100){
                $('.slider').addClass('hover');
                $('.slider.hover .slider-flipper ').css( {transform: "rotateX(360deg)"} );
                $('.slider-flipper').addClass('slider-flipper-hover');
                }
            });
        } 
});
})(jQuery);


     
     
     
 