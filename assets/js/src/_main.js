
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
	$('.spotlight-tab').on('click', function() {

		// Mark it as active
		$('.spotlight-tab-content').removeClass('active');
		$(this).addClass('active');

		// Replace the srcset value of the main image with that of the thumbnail's data-swap attribute
		var src = $(this).find('.spotlight-tab-link').attr('data-src');
		var href = $(this).find('.spotlight-tab-link').attr('href');
		var $target_content = $(href);

		// May want to integrate this with lazyload instead
		$('.spotlight-main').html('<img src="' + src + '">');

		$(this).addClass('active');

		return false;

	});



	// ----
	// Plugins
	// ----

	$('.main').fitVids();

	// $('.slider').flickity({
	// 	imagesLoaded: true,
	// 	pageDots: false,
	// 	wrapAround: true,
	// 	lazyload: true
	// 	// percentPosition: false
	// });

	$('.thumb-slider').flickity({
		contain: true,
		wrapAround: true,
		imagesLoaded: true,
		pageDots: false
	});




	// ----
	// Wish List
	// ----

	var isPiece = false;
	var supportsStorage = (('localStorage' in window) && window['localStorage'] !== 'null');
	// If localStorage is supported AND php_vars exists, otherwise print a message
	if (!supportsStorage) {
	
		alert('Sorry, your browser sucks.');
	
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
				$('#pieceCollection').val(php_vars.collection[0].name);
				
				// Store piece number and name on submit
				$('#wishListForm').on('submit', function(e) {
					
					var piece = {
						'id': php_vars.id, 
						'title': php_vars.title, 
						'collection': php_vars.collection[0].name
					};

					// Update piece quantity in dropdown
					piece.quantity = $('#quantity option:selected').val();

					// Set the value in localStorage
					window.localStorage.setItem('wishListItem_' + piece.id, JSON.stringify(piece));
					
					// UI Notification
					$('#wishListNotify').html('Updated').animate({opacity:1}, 300);

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
			
			for(var i in window.localStorage) {
				var item = JSON.parse(window.localStorage[i]);
				populateWishListTable(item);
			}

			// $('#wishListItems').on('click', function() {
			// 	$('.save-changes').fadeIn(300);
			// });

			$('#saveChangesBtn').on('click', function() {
				// console.log('hi');
				
			});

			// Update or remove quantity value
			$('.edit-label').on('click', function(e) {
				var prevValue = $(this).closest('tr').find('.quantity-value').html();
				
				// Populate input with current quantity
				$(this).closest('tr')
						.find('.quantity-value')
						// .html('<input type="number" class="edit-quantity-field" value="' + prevValue + '"><span id="updateQuantity">Update</span>');
						.html('<input type="number" class="edit-quantity-field" value="' + prevValue + '">');

				$('#saveChanges').fadeIn(300);

				// Hide the current quantity
				// $(this).closest('tr')
				// 	.find('.quantity-value')
				// 	.hide();

				// // Show the editing options
				// var editingHTML = $(this).closest('tr')
				// 	.find('#isEditing').html();

				// $(this).closest('tr')
				// 	.find('.edit-quantity-form')
				// 	.html(editingHTML);

				e.preventDefault();
			});


			// $('#updateQuantity').on('click', function() {
			// 	var targetID = $(this).closest('form').attr('id');
			// 	var targetEntry = JSON.parse(window.localStorage.getItem(targetID));
			// 	targetEntry.quantity = $('.edit-quantity-field').val();
				
			// 	console.log('targetEntry'); 
				
			// });


			$('.remove-label').on('click', function(e) {
				var targetID = $(this).closest('form').attr('id');
				var targetEntry = JSON.parse(window.localStorage.getItem(targetID));

				// Remove item from localStorage
				window.localStorage.removeItem(targetID);					
				
				// Update the UI to indicate row removed
				$(this).closest('tr').addClass('row-removed');

				// Update the value of hidden textarea and header count
				updateTexarea();
				updateWishListCount();

				console.log(window.localStorage);
				
				e.preventDefault();
			});

			// $('.expects-save').on('click', function(e) {
			// 	var targetID = $(this).closest('form').attr('id');
			// 	var targetEntry = window.localStorage.getItem(targetID);


			// 	$(this).html('Edit').attr('class', 'edit-label');
			// 	;

			// 	// $(this).closest('tr').find('.quantity-value').css('background','green');
			// 	console.log('saved');

			// 	e.preventDefault();
			// });

		} // END Wish List length check

	} // END localStorage check
});
























// ---
// Update the Wish List count in header
// ---

function updateWishListCount() {

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

			// Edit Radio
			editFormMarkup += '<input type="radio" name="edit_quantity_' + item.id + '" id="editRadio_' + item.id + '">';
			editFormMarkup += '<label class="edit-label" for="editRadio_' + item.id + '">Edit</label>'

			// Remove Radio
			editFormMarkup += '<input name="edit_quantity_' + item.id + '" id="removeRadio_' + item.id +'" type="radio">';
			editFormMarkup += '<label class="remove-label" for="removeRadio_' + item.id +'">Remove</label></form>';
		

		// var isEditingMarkup = '<span id="isEditing"><input type="number" class="edit-quantity-field" value="">';
		// 	isEditingMarkup += '<span id="updateValue" class="editing-update">Update</span> <span id="cancelUpdate" class="editing-cancel">Cancel</span></span>';
				

		var title = '<td class="item-title">' + item.title + '</td>',
			collection = '<td class="item-collection">' + item.collection + '</td>',
			quantity = '<td class="item-quantity"><span class="quantity-value">' + item.quantity + '</span>' + editFormMarkup + '</td>';

		// Update the Wish List header text to indicate there are items
		$('#wishListTitle').html('In Your Wish List');
		$('#wishListPrompt').html('Complete the email form below to receive a price quote for these items.');

		// Add item to table
		$('#wishListItems').append('<tr>' + collection + title + quantity + '</tr>');

		// Fill hidden Wish List text area with content
		$('.wishlist-fill textarea').append(item.collection + ': ' + item.title + ', ' + item.quantity + ' || ');

	} else {
		$('#wishListItems').remove();
	}
}



// ---
// Update the hidden text area to record values on form submission
// ---

function updateTexarea() {
	$('.wishlist-fill textarea').html('');
	for(var i in window.localStorage) {
		var item = JSON.parse(window.localStorage[i]);
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


