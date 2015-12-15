<?php
/**
 * The Template for displaying all single posts
 *
 *
 * @package  WordPress
 * @subpackage  Timber
 */

$data['sidebar'] = Timber::get_widgets('sidebar_projects');
$data['cats'] = Timber::get_terms('category');

Timber::render(array('sidebars/sidebar-projects.twig'), $data);

