/*jslint browser: true*/
/*global $, console*/

/* --- Start --- */
	// Variable For Change Background-color Of Navbar(Light / Dark Style)
	var bgColorNavbar = "#f1f1f1";

	// Function For Change Background-color Of Navbar(Light / Dark Style)
	function changeBgNavbar(){
	
    let header = $('#header');
	
    if($(document).scrollTop() > 10){
        header.find('.wrap').css({backgroundColor: bgColorNavbar}).addClass('onScroll');
    }else{
        header.find('.wrap').css({backgroundColor: "transparent"}).removeClass('onScroll');
    }
}
/* --- End --- */


// Function For Ticker Main Header
function tickerH1(){
	"use strict";
	let elm 	= $(".home .item.swiper-slide-active h1 span"),
		text  	= elm.text(),
		lenght  = text.length,
		state 	= true,
		sign  	= -1,
		intv = setInterval(function(){
				
			elm.text(text.substring(0, lenght));			
			if(lenght <= 0 && state === true){
				
				let textChange = elm.attr("data-header");
				elm.attr("data-header", text);
				text = textChange;
				sign = 1;
				state = false;
			}
			
				if(!state && lenght === text.length)
					clearInterval(intv);
			lenght +=sign;		
	}, 100);
	
}

// Function For Counter Numeric (Facts Section)
 function counterup(elm, startVal, endVal){
    
	var numAnim = new CountUp(elm, startVal, endVal, 0, 4);
	 
	if (!numAnim.error) {
		numAnim.start();
	} else {
		console.error(numAnim.error);
	}
}

/* --- Start --- */
	// Function For Change Number OF slides PerView Of Team
	function slide(slidesPerViewTeam){
	
	//Initialize Swiper When Document Ready
    var mySwiper2 = new Swiper ('.swiper-container2', {
						
    	// Optional parameters
    	effect : 'slide',
		loop: true,
    	speed: 1200,
    	autoplay: {
    		delay: 5000,
  		},
   		spaceBetween: 0,
    	slidesPerView: slidesPerViewTeam,
    	pagination: {
    		  el: '.swiper-pagination',
    		  clickable: true
    	}
    	
    });
}

	// Variable For Width Of The Window
	var fullWidth;

	// Function For Get Number OF slides PerView Of Team
	function getNumSlide() {
	
		var slidesPerViewTeam ;
		
		fullWidth = $(window).outerWidth();
		
		switch(true) {
		
			case (fullWidth >= 992) : slidesPerViewTeam = 4; break;
			case (fullWidth < 992 && fullWidth >= 768) : slidesPerViewTeam = 3; break;
			case (fullWidth < 768 && fullWidth >= 576) : slidesPerViewTeam = 2; break;
			case (fullWidth < 576) : slidesPerViewTeam = 1; break;
			default: break;
		}
	
		return slidesPerViewTeam;
	}
/* --- End --- */

// Execute The Slider Team
slide(getNumSlide());

// lOADING
	//Window On load
	$(window).on('load', function(){
		
		$('.sk-cube-grid').fadeOut(1000, function(){
		
			$('body').css({overflow : 'auto'});
			$('.loading').slideUp(1000);
		});	
		
	});

//-------------------------------------------------------------------


