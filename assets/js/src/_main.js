
$(document).ready(function() {
	
	console.log('Check it: https://github.com/laras126/yuling-theme');



	// ----
	// Toggle Menu
	// ----

	// TODO: better fallback for non-JS - adding a .js class but it causes the nav to blink
	// Look into Modernizr for that

	var $menu = $('#toggleNav'),
	    $menulink = $('#navOpenLink');

	$menulink.on('click', function(e) {
		$menulink.toggleClass('open');
		$menu.toggleClass('open');
		e.preventDefault();
	});

	// Subnav
	$('.has-subnav').on('click', function(e) {
		$(this).toggleClass('active');
		$(this).find('.subnav-wrapper').toggleClass('active');
		e.preventDefault();
	});

	// $('.has-subnav').hover(function() {
	// 	$(this).find('.subnav-wrapper')
	// 			.animate({
	// 				'max-height': '32em', 
	// 				'opacity': 1
	// 			}, 50);
	// }, function(){
	// 	$(this).find('.subnav-wrapper')
	// 			.animate({
	// 				'max-height': '0', 
	// 				'opacity': 0
	// 			}, 50);
	// });

	$('.main').on('click', function(e) {
		$('.subnav-wrapper').removeClass('active');
		$menu.removeClass('open');
	});



	// ----
	// Toggle Panels (detailed asides on single-piece)
	// ----

	var allTargets = $('.accordion-target');
              
	$('.accordion-trigger').click(function() {
		$this = $(this);
		$target =  $this.next('.accordion-target');

		$this.toggleClass('active');
		$('.accordion-trigger').not($this).removeClass('active');

		if ($target.hasClass('active')) {
	    	$target.removeClass('active').animate({
	    		'max-height' : '0'
	    	}, 300); 
	  	} else {
	    
	    allTargets.removeClass('active');
	    
	    $target.addClass('active').animate({
	    	'max-height' : '100em'
	    }, 500); 
	  }
	  
		return false;
	});




	// ----
	// Share Social Links
	// ----
              
	$('.share-trigger').click(function(e) {
		e.preventDefault();
        $this = $(this);
        $target =  $this.next('.social-list');

        $this.toggleClass('active');
        $target.toggleClass('visually-hidden');
          
        return false;
	});



    // ----
	// Reveal and Rotate Quotes on Scroll (Collections page)
	// ----

	// Clear all quotes
	$('.archive-quote').removeClass('active');

	$(window).scroll( function() {

		$('.archive-images').each( function() {
			
			var image_dist = ($(this).offset().top - $(this).outerHeight()/2) - $(window).scrollTop(),
				win_height = $(window).height();

			if ( image_dist < win_height ) {

				// Get the data-title attribute of the images in the above height range
				var curr_att = $(this).attr('data-title');
				var $current = $('.archive-images[data-title="'+curr_att+'"]');
				
				// Clear all active classes
				$('.archive-quote').removeClass('active');

				// Reveal the corresponding quote
				$('.archive-quote[data-title="'+curr_att+'"]').addClass('active');
			} 

		});

	});



    // ----
	// Single Piece Detail Image Swap
	// ----

	// Call magnify only for larger devices
	if ($(window).width() > 768) {
		$('.magnify').magnify();
	}
	
	// Add active class to first thumb
	$('.piece-thumb').first().addClass('active');

	// When a thumbnail is clicked:
	$('.piece-thumb').on('click', function() {

		// Mark it as active
		$('.piece-thumb').removeClass('active');
		$(this).addClass('active');

		// Replace the srcset value of the main image with that of the thumbnail's data-swap attribute
		$('#swapTarget')
			.attr('srcset', $(this).attr('data-swap'))
			.attr('data-magnify-src', $(this).attr('data-zoom'));
		
		// Remagnify
		if ($(window).width() > 768) {
			$('.magnify').magnify();
		}

	});



    // ----
	// Shrink nav on scroll
	// ----

	var $header = $('.header.-site');
	var headerHeight = $header.outerHeight();
	
	// Do these things when scrolling
	// TODO: I think this is messing and adding the black lines. Es posible.
	$(window).scroll( function() {

		if ( $(this).scrollTop() > headerHeight ) {
			$header.addClass('shrunk');
		} else {
			$header.removeClass('shrunk');
		}
		
	});
	


	// ----
	// Plugins
	// ----

	$('.main').fitVids();


	$('.slider').flickity({
		imagesLoaded: true,
		pageDots: false,
		wrapAround: true,
		lazyload: true
		// percentPosition: false
	});

	$('.thumb-slider').flickity({
		contain: true,
		wrapAround: true,
		imagesLoaded: true,
		pageDots: false
	});


});

