
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
	$('.has-subnav > a').on('click', function(e) {
		$(this).toggleClass('active');
		$(this).next('.subnav-main').toggleClass('active');
		e.preventDefault();
	});

	$('.main').on('click', function(e) {
		$('.subnav-main').removeClass('active');
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

		if ($target.hasClass('active')) {
	    	$target.removeClass('active').animate({
	    		'max-height' : '0'
	    	}, 300);
	  	} else {

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
	// $('.archive-quote').removeClass('active');

	$(window).scroll(function() {

		$('.archive-images').each( function() {

			var banner_ht = $('.banner').outerHeight();
			var image_dist = ($(this).offset().top + banner_ht) - $(window).scrollTop(),
				win_height = $(window).height();

			if ( image_dist < win_height ) {

				// Get the data-title attribute of the images in the above height range
				var curr_att = $(this).attr('data-title');
				var $current = $('.archive-images[data-title="'+curr_att+'"]');

				// Clear all active classes
				$('.archive-quote').removeClass('active');

				// Reveal the corresponding quote
				$('.archive-quote[data-title="'+curr_att+'"]').addClass('active');

			} else if ( $(window).scrollTop() <= banner_ht ) {
				$('.archive-quote').removeClass('active');
			}

		});

	});




  // ----
	// Collections archive hover captions
	// ----

	$('.gallery-thumb').hover( function() {
		$(this).find('.-hoverable').animate({opacity: 1}, 300);
	}, function() {
		$(this).find('.-hoverable').animate({opacity: 0}, 300);
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


	// Spotlight tabbed thing on the home page
	// This click stuff if pretty similar to above - maybe consolidate those somehow.

	if ($(window).width() > 960) {

		$('.spotlight-tab').hover( function() {

			// Mark it as active
			$('.spotlight-tab').removeClass('active');
			$(this).addClass('active');

			switchSpotlightContent($(this));

			return false;

		});

	}


	// Very redundant here:

	$('.spotlight-prev').on('click', function() {
		var $active_tab = $('.spotlight-tab.active');
			$active_tab.toggleClass('active');

		// If there are previous tabs, toggle the class active
		if($active_tab.prev().length) {
			$active_tab.prev().addClass('active');
			switchSpotlightContent($active_tab.prev());
		} else {
			// Otherwise go back to the first item
			$('.spotlight-tab').last().addClass('active');
			switchSpotlightContent($('.spotlight-tab').last());
		}
		return false;
	});

	$('.spotlight-next').on('click', function() {
		var $active_tab = $('.spotlight-tab.active');
			$active_tab.toggleClass('active');

		// If there are next tabs, toggle the class active
		if($active_tab.next().length) {
			$active_tab.next().addClass('active');
			switchSpotlightContent($active_tab.next());
		} else {
			// Otherwise go back to the last item
			$('.spotlight-tab').first().addClass('active');
			switchSpotlightContent($('.spotlight-tab').first());
		}

		return false;
	});





	// ----
	// Plugins
	// ----

	$('.main').fitVids();

	$('.thumb-slider').flickity({
		cellAlign: "left",
		contain: true,
		wrapAround: true,
		imagesLoaded: true,
		pageDots: false,
		arrowShape: {
			x0: 10,
			x1: 60, y1: 50,
			x2: 65, y2: 45,
			x3: 20
	    }
	});






	// ----
	// Wish List
	// ----

	var isPiece = false;
	var supportsStorage = (('localStorage' in window) && window['localStorage'] !== 'null');
	// If localStorage is supported AND php_vars exists, otherwise print a message
	if (!supportsStorage) {

		alert('Please enable JavaScript to use the Wish List feature.');

	} else {

		updateWishListCount();

		// If on a Single Piece page with associated variable made available by WordPress
		if (typeof php_vars !== 'undefined') {

			isPiece = true;

			// On a Single Piece page with php_vars defined
			if (isPiece === true) {

				// Get the current piece item
				var currentItem = window.localStorage.getItem('wishListItem_' + php_vars.id);

				// Populate the hidden fields with piece and collection names
				$('#pieceName').val(php_vars.title);
				$('#pieceCollection').val(php_vars.collection);

				// Store piece number and name on submit
				$('#wishListForm').on('submit', function(e) {

					var piece = {
						'id': php_vars.id,
						'title': php_vars.title,
						'collection': php_vars.collection
					};

					// Update piece quantity in dropdown
					piece.quantity = $('#quantity option:selected').val();

					// Set the value in localStorage
					window.localStorage.setItem('wishListItem_' + piece.id, JSON.stringify(piece));

					// UI Notification
					$('#wishListNotify').animate({opacity:0}, 10)
										.html('Updated')
										.animate({opacity:1}, 300);

					// Update the Wish List number in the header
					updateWishListCount();

					// Do not refresh page
					e.preventDefault();
				});

				if ( currentItem !== null) {

					// If current item is in the Wish List, update it's status
					var retrievedObj = JSON.parse(window.localStorage.getItem('wishListItem_' + php_vars.id));
					markActiveWishList(retrievedObj);

				}
			} // END isPiece logic
		} // END php_vars logic




		// If there are Wish List items
		if (window.localStorage.length != 0) {

			// This should only be called on Concierge page, ideally
			for(var i=0; i < window.localStorage.length; i++) {
				var item = window.localStorage.getItem(localStorage.key(i));

				// If not null, add it to the Wish List table
				if (typeof item !== 'undefined' && item !== null) {
					populateWishListTable(JSON.parse(item));
				}
			}

			// Update or remove quantity value
			$('.edit-label').on('click', function(e) {

				var targetID = $(this).closest('form').attr('id');
				var targetEntry = JSON.parse(window.localStorage.getItem(targetID));

				// Populate input with current quantity

				// Show select
				var targetSelect = $(this).closest('tr')
						.find('.quantity-select')
						.fadeIn(300);
				$(this).closest('tr').find('.quantity-value').hide();

				// Show Save Changes btn
				// Add data-target with a value of targeted localstorage entry
				$('#saveChanges').fadeIn(300)
								.attr('data-target', targetID);

				e.preventDefault();
			});

			$('#saveChanges').on('click', function() {

				// Get the ID value from the data attribute on Save Changes
				var targetID = $('#saveChanges').attr('data-target');

				// Get the associated localstorage entry
				var targetEntry = JSON.parse(window.localStorage.getItem(targetID));

				// Get new number selection
				var newQuantity = $('#quantity_' + targetEntry.id + ' option:selected').val();

				// Update targetEntry quantity with new selection
				targetEntry.quantity = newQuantity;

				// Assign new targetEntry to a different variable - necessary, not sure why.
				var newEntry = targetEntry;

				// Save the new quantity
				window.localStorage.setItem(targetID, JSON.stringify(newEntry));

				// Get the selected option
				var newQuantity = $('#quantity_' + targetEntry.id + ' option:selected');

				// Get the associated quanitity select element
				var $targetSelect = $('#quantity_' + targetEntry.id);

				// Get the closes quantitiy value
				var $targetSpan = $targetSelect.closest('form').find('.quantity-value');

				// Hide the targeted select element and show the new quantity value
				$targetSelect.fadeOut(300);
				$targetSpan.html(newQuantity.val()).fadeIn(300);

				// Update the text area with the new count and the wishlist number in the top menu
				updateTextArea();
				updateWishListCount();

				// Reset the target on Save Changes button
				// Ideally this would happen when you start editing another item
				$('#saveChanges').attr('data-target', '');

			});


			$('.remove-label').on('click', function(e) {
				var targetID = $(this).closest('form').attr('id');
				var targetEntry = JSON.parse(window.localStorage.getItem(targetID));

				// Remove item from localStorage
				window.localStorage.removeItem(targetID);

				// Update the UI to indicate row removed
				$(this).closest('tr').addClass('row-removed');

				// Update the value of hidden textarea and header count
				updateTextArea();
				updateWishListCount();

				// console.log(window.localStorage);

				e.preventDefault();
			});

		} // END Wish List length check


	} // END localStorage check
});

















// ----
// Spotlight Content Switcher
// ----

function switchSpotlightContent($target) {
	// Replace the srcset value of the main image with that of the thumbnail's data-swap attribute
	var src = $target.find('.spotlight-tab-link').attr('data-src');
	var href = $target.find('.spotlight-tab-link').attr('data-target');
	var $target_content = $(href);

	// May want to integrate this with lazyload instead
	$('.spotlight-tab-content').html('<img class="spotlight-img" src="' + src + '">');
	$('.spotlight-img').load(function() {
		$(this).animate({opacity: 1}, 150);
	})
}





// ---
// Update the Wish List count in header
// ---

function updateWishListCount() {

	// Show the number of items in localStorage in the header wishlist number
	if (window.localStorage.length != 0) {
		$('#wishListCount').html(window.localStorage.length);
	}

}


// ---
// Populate the Wish List table
// ---

function populateWishListTable(item) {

	if (window.localStorage.length != 0) {

		// Markup for editing the item's quantity or removing it from localStorage
		var editFormMarkup = '<form class="edit-quantity-form" id="wishListItem_' + item.id + '">';

			// Quantity select
			editFormMarkup += '<span class="quantity-value">' + item.quantity + '</span>';
			editFormMarkup += '<select id="quantity_' + item.id + '" class="quantity-select"><option value="25">25</option><option value="50">50</option><option value="75">75</option><option value="100">100</option><option value="125">125</option><option value="150">150</option><option value="175">175</option><option value="200">200</option><option value="225">225</option><option value="250">250</option><option value="275">275</option><option value="300">300</option><option value="325">325</option><option value="350">350</option><option value="375">375</option><option value="400+">400+</option></select>';

			// Edit Radio
			editFormMarkup += '<input type="radio" name="edit_quantity_' + item.id + '" id="editRadio_' + item.id + '">';
			editFormMarkup += '<label class="edit-label" for="editRadio_' + item.id + '">Edit</label>'

			// Remove Radio
			editFormMarkup += '<input name="edit_quantity_' + item.id + '" id="removeRadio_' + item.id +'" type="radio">';
			editFormMarkup += '<label class="remove-label" for="removeRadio_' + item.id +'">Remove</label></form>';


		// Assemble the table markup
		var title = '<td class="item-title">' + item.title + '</td>',
			collection = '<td class="item-collection">' + item.collection + '</td>',
			quantity = '<td class="item-quantity">' + editFormMarkup + '</td>';

		// Update the Wish List header text to indicate there are items.
		// These values come from fields in the CMS and are printed inside a data attr.
		var has_items_title = $('#wishListTitle').attr('data-has-items');
		var has_items_prompt = $('#wishListPrompt').attr('data-has-items');

		$('#wishListTitle').html(has_items_title);
		$('#wishListPrompt').html(has_items_prompt);

		// Add item to table
		$('#wishListItems').append('<tr>' + collection + title + quantity + '</tr>');

		// Fill hidden Wish List text area with content
		$('.wishlist-fill textarea').append(item.collection + ': ' + item.title + ', ' + item.quantity + '; ');

	} else {
		$('#wishListItems').remove();
	}
}



// ---
// Update the hidden text area to record values on form submission
// ---

function updateTextArea() {

	$('.wishlist-fill textarea').html('');

	for(var i=0; i < window.localStorage.length; i++) {

		var item = JSON.parse(window.localStorage.getItem(localStorage.key(i)));
		$('.wishlist-fill textarea').append(item.collection + ': ' + item.title + ', ' + item.quantity + ' || ');

	}

}



// ---
// Update the Wish List UI when piece quantity is changed
// ---

function markActiveWishList(obj) {
	$('#quantity option:selected').text(obj.quantity);
	$('#wishListSubmit').val('Update wishList');
	$('#wishListNotify').css('opacity', 1);
}


