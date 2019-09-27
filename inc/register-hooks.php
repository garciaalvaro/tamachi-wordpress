<?php

namespace TAMACHI;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

/**
 * Add reexecutable scripts.
 */
add_filter( 'tamachi_reexecutable_scripts', __NAMESPACE__ . '\add_reexecutable_scripts' );
function add_reexecutable_scripts( $list ) {

	return array_merge(
		$list,
		array(
			'ugb-block-frontend-js',
			'melonpan-block-code-front',
			'coblocks-flickity',
		)
	);
}
