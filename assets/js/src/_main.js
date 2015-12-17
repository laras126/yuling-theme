
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
			
			// This should only be called on Concierge page, ideally
			for(var i in window.localStorage) {
				var item = JSON.parse(window.localStorage[i]);
				populateWishListTable(item);
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

				console.log(targetID);
				// return targetID;
				e.preventDefault();
			});

			$('#saveChanges').on('click', function() {
				
				// Get the ID value from the data attribute on Save Changes
				var targetID = $('#saveChanges').attr('data-target');
				
				// Get the associated localstorage entry
				var targetEntry = JSON.parse(window.localStorage.getItem(targetID));
	
				var newQuantity = $('#quantity_' + targetEntry.id + ' option:selected').val();
				// Update targetEntry quantity
				targetEntry.quantity = newQuantity;

				var newEntry = targetEntry;

				// Save the new quantity
				window.localStorage.setItem(targetID, JSON.stringify(newEntry));
				
				var newQuantity = $('#quantity_' + targetEntry.id + ' option:selected');

				var $targetSelect = $('#quantity_' + targetEntry.id);

				var $targetSpan = $targetSelect.closest('form').find('.quantity-value');

				$targetSelect.fadeOut(300);
				$targetSpan.html(newQuantity.val()).fadeIn(300);
				
				updateTexarea();
				updateWishListCount();

				// Reset the target on Save Changes button
				// Ideally this would happen when you start editing another item
				$('#saveChanges').attr('data-target', '');
				
			});


			// // $('#updateQuantity').on('click', function() {
			// // 	var targetID = $(this).closest('form').attr('id');
			// // 	var targetEntry = JSON.parse(window.localStorage.getItem(targetID));
			// // 	targetEntry.quantity = $('.edit-quantity-field').val();
				
			// // 	console.log('targetEntry'); 
				
			// // });


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

			// Quantity select
			editFormMarkup += '<span class="quantity-value">' + item.quantity + '</span>';
			editFormMarkup += '<select id="quantity_' + item.id + '" class="quantity-select"><option value="25">25</option><option value="50">50</option><option value="75">75</option><option value="100">100</option><option value="125">125</option><option value="150">150</option><option value="175">175</option><option value="200">200</option><option value="225">225</option><option value="250">250</option><option value="275">275</option><option value="300">300</option><option value="325">325</option><option value="350">350</option><option value="375">375</option><option value="400+">400+</option></select>';

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
			quantity = '<td class="item-quantity">' + editFormMarkup + '</td>';

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


