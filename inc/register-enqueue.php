<?php

namespace TAMACHI;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue' );
function enqueue() {

	wp_enqueue_style(
		THEME_NAME . '-front',
		BUILD_DIR . THEME_NAME . '-front.css',
		array(),
		THEME_VERSION
	);

	wp_enqueue_script(
		THEME_NAME . '-front-color',
		BUILD_DIR . THEME_NAME . '-front-color.js',
		array(),
		THEME_VERSION,
		true // Enqueue in the header.
	);

	wp_enqueue_script(
		THEME_NAME . '-front',
		BUILD_DIR . THEME_NAME . '-front.js',
		array(
			'lodash',
			'wp-api-fetch',
			'wp-dom-ready',
			'wp-i18n',
			'wp-url',
		),
		THEME_VERSION,
		true // Enqueue in the header.
	);
}
