
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


	// Subnav
	// $('.has-subnav').each( function() {
	// 	$(this).on('click', function() {
	// 		$(this).toggleClass('open');
	// 	});
	// });




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
	// Shrink nav on scroll
	// ----

	var $header = $('.header.-site');
	var headerHeight = $header.outerHeight();
	
	// Do these things when scrolling
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
		// lazyload: true,
		percentPosition: false
	});

	$('.thumb-slider').flickity({
		contain: true,
		wrapAround: true,
		imagesLoaded: true,
		pageDots: false
	});


});

