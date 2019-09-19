(function ($) {
/*---Initialization custom scrollbar---*/

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
/*---Back button click function---*/    
$(function(){   
     $(".back").click(function(){
   window.location=$(this).find("a").attr("href"); 
   return false;
});
});     
})(jQuery);


     
     
     
 