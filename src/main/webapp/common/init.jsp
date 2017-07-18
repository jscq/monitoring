<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="showWin" class="easyui-window" ></div>
<script>
$(function(){
	closeWinForm();
});

//初始化window窗口
function initShowWin(x, y, title){
	$('#showWin').window({  
			title: title,
  			width: x,  
   			height: y,  
   			top:($(window).height() - y) * 0.5,   
           	left:($(window).width() - x) * 0.5,
           	closable:	true,
   			collapsible: true,
      		minimizable: false,
       		maximizable: true,	
       		resizable: true,
       		modal: true,
   			draggable:true,
   			onMaximize:function(){  //面板最大化事件
				$('.tab_cl').attr('style','overflow-x:hidden;width: 100%');
			},
			onRestore:function(){  //面板恢复原始大小事件
				$('.tab_cl').attr('style','overflow-x:hidden;width: 100%');
			}
	});
}

function initAdd(url,title,x,y)
{
	var s='<iframe scrolling="no" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
	//限制最大最小x,y
	var clientHeight = $(window).height();
	var clientWidth = $(window).width();
	if(y>clientHeight) y=clientHeight-10;
	if(x>clientWidth) x=clientWidth-10;
	//alert(clientHeight); 
	initShowWin(x,y,title);
	$('#showWin').html(s);
	$('#showWin').window('open');
}

//关闭弹出窗口
function closeWinForm()
{
	$('#showWin').html('');
	$('#showWin').window('close',true);
	
}
</script>