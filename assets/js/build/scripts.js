/*global jQuery */
/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement('div');
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );




$(document).ready(function() {
	
	console.log('Check it: https://github.com/laras126/content-blocks-starter');


	// ----
	// Toggle Menu
	// ----

	// TODO: better fallback for non-JS - adding a .js class but it causes the nav to blink
	// Look into Modernizr for that

	var $menu = $('#menu'),
	    $menulink = $('.menu-link'),
	    $menuTrigger = $('.has-subnav > a');

	$menulink.on('click', function(e) {
		e.preventDefault();
		$menulink.toggleClass('open');
		$menu.toggleClass('open');
		return false;
	});

	$menuTrigger.click(function(e) {
		e.preventDefault();
		var $this = $(this);
		$this.toggleClass('open').next('ul').toggleClass('open');
	});
		

	// $.get("/taxonomies", function(data){
	// 	console.log(data);
	// });



	// ----
	// Submenu
	// ----

	// This jumps...will need to fix
	//  var scroll_class = 'stuck',
	// 	$nav = $('.content-nav'),
	// 	nav_ht = $nav.outerHeight(),
	// 	header_ht = $('.page-header').outerHeight() + $('.site-header').outerHeight(),
	// 	total_ht = header_ht;
  	

	// // 1. Highlight current item
	// // 2. Slide to current section on click
	// $('.content-nav a').not('.directional-icon').click( function() {

	// 	var hash = $(this).attr('href');
	// 	var $target = $(hash + ' .section-title');

	// 	// Slide to section corresponding to clicked hash
	// 	$('html,body').animate({
	// 		scrollTop: $target.offset().top - nav_ht*1.5
 //        }, 700);

	// 	return false;
	// }); // END click

	// $('.top-link a').on( 'click', function() {
	// 	var hash = $('#pageTop');
	// 	var $target = $(hash);

	// 	// Slide to section corresponding to clicked hash
	// 	$('html,body').animate({
	// 		scrollTop: $target.offset().top
 //        }, 700);

 //        return false;

	// });




	// // Highlight the current item according to position on the screen
	// // http://stackoverflow.com/questions/9979827/change-active-menu-item-on-page-scroll
	// // (continued below)
	
	// // Cache selectors
	// var topMenu = $(".content-nav"),
 //    topMenuHeight = topMenu.outerHeight()+40,
    
 //    // All list items
 //    menuItems = topMenu.find("a"),
    
 //    // Anchors corresponding to menu items
 //    scrollItems = menuItems.map(function(){
	// 	var item = $($(this).attr("href"));
 //      	if (item.length) { return item; }
 //    });



	// $(window).scroll( function() {

	// 	// Add the class to make the nav stick
	// 	if( $(this).scrollTop() > total_ht ) {

	// 		$nav.addClass(scroll_class);
	// 		$('.section-header').addClass('nav-stuck');
	// 		$('.top-link-bottom').fadeIn(300);
	// 		$('.content-nav-arrow').fadeOut(300);

	// 		$('.top-link-top').css({
	// 			'width': '50px',
	// 			'opacity': '1'
	// 		});
			
	// 	} else if( $(this).scrollTop() < total_ht ) {

	// 		$nav.removeClass(scroll_class);
	// 		$('.section-header').removeClass('nav-stuck');
	// 		$('.top-link-bottom').fadeOut(300);
	// 		$('.content-nav-arrow').fadeIn(300);
			
	// 		$('.top-link-top').css({
	// 			'width': '0',
	// 			'opacity': '0'
	// 		});
	// 	}


	// 	// Highlight the current item according to position on the screen
	// 	// http://stackoverflow.com/questions/9979827/change-active-menu-item-on-page-scroll
	
	// 	// Get container scroll position
   		
 //   		var fromTop = $(this).scrollTop()+topMenuHeight;

 //   		// Get id of current scroll item
 //   		var cur = scrollItems.map(function(){
 //     		if ($(this).offset().top < fromTop)
 //       			return this;
 //   		});
   
 //   		// Get the id of the current element
 //   		cur = cur[cur.length-1];
 //   		var id = cur && cur.length ? cur[0].id : "";
   		
 //   		// Set/remove active class
 //   		menuItems
 //     		.parent().removeClass("content-nav-active")
 //     		.end().filter("[href=#"+id+"]").parent().addClass("content-nav-active");
	
	// }); // END scroll




	// ----
	// Plugins
	// ----

	$('.site-main').fitVids();


	// ----
	// Misc
	// ----

	// Hack to keep out widows
	// http://css-tricks.com/preventing-widows-in-post-titles/
   
	// $('.item-title, .section-title, .main p, .lead').each( function() {
	// 	var wordArray = $(this).text().split(" ");
	// 	if (wordArray.length > 3) {
	// 		wordArray[wordArray.length-2] += "&nbsp;" + wordArray[wordArray.length-1];
	// 		wordArray.pop();
	//     	$(this).html(wordArray.join(" "));
	//   	}
	// });


});

