<?php
/**
 * The Template for displaying all single posts
 *
 *
 * @package  WordPress
 * @subpackage  Timber
 */

$data['widgets'] = Timber::get_widgets('footer_right');

Timber::render(array('sidebars/sidebar-footer_right.twig'), $data);
