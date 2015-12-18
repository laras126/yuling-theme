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
$data['industries'] = Timber::get_terms('industry');

$data['projects_industry_list_title'] = get_field('projects_industry_list_title', 'options');
$data['projects_category_list_title'] = get_field('projects_category_list_title', 'options');
$data['projects_sidebar_categories'] = get_field('projects_sidebar_categories', 'options');


Timber::render(array('sidebars/sidebar-projects.twig'), $data);

