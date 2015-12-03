<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /functions sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */


$context = Timber::get_context();
$post = Timber::query_post();
$context['post'] = $post;
$context['wp_title'] .= ' - ' . $post->title();
$context['comment_form'] = TimberHelper::get_comment_form();


// Adding some logic here - may be better in single-piece.php, but okay for now unless it gets more extensive.
if ( get_post_type() == 'piece') {
	$terms = get_the_terms($post->ID, 'collection');
	$piece_args = array(
		'post_type' => 'piece',
		'post__not_in' => array( $post->ID ),
		'posts_per_page' => -1,
		'tax_query' => array(
	        array(
	            'taxonomy' => 'collection', 
	            'terms' => $terms[0],
	            'field' => 'id', 
	            'operator' => 'IN'
	        )
	    )
	);
	$context['pieces'] = Timber::get_posts($piece_args);
	$context['concierge_text'] = get_field('concierge_text', 'options');
	// $context['form'] = FrmAppController::get_form_shortcode(array('id' => '4', 'key' => '', 'title' => false, 'description' => false, 'readonly' => false, 'entry_id' => false, 'fields' => '14'));
	$context['form'] = FrmFormsController::get_form_shortcode( 
		array( 
			'id' => 4, 
			'title' => false, 
			'description' => false
		) );
}

if (post_password_required($post->ID)){
	Timber::render('single-password.twig', $context);
} else {
	Timber::render(array('singles/single-' . $post->ID . '.twig', 'singles/single-' . $post->post_type . '.twig', 'singles/single.twig'), $context);
}


