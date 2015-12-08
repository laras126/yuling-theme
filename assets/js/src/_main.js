
$(document).ready(function() {
	
	// console.log('Check it: https://github.com/laras126/yuling-theme');



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
	$('.has-subnav > a').on('click', function(e) {
		$(this).toggleClass('active');
		$(this).next('.subnav-wrapper').toggleClass('active');
		e.preventDefault();
	});

	$('.main').on('click', function(e) {
		$('.subnav-wrapper').removeClass('active');
		$menu.removeClass('open');
	});






	// ----
	// Toggle Panels (detailed asides on single-piece)
	// ----

	var allTargets = $('.accordion-target');
              
	$('.accordion-trigger').on('click', function() {
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
              
	$('.share-trigger').on('click', function(e) {
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




	// ----
	// wishList
	// ----

	var isPiece = false;
	var supportsStorage = (('localStorage' in window) && window['localStorage'] !== 'null');
	// If localStorage is supported AND php_vars exists, otherwise print a message
	if (!supportsStorage) {
	
		alert('Sorry, your browser sucks.');
	
	} else {

		updateWishListCount();

		if (typeof php_vars !== 'undefined') { 
			isPiece = true;
			
			// TODO: consolidate this stuff and not have so many ifs.
			if (isPiece === true) {

				// If you aren't on a single piece page, define PHP vars.
				// TODO: there's definitely a more elegant solution for this...

				var currentItem = window.localStorage.getItem('wishListItem_' + php_vars.id);

				// Store piece number and name on submit
				// TODO: AJAX this
				$('#wishListForm').on('submit', function(e) {
					
					var piece = {
						'id': php_vars.id, 
						'title': php_vars.title, 
						'collection': php_vars.collection[0].name
					};

					piece.quantity = $('#quantity option:selected').val();
					window.localStorage.setItem('wishListItem_' + piece.id, JSON.stringify(piece));
					var updatedObj = JSON.parse(window.localStorage.getItem('wishListItem_' + piece.id));
					console.log(updatedObj);
					
					$('#wishListNotify').html('Updated').animate({opacity:1}, 300);

					updatewishListCount();
					e.preventDefault();
				});


				// Populate the hidden fields with piece and collection names
				$('#pieceName').val(php_vars.title);
				$('#pieceCollection').val(php_vars.collection[0].name);
				
				
				// console.log(retrievedObj.quantity);
				// console.log(typeof retrievedObj);
				if ( currentItem === null) {
					console.log('poop');
				} else {
					// TODO: need to account for quantity undefined - not sure why this logic isn't working.
					var retrievedObj = JSON.parse(window.localStorage.getItem('wishListItem_' + php_vars.id));

					markActiveWishList(retrievedObj);
					console.log(retrievedObj);

				}
			} // END isPiece logic
		} // END php_vars logic
	} // END localStorage check
});

function updateWishListCount() {

	if (window.localStorage.length != 0) {
		$('#wishListCount').html(window.localStorage.length);
		for(var i in window.localStorage) {
			var item = JSON.parse(window.localStorage[i]);
			console.log(item.title);
			$('#wishListItems').append(item.title + '<br>');
		}
	}
}

function markActiveWishList(obj) {
	$('#quantity option:selected').text(obj.quantity);
	$('#wishListSubmit').val('Update wishList');
	$('#wishListNotify').css('opacity', 1);
}
