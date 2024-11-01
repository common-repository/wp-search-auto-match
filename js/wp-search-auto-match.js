jQuery(function() {
	var wp_search_auto_match_run = (function() {
		/**
		 * 全局配置
		**/
		var config = {
			tags: [],			// 標簽
			searEl: jQuery('input[name="s"]').eq(0),			// 搜索 input 元素
			formEl: jQuery('input[name="s"]').eq(0).parents('form').eq(0),		// 表單元素
			wrapEl: null,		// 提示層元素
			wrapperId: 'wp_search_auto_match_wrapper',
			currentClass: 'wp_search_auto_match_cur',
			ajaxUrl: wp_search_auto_match_info.blogUrl + '/?action=tag_cloud'		// 異步請求地址
		};
		
		/**
		 * 設置外層元素樣式
		 * @return config.wrapEl {Element} 返回外層元素
		**/
		var setStyle = function() {
			var wrapEl = config.wrapEl,
				searEl = config.searEl;
			wrapEl.css({
				width: searEl.outerWidth(),
				top: searEl.offset().top + searEl.outerHeight(),
				left: searEl.offset().left
			});
			return config.wrapEl;
		};

		/**
		 * 生成提示的 HTML 結構
		 * @param data {Array} 標簽數據
		 * @return config.wrapEl {Element} 返回外層元素
		**/
		var buildTips = function(data) {
			var dataArrLen = data.length,
				dataLi = '';
				
			for (var i = 0; i < dataArrLen; i++) {
				dataLi += '<li>' + data[i] + '</li>';
			}
			
			
			jQuery('ul', config.wrapEl).replaceWith('<ul>' + dataLi + '</ul>');
			
			
			return config.wrapEl;
		};
		
		/**
		 * 匹配標簽
		**/
		var matchTags = function() {
			var searEl = config.searEl,
				formEl = config.formEl,
				wrapEl = config.wrapEl,
				currentClass = config.currentClass,
				wrapperId = config.wrapperId,
				tagsArr = config.tags,
				tagsArrLen = tagsArr.length,
				goIndex = -1;
				
			searEl.keyup(function(ev) {
				var _this = jQuery(this),
					searVal = jQuery.trim(_this.val()),							// 當前輸入的字符串
					matchedTags = [],										// 清空匹配數據項
					maxMatchedTagsIndex = 0,								// 匹配標簽的最大索引值
					keyCode = ev.keyCode;									// 按鍵
				
				
				if (searVal != '') {	// 當有內容輸入的時候才執行
					// 生成結構並顯示
					for (var i = 0; i < tagsArrLen; i++) {
						if (tagsArr[i].toLowerCase().indexOf(searVal.toLowerCase()) != -1) {
							matchedTags.push(tagsArr[i]);
						}
					}
					maxMatchedTagsIndex = matchedTags.length - 1;
					buildTips(matchedTags).show();
					
					
					switch(keyCode) {
						case 40:	// 按下
							goIndex++;
							if (goIndex > maxMatchedTagsIndex) {
								goIndex = 0;
							}
							jQuery('li', wrapEl).eq(goIndex).addClass(currentClass).siblings().removeClass(currentClass);
						break;
						
						case 38:	// 按上
							goIndex--;
							if (goIndex < 0) {
								goIndex = maxMatchedTagsIndex;
							}
							jQuery('li', wrapEl).eq(goIndex).addClass(currentClass).siblings().removeClass(currentClass);
						break;
						
						case 13:	// 按回車鍵
							wrapEl.hide();
						break;
					}
				} else {	// 當輸入內容為空的時候才執行
					wrapEl.hide();
				}
					
			});
			
			searEl.keypress(function(ev) {
				var _this = jQuery(this),
					keyCode = ev.keyCode,									// 按鍵
					curTagEl = jQuery('.' + currentClass, wrapEl);
				
				switch(keyCode) {
					case 13:	// 按回車
						if (curTagEl.length != 0) {
							ev.preventDefault();
							searEl.val(curTagEl.html());
							curTagEl.removeClass(currentClass);
						}
					break;
				}
			});
			
			jQuery(document).on('mouseover', 'li', function() {
				jQuery(this).addClass(currentClass).siblings().removeClass(currentClass);
			});
			
			jQuery(document).on('click', 'li', function() {
				var _this = jQuery(this);
				searEl.val(_this.html());
				_this.removeClass(currentClass);
				wrapEl.hide();
			});
		};
		
		
		/**
		 * 異步請求所有標簽
		**/
		var ajaxTags = function() {
			jQuery.ajax({
				url: config.ajaxUrl + '&number=0',
				dataType: 'html',
				complete: function(data) {
					// 把字符串分割成標簽數據
					config.tags = data.responseText.split(',');
					
					// 插入結構
					jQuery('body').append('<div id="' + config.wrapperId + '"><ul></ul></div>');
					// 設定外層元素
					config.wrapEl = jQuery('#' + config.wrapperId);
					buildTips(config.tags);
					
					// 設置樣式
					setStyle();
					
					// 匹配標簽
					matchTags();
				}
			});
		};
		
		return {
			init: function() {
				ajaxTags();
			}
		}
	})();
	
	wp_search_auto_match_run.init();
});