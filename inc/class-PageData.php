<?php

namespace TAMACHI;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

/**
 * Class PageData
 */
class PageData {

	static public $template      = 'error404';
	static public $layout        = 'singular';
	static public $template_data = array();

	/**
	 * Add the class WordPress hooks.
	 */
	public function addHooks() {

		// Add the action which will set the initial page data.
		add_action( 'wp', array( $this, 'setPageData' ) );

		// Add the action which will localize the current page data.
		add_action( 'wp_footer', array( $this, 'localizePageData' ), 0 );
	}

	/**
	 * Get the archive toolbar label from the current view.
	 *
	 * @return string
	 */
	static public function getArchiveToolbarLabel() {

		$template_data = self::$template_data;

		switch ( self::$template ) {

			case 'home':
				return get_bloginfo( 'name' );
				break;

			case 'search':
				if ( ! empty( $template_data['query'] ) ) {
					return sprintf(
						__( 'Search results for: %s', 'tamachi' ),
						$template_data['query']
					);
					break;
				}

			case 'author':
				if ( ! empty( $template_data['name'] ) ) {
					return sprintf( __( 'Posts by: %s', 'tamachi' ), $template_data['name'] );
					break;
				}

			case 'post_type':
				if ( ! empty( $template_data['name'] ) ) {
					return $template_data['name'];
					break;
				}

			default:
				return '';
		}
	}

	/**
	 * Get the HTML root element classes.
	 *
	 * @return string
	 */
	static public function getHtmlRootClasses() {

		$classes = array(
			'tamachi-template-' . self::$template,
			'tamachi-layout-' . self::$layout,
			'tamachi-no-is_loading',
		);

		return join( ' ', $classes );
	}

	/**
	 * Localize the current page data.
	 */
	public function localizePageData() {

		$page_data = array(
			'layout'        => self::$layout,
			'template'      => self::$template,
			'template_data' => self::$template_data,
		);

		wp_localize_script( THEME_NAME . '-front', 'tamachi_page_data', $page_data );
	}

	/**
	 * Set the initial page data.
	 */
	public function setPageData() {

		if ( is_404() ) {
			return;
		}

		if ( is_singular() && absint( get_option( 'page_on_front' ) ) !== get_the_ID() ) {

			$post_id = get_the_ID();

			self::$template = 'singular';

			self::$template_data = array(
				'ancestors' => Utils::getPostAncestors( $post_id ),
				'next'      => Utils::getPostNext( $post_id ),
				'post_id'   => $post_id,
				'post_type' => get_post_type( $post_id ),
			);

			return;
		}

		global $wp_query;

		self::$layout        = 'archive';
		self::$template_data = array(
			'pages_total'  => $wp_query->max_num_pages,
			'page_current' => ! empty( get_query_var( 'paged', 1 ) )
				? get_query_var( 'paged', 1 )
				: 1,
		);

		if ( is_front_page() ) {

			self::$template = 'home';

			self::$template_data['site_title'] = get_bloginfo( 'name' );
			self::$template_data['post_id']    = absint( get_option( 'page_on_front' ) );

			self::$layout = ! empty( self::$template_data['post_id'] ) ? 'home' : 'archive';

			return;
		}

		if ( is_search() ) {

			self::$template = 'search';

			self::$template_data['query'] = get_search_query();

			return;
		}

		if ( is_author() ) {

			self::$template = 'author';

			self::$template_data['name'] = get_queried_object()->user_nicename;

			return;
		}

		if ( is_post_type_archive() ) {

			self::$template = 'post_type';

			self::$template_data['name'] = get_queried_object()->name;

			return;
		}

		if ( is_date() ) {

			$year  = get_query_var('year');
			$month = get_query_var('monthnum');
			$day   = get_query_var('day');

			self::$template = 'date';

			self::$template_data['items'] = array();

			if ( ! empty( $year ) ) {

				self::$template_data['items'][] = array(
					'id'    => 'year',
					'title' => $year,
					'url'   => $year ? get_year_link( $year ) : '',
				);
			}

			if ( ! empty( $month ) ) {

				self::$template_data['items'][] = array(
					'id'    => 'month',
					'title' => explode( '-', single_month_title( '-', false ) )[1],
					'url'   => $year && $month ? get_month_link( $year, $month ) : '',
				);
			}

			if ( ! empty( $day ) ) {

				self::$template_data['items'][] = array(
					'id'    => 'day',
					'title' => $day,
					'url'   => $year && $month && $day ? get_day_link( $year, $month, $day ) : '',
				);
			}

			return;
		}

		// See https://core.trac.wordpress.org/ticket/18636
		if ( is_category() || is_tag() || is_tax() ) {

			$term     = get_queried_object();
			$taxonomy = get_taxonomy( $term->taxonomy );

			self::$template = 'taxonomy';

			self::$template_data['items'] = array();

			// Taxonomy
			self::$template_data['items'][] = array(
				'id'    => $taxonomy->name,
				'title' => $taxonomy->label,
				'url'   => '',
			);

			$ancestors = Utils::getTaxonomyAncestors( $term->term_id );

			self::$template_data['items'] = array_merge(
				self::$template_data['items'],
				$ancestors
			);

			// This term
			self::$template_data['items'][] = array(
				'id'    => $term->slug,
				'title' => $term->name,
				'url'   => get_term_link( $term->term_id ),
			);

			return;// Left here in case more if statements are added.
		}
	}
}
