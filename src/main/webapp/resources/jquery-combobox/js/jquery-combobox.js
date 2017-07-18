/*
 * jQuery Combobox
 * http://jqueryui.com/demos/autocomplete/#combobox
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * Modify by waiting@issence.com
 * http://waiting.javaeye.com/blog/714655
 *
 * Depends:
 *	jquery.ui.widget.js
 *	UI Core, UI Widget, UI Position
 * Update:
 *	2010.07.16	扩展设置, 解决兼容, 双击输入框选中内容 
 *	2010.07.23	修正输入+或者c++时抛出 'invalid quantifier +' 错误
 *	2010.08.04	FF下给input添加input事件，补丁解决中文输入时触发匹配问题
 *				解决通过下拉菜单选择项目之后继续输入字符到不匹配状态后失焦时无法清空
 *
 * Bugs:
 *
 * $(selector).combobox()
 * $(selector).combobox({size: 30})
 * $(selector).combobox().combobox("option", {size: 30, delay: 300})	// greater delay for ajax
 *
 */

/* FIX 下拉超长则纵向滚动条
<style>
.ui-button { margin-left: -1px; }
.ui-button-icon-only .ui-button-text { padding: 0.35em; }
.ui-autocomplete-input {margin: 0; padding: 0.48em 0em 0.47em 0.4em; *padding:0.72em 0 0.46em 0.4em;}
ul.ui-autocomplete {max-height: 280px; overflow-x: hidden; overflow-y: auto; padding:2px;}
</style>
*/

// combobox
if (typeof $.widget === 'function') {
	(function($) {
		$.widget("ui.combobox", {
			options: {
				delay: 60,
				size: 0
			},
			_create: function() {
				var self = this,
					select = self.element.hide(),
					size = self.options.size || '',
					delay = self.options.delay;
				
				// add waiting
				var select_name = select[0] && select[0].selectedIndex >=0 && select[0].options[select[0].selectedIndex].text || '&nbsp;';
				var str = select_name ? '<input size="' + size + '" value="' + select_name + '" id="combobox_' + (+ new Date()) +  '" />' : '<input>';
				// 设定默认值为<select>选定项目
				var input = $(str)
					.insertAfter(select)
					.autocomplete({
						source: function(request, response) {
							// var matcher = new RegExp(request.term, "i");	// 当输入如c++的类正则字符时会抛出 invalid quantifier +
							// edit waiting: 使用not过滤掉被禁止项目，实现通过仅用项目来动态屏蔽搜索结果
							response(select.children("option").not(':disabled').map(function() {
								var text = $(this).text();
								// if (this.value && (!request.term || matcher.test(text)))
								if (this.value && (!request.term || text.indexOf(request.term) >= 0)) {
									return {
										id: this.value,
										label: text.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(request.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>"),
										value: text
									};
								}
							}));
						},
						delay: delay,
						// FIX FF对combox的change事件兼容性 并且change会有滞后性,用于表单当通过按钮选择项目后直接提交会导致select选项未更新 !
						// change结合select事件确保用户必须通过ENTER或鼠标点击来确定条目
						select: function(event, ui) {
							select.val(ui.item.id);	// 更新select值
							self._trigger("selected", event, {
								//item: select.find("option[value='" + ui.item.id + "']")
								item: $(ui.item)
							});
							// select.change();
						},
						change: function(event, ui) {	// 用select事件来联动select,change只用来做输入不匹配时处理
							var input = $(this);
							if (!ui.item) {	// 下当选择提示条目后继续输入到不匹配状态然后失焦,IE为空,FF为真
								// remove invalid value, as it didn't match anything
								input.val('');
								select.attr('selectedIndex', -1).val('');
								return false;
							}
							else {		// ui.item==true || FF 
								if (ui.item.value !== input.val()) {
									input.val('');
									select.attr('selectedIndex', -1).val('');
								}
							} 
							//select.val(ui.item.id);
						},
						minLength: 0
					})
					.dblclick(function() {
						$(this).select();
					})
					.addClass("ui-widget ui-widget-content ui-corner-left");
				
				// FF下绑定input事件来兼容输入法中文输入
				if (jQuery.browser.mozilla) {
					input[0].addEventListener(
							'input', 
							function() {
								var val = this.value;
								if (val) {
									$(this).autocomplete("search", val);
								}
							}, false
					);
				}
				
				$("<button>&nbsp;</button>")
				.attr("tabIndex", -1)
				.attr("title", "展开")
				.insertAfter(input)
				.button({
					icons: {
						primary: "ui-icon-triangle-1-s"
					},
					text: false
				}).removeClass("ui-corner-all")
				.addClass("ui-corner-right ui-button-icon")
				.click(function() {
					// close if already visible
					if (input.autocomplete("widget").is(":visible")) {
						input.autocomplete("close");
						return;
					}
					// pass empty string as value to search for, displaying all results
					input.autocomplete("search", "").focus();
					//alert(input.autocomplete( "option", "source" ) )
				});
			},
				
			_setOption: function(key, value) {
				var self = this;
				var select = self.element,
					input = select.next();
				if (key == 'size') {
					value = parseInt(value, 10);
					input.attr('size', value);	
				}
				else {
					this.options[key] = value;
				}
			}
		});
	})(jQuery);
}
// ui-autocomplete-input ui-widget ui-widget-content ui-corner-left ui-autocomplete-loading