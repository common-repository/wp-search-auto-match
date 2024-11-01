/**
 * WP Search Auto Match
 * @author Arefly
**/
jQuery(function() {
	var wp_search_auto_match_tip = function() {
		var searEl = jQuery('input[name="s"]').eq(0),	// 搜索輸入框
			allowRequest = true,					// 允許發送請求
			scriptUrl = wp_search_auto_match_info.pluginUrl + 'js/wp-search-auto-match.min.js';			// 異步載入 wp-search-auto-match.js
		
		searEl
		.attr('autocomplete', 'off')		// 關閉默認的輸入框提示
		.bind('focus', function() {			// 綁定 focus 事件
			if (allowRequest) {
				jQuery.ajax({
					url: scriptUrl,
					dataType: 'script',
					complete: function() {
						allowRequest = false;			// 請求成功後阻止再次請求
					}
				});
			}
		});
	};
	
	wp_search_auto_match_tip();
});