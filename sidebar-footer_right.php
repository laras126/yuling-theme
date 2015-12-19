<?php
/**
 * The Template for displaying all single posts
 *
 *
 * @package  WordPress
 * @subpackage  Timber
 */

$data['widgets'] = Timber::get_widgets('footer_right');

// Social
$data['pinterest'] = get_field('pinterest', 'options');
$data['twitter'] = get_field('twitter', 'options');
$data['facebook'] = get_field('facebook', 'options');
$data['instagram'] = get_field('instagram', 'options');

$data['subscribe_to_mailchimp'] = get_field('subscribe_to_mailchimp', 'options');

Timber::render(array('sidebars/sidebar-footer_right.twig'), $data);
