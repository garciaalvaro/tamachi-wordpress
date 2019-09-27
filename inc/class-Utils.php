<?php

namespace TAMACHI;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

/**
 * Class Utils
 */
class Utils {

	/**
	 * Utility that given a post id returns an array of its ancestors.
	 *
	 * @return { id: string; title: string; url: string; }[]
	 */
	static public function getPostAncestors( $post_id = 0 ) {

		$parent_id = wp_get_post_parent_id( $post_id );

		if ( empty( $parent_id ) ) {
			return array();
		}

		$ancestors = self::getPostAncestors( $parent_id );

		$ancestors[] = array(
			'id'    => $parent_id,
			'title' => get_the_title( $parent_id ),
			'url'   => get_permalink( $parent_id ),
		);

		return $ancestors;
	}

	/**
	 * Utility that given a taxonomy term id returns an array of its ancestors.
	 *
	 * @return { id: string; title: string; url: string; }[]
	 */
	static public function getTaxonomyAncestors( $term_id = 0 ) {

		$term      = get_term( $term_id );
		$parent_id = $term->parent;

		if ( empty( $parent_id ) ) {
			return array();
		}

		$parent_term = get_term( $parent_id );
		$ancestors   = self::getTaxonomyAncestors( $parent_id );

		$ancestors[] = array(
			'id'    => $parent_term->slug,
			'title' => $parent_term->name,
			'url'   => get_term_link( $parent_id ),
		);

		return $ancestors;
	}

	/**
	 * Utility that given a post id returns the next post.
	 * If the post has children, the next post is its first child. Otherwise the
	 * next post is the sibling (both share same parent post) which has the next menu_order.
	 *
	 * @return { id: string; title: string; url: string; } | null
	 */
	static public function getPostNext( $post_id = 0 ) {

		// If the post has children assign the first child as the next post.
		$args = array(
			'post_parent' => $post_id,
			'post_type'   => 'any',
			'numberposts' => -1,
			'post_status' => 'publish',
		);
		$children = get_children( $args );

		// Sort by menu_order
		usort( $children, function( $a, $b ) {
			return $a->menu_order <=> $b->menu_order;
		});

		if ( ! empty( $children[0] ) ) {

			$next = $children[0];

			return array(
				'id'    => $next->ID,
				'title' => $next->post_title,
				'url'   => get_permalink( $next->ID ),
			);
		}

		$parent_id = wp_get_post_parent_id( $post_id );

		if ( empty( $parent_id ) ) {
			return null;
		}

		$args = array(
			'post_parent' => $parent_id,
			'post_type'   => 'any',
			'numberposts' => -1,
			'post_status' => 'publish',
		);
		$siblings = get_children( $args );

		// Sort by menu_order
		usort( $siblings, function( $a, $b ) {
			return $a->menu_order <=> $b->menu_order;
		});

		// Get the array key of the current post
		$key = array_search( $post_id, array_column( $siblings, 'ID' ) );

		if ( isset( $siblings[ $key + 1 ] ) ) {

			$next = $siblings[ $key + 1 ];

			return array(
				'id'    => $next->ID,
				'title' => $next->post_title,
				'url'   => get_permalink( $next->ID ),
			);
		}

		return null;
	}
}
