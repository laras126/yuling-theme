
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
	$('.has-subnav').each( function() {
		$(this).on('click', function() {
			$(this).toggleClass('open');
		});
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
            	'max-height' : '20em'
            }, 500); 
          }
          
        return false;
      });



	// ----
	// Plugins
	// ----

	$('.main').fitVids();

	$('.slider').flickity({
		cellAlign: 'left',
		contain: true,
		imagesLoaded: true
	});

	$('.thumb-slider').flickity({
		contain: true,
		wrapAround: true,
		imagesLoaded: true,
		pageDots: false
	});


});

