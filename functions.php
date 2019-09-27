<?php

namespace TAMACHI;

if ( ! defined( __NAMESPACE__ . '\THEME_VERSION' ) ) {
	define( __NAMESPACE__ . '\THEME_VERSION', '0.1.0' );
}
if ( ! defined( __NAMESPACE__ . '\THEME_NAME' ) ) {
	define( __NAMESPACE__ . '\THEME_NAME', 'tamachi' );
}
if ( ! defined( __NAMESPACE__ . '\BUILD_DIR' ) ) {
	define( __NAMESPACE__ . '\BUILD_DIR', get_template_directory_uri() . '/build/' );
}
if ( ! defined( __NAMESPACE__ . '\INC_DIR' ) ) {
	define( __NAMESPACE__ . '\INC_DIR', get_template_directory() . '/inc/' );
}

require_once INC_DIR . 'class-Utils.php';
require_once INC_DIR . 'class-PageData.php';
require_once INC_DIR . 'class-Scripts.php';
require_once INC_DIR . 'register-setup.php';
require_once INC_DIR . 'register-enqueue.php';
require_once INC_DIR . 'register-rest.php';
require_once INC_DIR . 'register-hooks.php';

// Initiate classes.
$page_data = new PageData();
$page_data->addHooks();

$scripts = new Scripts();
$scripts->addHooks();
