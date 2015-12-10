<?php
/**
 * The Template for displaying all single posts
 *
 *
 * @package  WordPress
 * @subpackage  Timber
 */

$data['sidebar'] = Timber::get_widgets('sidebar_blog');

Timber::render(array('sidebars/sidebar.twig'), $data);