/* --- Start Ready Document --- */
$(function(){ // On Load
	
	// Trigger Auto Write Main Header
	setInterval(tickerH1, 10000);
	
    changeBgNavbar(); // Called Function For Change Background-color Of Navbar(Light / Dark Style)
    
    // Scroll To Sections Of Navbar Links
    $('#header .nav-link').click(function (){
		
         var elm = $(this).attr("href").substr(1);
		
         $('html,body').animate({
            scrollTop: ($("#" + elm).offset().top + 5) + "px"
         },1000);
    });
    
   /* -- Start -- */
	 var status = 0;

	// Scroll Event 
    $(document).scroll(function(){
		
       	changeBgNavbar();  // Called Function For Change Background-color Of Navbar(Light / Dark Style)
		
		// Scroll Btn To Go Up
		if($(this).scrollTop() >1000) {
			$('.btn-toUp').fadeIn(500);
		}else {
			$('.btn-toUp').fadeOut(500);
		}
        
        //run counter fact
        if(($(this).scrollTop() + ($(window).height()/2)) > $('.facts').offset().top && status === 0){
            
            status = 1,
				elements = document.getElementsByClassName("SomeElementYouWantToAnimate");
			console.log(elements);
            for(let i = 0; i < elements.length; i++){
				
            counterup(elements[i], elements[i].getAttribute("data-startval"), elements[i].getAttribute("data-endval"));
            }
           
           }
    });
   /* -- End -- */
	
    // Button For Show / Hide Navbar In Mobile Screen And Small Screen
    $('.btn-nav,.header .close').click(function(){
        
        var nav = $('.header .pushmenu'); // Get Small Navbar (.pushmenu)
		
        if(nav.is('.show')){ // If Small Navbar Is Show
			
            nav.css({ // Hide Small Navbar
                transition: "all .8s ease-in-out",
                transform:"scale(0.2,0.2) translate(100%, -600px)",
                opacity:0
            });
			
            setTimeout(function(){
                nav.css("display", "none").removeClass('show');
            },1000);
			
        }else{ // If Small Navbar Is Hide
			
            nav.removeClass("d-none"); // Show Small Navbar
            nav.show(0).css({ 
                transition: "all .8s ease-in-out",
                 transform:"scale(1,1) translate(0, 0)",
                opacity:1
            }).addClass('show');
            
        }
    });
    
	
	// **** -- Start Setting Of Edit Box -- **** \\
	
    	// Show Or Hide Edit Box Page
    	$('.btn-choose-style').click(function(){
		
        var editBox = $(this).parents('.box-edit'), // Get Edit Box
            offsetLeft = 0; // Set Intial Value Of Edit Box Left
		
        if(editBox.offset().left === 0) {
            offsetLeft = -editBox.innerWidth();
		}
		
        editBox.animate({
			
            left:offsetLeft + "px"
			
        },400);
		
    });
	
    	// Change Font family For Headers (h1/h2...)
    	$(".box-edit .hidden").change(function(){
    	    $(':header').css({fontFamily: $(this).val()});
    	});
		
    	 // Change Font family For Paragraphs
    	$(".box-edit .paragraph").change(function(){
    	    $("p").css({fontFamily: $(this).val()});
    	});
		
    	// Change Style (Light / Dark)
    	$("#bgColorControl> span").click(function(){
			
    	   $("#bgColor").attr("href", $(this).data("backgroundcolor")); // Add Style Link Of Page (Light / Dark)
			
    	    if($(this).is(".bg-dark"))// Add Background Color For Navbar
    	        bgColorNavbar = "#141d26";
    	    else
    	         bgColorNavbar = "#f1f1f1";
			
    	    changeBgNavbar(); // This Function Is Above
    	});
    	
		// Change Main Color
		var state = true; // Variable For Check If Write Color Or Add Color (Plus Icon / Check Icon)
		const patern = /^#(([0-9 a-f]){3}|([0-9 a-f]){6}|([0-9 a-f]){8})$/i; // For Check If Syntax of Name Color Is Correct
		
		$('.btn-add-color').on('click', function() {
			
			if(state == true) {
				
				$('.btn-add-color i').removeClass('fa-plus').addClass('fa-check');
				$('.box-add-color input').css({width : '70%' });
				
				state = false;
				
			}
			else
			{
				
				var spnColor = $('.box-add-color input').val(); // Get Value Color Of Span From Input

				
				
				if(spnColor.trim().match(patern)){
					
					$('.box-edit .spans').append('<span class="d-inline-block" style = "background-color  : '+spnColor+'"></span>'); // Add New Color As Span Element
					
					// Convert Hex Color To Rgba() Color And Put The Value In The Variable colorRgb
					var colorRgb = $('.box-edit .spans span:last-child');

					document.documentElement.style.setProperty('--mainColor', colorRgb.css("backgroundColor"));
				
					document.documentElement.style.setProperty('--backgroundColor1', 'rgba('+colorRgb.css("backgroundColor").substr(4,colorRgb.css("backgroundColor").length-5)+',0.3)');
				
					document.documentElement.style.setProperty('--backgroundColor2', 'rgba('+colorRgb.css("backgroundColor").substr(4,colorRgb.css("backgroundColor").length-5)+',0.8)');
				
					document.documentElement.style.setProperty('--borderColor', 'rgba('+colorRgb.css("backgroundColor").substr(4,colorRgb.css("backgroundColor").length-5)+',0.4)');

					
				}
				
				$('.box-add-color input').css({ 
					width : '0',
				}).val('  #'); // Hide Input
				
				$('.btn-add-color i').removeClass('fa-check').addClass('fa-plus'); // Change Icons (Plus / Check)
				
				state = true;		
			}
			
		});
    	
		// Change Main Color
    	$(".spans").on('click', 'span', function(){
	
			document.documentElement.style.setProperty('--mainColor', $(this).css('backgroundColor'));
			
			document.documentElement.style.setProperty('--backgroundColor1', 'rgba('+$(this).css('backgroundColor').substr(4,$(this).css('backgroundColor').length-5)+',0.3)');
			
			document.documentElement.style.setProperty('--backgroundColor2', 'rgba('+$(this).css('backgroundColor').substr(4,$(this).css('backgroundColor').length-5)+',0.8)');
			
			document.documentElement.style.setProperty('--borderColor', 'rgba('+$(this).css('backgroundColor').substr(4,$(this).css('backgroundColor').length-5)+',0.4)');
			
    	});
		
		// Delete Color
		
		/* -- Start -- */
		var span;  // Variable For Set On It a Span
		$(".spans").on('dblclick', 'span', function(){ // Double Click For Show The Box Of Deleting Color
			
			span = $(this); // Set Span Of Color On The Variable
			
			$('.delete-color').css({ // Set The coordinates For The Box Of Deleting Color
				
				left : (span.position().left - 20)+'px',
				top : (span.position().top - 45)+'px'
				
			}).fadeIn(400); // And Show It
			
		});
		
		$(".delete-yes").on('click', function(){
			
			$('.delete-color').fadeOut(100);  // Hide The Box Of Deleting Color And
			span.remove(); // Delete a Span Of Color
			
		});
		
		$(".delete-no").on('click', function(){
			
			$('.delete-color').fadeOut(200); // Just Hide The Box Of Deleting Color
			
		});
		/* -- End -- */
	
	// **** -- End Setting Of Edit Box -- **** \\
	
    
    // Initialize Swiper When Document Ready (Main Section)
	/** Start **/
    var mySwiper = new Swiper ('.swiper-container', {
		
      	// Optional parameters
		
      	direction: 'vertical',
      	loop: true,
      	speed: 1200,
      	effect: "coverflow",
      	simulateTouch:true,
      	delay:1000,
      	  
      	pagination: {
			  
      	  	el: '.swiper-pagination',
      	  	type: 'bullets',
      	  	clickable: true,
      	  	bulletElement:"div"
      	},
			
      	navigation: {
      	    nextEl: '.swiper-button-next',
      	    prevEl: '.swiper-button-prev'
      	},
			
      	autoplay: {
    		delay: 15000
  	  	}

    });
    $('.swiper-pagination-bullet').append($('<span></span>'));
	/** End **/
	
	// Initialize Swiper When Document Ready (Work With Section)
	var mySwiper3 = new Swiper ('.swiper-container3', {
						
    	  	// Optional parameters
		
            effect : 'slide',
			loop: true,
      		speed: 1200,
      		autoplay: {
    			delay: 5000
  	  		},
    	    spaceBetween: 0,
    	    slidesPerView: 6
	
		});
	
	
	// Resize Windows (For Change SlidesPerView Of Team Slider)
	$(window).resize(function(){
		
		// Get Width Of Window
		fullWidth = $(window).outerWidth();
		
		// Called Function Of Team Slider
		slide(getNumSlide());
		
	});
	
    
    // Trigger The Blugin Wow
	new WOW().init();
	
	
	// Trigger Nice Scrool Blugin
	$('html').niceScroll({
		
		cursorcolor : '#777',
		cursorwidth : '10PX',
		cursorminheight:  150,
		cursorborder: '1px solid #777',
		smoothscroll: true,
		scrollspeed : 80
	});
	
	// Trigger The Mixitup Plugin
    var mixer = mixitup('.gallery-box');
	
	// Changing The Works Button
    $(".works .btns button").click(function (){
		
        $(this).addClass("selected").siblings().removeClass("selected");

    });
	
		
	// Button Scroll To Up
	$('.btn-toUp').on('click', function(){
		$('body, html').animate({scrollTop : 0}, 1500);
	});
    
	
	// Animate Placeholder Of Contact Inputs To Above (Focus)
    $('.custom-input').focus(function(){
		
		$(this).siblings('label').animate({
			top : '4px',
			left : '0px'
		}, 700);
	});
	
	
    // Animate Placeholder Of Contact Inputs To Down (Blur)
    $('.custom-input').blur(function(){
		
         if($(this).val() === ""){
			 
              $(this).siblings('label').animate({
                    top : '2.3rem',
                    left : '12px'
              }, 500);   
         }
	});
	
});
/* --- End Ready Document --- */






















