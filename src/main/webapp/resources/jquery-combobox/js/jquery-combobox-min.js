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
;if(typeof $.widget==='function'){(function($){$.widget("ui.combobox",{options:{delay:60,size:0},_create:function(){var d=this,select=d.element.hide(),size=d.options.size||'',delay=d.options.delay;var e=select[0]&&select[0].selectedIndex>=0&&select[0].options[select[0].selectedIndex].text||'&nbsp;';var f=e?'<input size="'+size+'" value="'+e+'" id="combobox_'+(+new Date())+'" />':'<input>';var g=$(f).insertAfter(select).autocomplete({source:function(b,c){c(select.children("option").not(':disabled').map(function(){var a=$(this).text();if(this.value&&(!b.term||a.indexOf(b.term)>=0)){return{id:this.value,label:a.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("+$.ui.autocomplete.escapeRegex(b.term)+")(?![^<>]*>)(?![^&;]+;)","gi"),"<strong>$1</strong>"),value:a}}}))},delay:delay,select:function(a,b){select.val(b.item.id);d._trigger("selected",a,{item:$(b.item)})},change:function(a,b){var c=$(this);if(!b.item){c.val('');select.attr('selectedIndex',-1).val('');return false}else{if(b.item.value!==c.val()){c.val('');select.attr('selectedIndex',-1).val('')}}},minLength:0}).dblclick(function(){$(this).select()}).addClass("ui-widget ui-widget-content ui-corner-left");if(jQuery.browser.mozilla){g[0].addEventListener('input',function(){var a=this.value;if(a){$(this).autocomplete("search",a)}},false)}$("<button>&nbsp;</button>").attr("tabIndex",-1).attr("title","展开").insertAfter(g).button({icons:{primary:"ui-icon-triangle-1-s"},text:false}).removeClass("ui-corner-all").addClass("ui-corner-right ui-button-icon").click(function(){if(g.autocomplete("widget").is(":visible")){g.autocomplete("close");return}g.autocomplete("search","").focus()})},_setOption:function(a,b){var c=this;var d=c.element,input=d.next();if(a=='size'){b=parseInt(b,10);input.attr('size',b)}else{this.options[a]=b}}})})(jQuery)}