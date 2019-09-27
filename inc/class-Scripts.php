<?php

namespace TAMACHI;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

/**
 * Class Scripts
 */
class Scripts {

	/**
	 * { [ handle: string ] : { id: string; deps: string[]; src: string; } }
	 */
	private $styles = array();

	/**
	 * { [ handle: string ] : { id: string; deps: string[]; src: string; is_reexecutable: boolean; } }
	 */
	private $scripts = array();

	/**
	 * Add the class WordPress hooks.
	 */
	public function addHooks() {

		// Add the actions which will dequeue the scripts and set its data.
		add_action( 'wp_enqueue_scripts', array( $this, 'setScripts' ), 999 );
		add_action( 'wp_enqueue_scripts', array( $this, 'setStyles' ), 999 );
		add_action( 'wp_footer', array( $this, 'setScripts' ), -1 );
		add_action( 'wp_footer', array( $this, 'setStyles' ), -1 );

		// Add the actions which will localize the data.
		add_action( 'wp_footer', array( $this, 'localizeScriptsData' ), -1 );
		add_action( 'wp_footer', array( $this, 'localizeStylesData' ), -1 );
	}

	/**
	 * Deregister all scripts except the ones from the theme.
	 * We will add them through JavaScript once React has finished rendering.
	 * We do this to avoid conflicts, the scripts should execute
	 * when the final DOM is ready, otherwise any modification or
	 * many event listener added would be overriden.
	 */
	public function setScripts() {

		global $wp_scripts;

		/**
		 * Whitelist of scripts that can execute more than once.
		 * In the front-end when loading pages dynamically some of the scripts
		 * might need to execute again when the new page is loaded.
		 */
		$reexecutable_scripts = apply_filters( 'tamachi_reexecutable_scripts', array() );

		$scripts_to_keep = array(
			'lodash',
			'tamachi-front',
			'tamachi-front-color',
			'wp-api-fetch',
			'wp-dom-ready',
			'wp-hooks',
			'wp-i18n',
			'wp-polyfill',
			'wp-url'
		);

		foreach ( $wp_scripts->queue as $handle ) {

			$this->setScript( $handle, $wp_scripts->registered, $reexecutable_scripts );

			if ( ! in_array( $handle, $scripts_to_keep ) ) {

				wp_deregister_script( $handle );
			}
		}
	}

	/**
	 * Localize an object with the current page scripts data.
	 */
	public function localizeScriptsData() {

		wp_localize_script( THEME_NAME . '-front', 'tamachi_scripts', $this->scripts );
	}

	/**
	 * Localize an object with the current page styles data.
	 */
	public function localizeStylesData() {

		wp_localize_script( THEME_NAME . '-front', 'tamachi_styles', $this->styles );
	}

	/**
	 * Set the data of a given script handle.
	 */
	private function setScript( $handle, $registered, $reexecutable_scripts ) {

		if ( isset( $this->scripts[ $handle ] ) || ! isset( $registered[ $handle ] ) ) {
			return;
		}

		$script_raw = $registered[ $handle ];
		$deps       = array();

		foreach ( $script_raw->deps as $dep_handle ) {
			$this->setScript( $dep_handle, $registered, $reexecutable_scripts );
		}

		$this->scripts[ $handle ] = array(
			'id'   => $handle,
			'deps' => $script_raw->deps ? $script_raw->deps : array(),
			'src'  => $script_raw->src ? $script_raw->src : '',
			'is_reexecutable' => in_array( $handle, $reexecutable_scripts ),
		);
	}

	/**
	 * Set styles.
	 */
	public function setStyles() {

		global $wp_styles;

		foreach ( $wp_styles->queue as $handle ) {

			$this->setStyle( $handle, $wp_styles->registered );
		}
	}

	/**
	 * Set the data of a given style handle.
	 */
	private function setStyle( $handle, $registered ) {

		if ( isset( $this->styles[ $handle ] ) || ! isset( $registered[ $handle ] ) ) {
			return;
		}

		$style_raw = $registered[ $handle ];
		$deps      = array();

		foreach ( $style_raw->deps as $dep_handle ) {
			$this->setStyle( $dep_handle, $registered );
		}

		$this->styles[ $handle ] = array(
			'id'   => $handle,
			'deps' => $style_raw->deps ? $style_raw->deps : array(),
			'src'  => $style_raw->src ? $style_raw->src : '',
		);
	}
}
