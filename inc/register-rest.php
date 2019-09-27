<?php

namespace TAMACHI;
use WP_Query;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

/**
 * Register menu route.
 */
add_action( 'rest_api_init', __NAMESPACE__ . '\register_route_menu' );
function register_route_menu() {

	register_rest_route(
		'tamachi/v1',
		'/menu',
		array(
			'methods'  => 'GET',
			'callback' => __NAMESPACE__ . '\get_menu',
		)
	);
}

/**
 * Return a menu given its name.
 *
 * @return Menu[] | null
 */
function get_menu( $request ) {

	$data = $request->get_params();

	if ( empty( $data['menu_name'] ) ) {
		return null;
	}

	$menu_locations = get_nav_menu_locations();

	if ( empty( $menu_locations[ $data['menu_name'] ] ) ) {
		return null;
	}

	$menu = wp_get_nav_menu_object( $menu_locations[ $data['menu_name'] ] );

	return wp_get_nav_menu_items( $menu->term_id );
}

/**
 * Register search route.
 */
add_action( 'rest_api_init', __NAMESPACE__ . '\register_route_search' );
function register_route_search() {

	register_rest_route(
		'tamachi/v1',
		'/search',
		array(
			'methods'  => 'GET',
			'callback' => __NAMESPACE__ . '\get_search',
		)
	);
}

/**
 * Return the search results given a query.
 *
 * @return { id: string; title: string; content: string; url: string; ancestors: Item[] }[] | null
 */
function get_search( $request ) {

	$data = $request->get_params();

	if ( empty( $data['query'] ) ) {
		return null;
	}

	$query = new WP_Query(
		array(
			's'              => $data['query'],
			// Apply a filter to add other post types to the search.
			'post_type'      => apply_filters( 'tamachi_search_post_types', array( 'post', 'page' ) ),
			// TODO: Implement pagination.
			'posts_per_page' => 22,
		)
	);

	if ( 0 === $query->found_posts ) {
		return array();
	}

	$results = array();

	foreach ( $query->posts as $post ) {

		$results[] = array(
			'id'        => $post->ID,
			'title'     => $post->post_title,
			'content'   => wp_strip_all_tags( $post->post_content ),
			'url'       => get_permalink( $post->ID ),
			'ancestors' => Utils::getPostAncestors( $post->ID ),
		);
	}

	return $results;
}
