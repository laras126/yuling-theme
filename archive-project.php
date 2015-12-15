<?php
/**
 * The template for displaying Archive pages.
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * Methods for TimberHelper can be found in the /functions sub-directory
 *
 * @package 	WordPress
 * @subpackage 	Timber
 * @since 		Timber 0.2
 */

		$templates = array('archives/archive.twig');

		$data = Timber::get_context();

		$data['title'] = 'Projects';
		$data['link'] = get_post_type_archive_link('project');
		$data['sidebar'] = Timber::get_sidebar('sidebar-projects.php');

		array_unshift($templates, 'archives/archive-'.get_post_type().'.twig');

		$cat_args = array(
			'orderby' => 'name',
			'order' => 'ASC'
		);

		$categories = get_categories();
		
		// http://stackoverflow.com/questions/1780386/looping-through-wordpress-categories

		$data['posts'] = Timber::get_posts();

		Timber::render($templates, $data);

