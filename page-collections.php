<?php
/*
 * Template Name: Collections
 * Description: The template to show an archive of all collections.
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$context['terms'] = Timber::get_terms('collection');
Timber::render('pages/page-collections.twig', $context);