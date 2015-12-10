<?php
/**
 * The Template for displaying all single posts
 *
 *
 * @package  WordPress
 * @subpackage  Timber
 */

$data['sidebar'] = Timber::get_widgets('sidebar_projects');
$data['sidebar_type'] = 'projects';

Timber::render(array('sidebars/sidebar.twig'), $data);

