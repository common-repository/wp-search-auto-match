=== WP Search Auto Match ===
Contributors: eflyjason
Donate link: http://www.arefly.com/donate/
Tags: Search, Match, Search Form
Requires at least: 3.0
Tested up to: 3.8
Stable tag: trunk
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Add Search Keywork Hint like Google Search to your blog's search form.

== Description ==

Sometimes when user are using the search function of your blog. They may not know the full string of they want to search.

And this plugin will add a Search Keyword Hint (get hints from all tags) on the search form of your site.

So that user can find the things they want to search more easily.

Live Demo: [Click Here](http://www.arefly.com/) (Try enter any word in the search box.)

中文介紹請看[這裏](http://www.arefly.com/wp-search-auto-match/)

== Installation ==

###Updgrading From A Previous Version###

To upgrade from a previous version of this plugin, delete the entire folder and files from the previous version of the plugin and then follow the installation instructions below.

###Installing The Plugin###

Extract all files from the ZIP file, making sure to keep the file structure intact, and then upload it to `/wp-content/plugins/`.

This should result in the following file structure:

`- wp-content
    - plugins
        - wp-search-auto-match
            - js
                | wp-search-auto-match-init.js
                | wp-search-auto-match.js
            | LICENSE
            | license.txt
            | readme.txt
            | style.css
            | wp-search-auto-match.php`

Then just visit your admin area and activate the plugin.

**See Also:** ["Installing Plugins" article on the WP Codex](http://codex.wordpress.org/Managing_Plugins#Installing_Plugins)

== Frequently Asked Questions ==

= I cannot active this plugin, what can i do? =

You may post on the [support forum of this plugin](http://wordpress.org/support/plugin/wp-search-auto-match/) to ask for help.

= I love this plugin! Can I donate to you? =

YES! I do this in my free time and I appreciate all donations that I get. It makes me want to continue to update this plugin. You can find more details on [About Me Page](http://www.arefly.com/about/).

== Changelog == 

**Version 1.0.9 to 1.1**

* Update Readme File.

**Version 1.0.8**

* Use `wp_localize_script` to send data to JS instead of simply write data in `wp_head`.

* Add Uncompressed CSS File & Using Minified CSS File.

* Add Uncompressed JS File & Using Minified JS File.

**Version 1.0.7**

* Remove All Remote Load File.

**Version 1.0.6**

* Add Banners.

**Version 1.0.5**

* Fix Bugs.

**Version 1.0.4**

* Fix Bug of `define`. (Thanks to cmhello)

**Version 1.0.3**

* Update Readme File.

**Version 1.0.1 to 1.0.2**

* Fix Bugs.

**Version 1.0**

* Initial release.

== Upgrade Notice ==

See Changelog.