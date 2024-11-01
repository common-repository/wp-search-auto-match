<?php
/*

**************************************************************************

Plugin Name:  WP Search Auto Match
Plugin URI:   http://www.arefly.com/wp-search-auto-match/
Description:  Add Search Keywork Hint like Google Search to your blog's search form.
Version:      1.1
Author:       Arefly
Author URI:   http://www.arefly.com/

**************************************************************************

	Copyright 2014  Arefly  (email : eflyjason@gmail.com)

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License, version 2, as 
	published by the Free Software Foundation.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

**************************************************************************/

define("WP_SEARCH_AUTO_MATCH_PLUGIN_URL", plugin_dir_url( __FILE__ ));
define("WP_SEARCH_AUTO_MATCH_FULL_DIR", plugin_dir_path( __FILE__ ));
define("WP_SEARCH_AUTO_MATCH_TEXT_DOMAIN", "wp-search-auto-match");

function wp_search_auto_match_tag_cloud() {
	if ( isset($_GET['action']) && $_GET['action'] == 'tag_cloud') {
		$number = $_GET['number'];
		$cloud_array = wp_tag_cloud('number='.$number.'&format=array&echo=false&orderby=count&order=DESC');
		if ($cloud_array) {
			$cloud_string = implode(',', $cloud_array);
			$str = preg_replace('/<a [^>]*>|<\/a>/', '', $cloud_string);
		}
		echo $str;
		die();
	} else {
		return;
	}
}
add_action('init', 'wp_search_auto_match_tag_cloud');

function wp_search_auto_match_enqueue_styles() {
	wp_enqueue_style(WP_SEARCH_AUTO_MATCH_TEXT_DOMAIN.'-css', WP_SEARCH_AUTO_MATCH_PLUGIN_URL.'style.min.css');
}
add_action('wp_enqueue_scripts', 'wp_search_auto_match_enqueue_styles');

function wp_search_auto_match_enqueue_script(){
	wp_enqueue_script(WP_SEARCH_AUTO_MATCH_TEXT_DOMAIN.'-init', WP_SEARCH_AUTO_MATCH_PLUGIN_URL.'js/wp-search-auto-match-init.min.js', array('jquery'));
	wp_localize_script(WP_SEARCH_AUTO_MATCH_TEXT_DOMAIN.'-init', 'wp_search_auto_match_info', array('pluginUrl' => WP_SEARCH_AUTO_MATCH_PLUGIN_URL, 'blogUrl' => home_url()));
}
add_action('wp_enqueue_scripts', 'wp_search_auto_match_enqueue_script');
