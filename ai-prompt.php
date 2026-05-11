<?php
/**
 * Plugin Name:       AI Prompt
 * Plugin URI:        https://github.com/f/ai-prompt
 * Description:       A Gutenberg block that renders beautiful, interactive AI prompts inline.
 * Version:           0.3.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            fka
 * Author URI:        https://fka.dev
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ai-prompt
 * Update URI:        https://github.com/f/ai-prompt
 * GitHub Plugin URI: f/ai-prompt
 * Primary Branch:    main
 *
 * @package FkaAiPrompt
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the AI Prompt block.
 *
 * Uses `wp_register_block_types_from_metadata_collection` (WP 6.8+) when available
 * for faster registration, with a fallback to per-block registration on older sites.
 */
function fka_ai_prompt_block_init() {
	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection(
			__DIR__ . '/build',
			__DIR__ . '/build/blocks-manifest.php'
		);
		return;
	}

	$manifest_path = __DIR__ . '/build/blocks-manifest.php';
	if ( file_exists( $manifest_path ) ) {
		if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
			wp_register_block_metadata_collection( __DIR__ . '/build', $manifest_path );
		}
		$manifest = require $manifest_path;
		foreach ( array_keys( $manifest ) as $slug ) {
			register_block_type( __DIR__ . '/build/' . $slug );
		}
	}
}
add_action( 'init', 'fka_ai_prompt_block_init' );
