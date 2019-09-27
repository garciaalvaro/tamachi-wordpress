<?php

namespace TAMACHI;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

// Remove emoji styles.
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );

// https://github.com/Automattic/_s/blob/master/functions.php
add_action( 'after_setup_theme', __NAMESPACE__ . '\setup' );
if ( ! function_exists( 'setup' ) ) {

	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 *
	 */
	function setup() {

		/*
		 * Enable Gutenberg align-wide option.
		 */
		add_theme_support( 'align-wide' );

		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 */
		load_theme_textdomain( 'tamachi', get_template_directory() . '/languages' );

		/*
		 * Let WordPress manage the document title.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 */
		add_theme_support( 'post-thumbnails' );

		/*
		 * Register menu.
		 */
		register_nav_menus( array(
			'tamachi-sidebar' => esc_html__( 'Sidebar Menu', 'tamachi' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		/*
		 * Add support for core custom logo.
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );
	}
}

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * @link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043
 */
add_action( 'after_setup_theme', __NAMESPACE__ . '\content_width', 0 );
function content_width() {
	$GLOBALS['content_width'] = apply_filters( 'content_width', 780 );
}

/**
 * Change excerpt more.
 */
add_filter( 'excerpt_more', __NAMESPACE__ . '\set_excerpt_more' );
function set_excerpt_more() {
    return '…';
}

/**
 * Change excerpt length.
 */
add_filter( 'excerpt_length', __NAMESPACE__ . '\set_excerpt_length' );
function set_excerpt_length() {
    return 30;
}
