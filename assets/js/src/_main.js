
$(document).ready(function() {
	
	console.log('Check it: https://github.com/laras126/yuling-theme');



	// ----
	// Toggle Menu
	// ----

	// TODO: better fallback for non-JS - adding a .js class but it causes the nav to blink
	// Look into Modernizr for that

	var $menu = $('#toggleNav'),
	    $menulink = $('#navOpenLink'),
	    $menuTrigger = $('.has-subnav > a');

	$menulink.on('click', function(e) {
		$menulink.toggleClass('open');
		$menu.toggleClass('open');
		e.preventDefault();
	});

	$menuTrigger.click(function(e) {
		e.preventDefault();
		var $this = $(this);
		$this.toggleClass('open').next('ul').toggleClass('open');
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
	// Reveal Quotes on Scroll (Collections page)
	// ----

	$('.archive-quote').removeClass('active');

	$(window).scroll( function() {

		// When next section image hits scroll top move active class to sibling
		// $('.archive-quote').first().addClass('active');

		$('.archive-images').each( function() {
			
			var image_dist = $(this).offset().top - $(window).scrollTop(),
				win_height = $(window).height();

			if ( image_dist < win_height ) {

				var curr_att = $(this).attr('data-title');
				var $current = $('.archive-images[data-title="'+curr_att+'"]');
				
				$('.archive-quote').removeClass('active');
				$('.archive-quote[data-title="'+curr_att+'"]').addClass('active');

				// if ($(this).is(':last-child')) {
				// 	$('.archive-quote[data-title="'+curr_att+'"]').removeClass('active').addClass('active-last');
				// }
			}

		});

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
	
	// Maybe not ideal
	if ($(window).width() > 768) {
		$('.magnify').magnify();
	}

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

