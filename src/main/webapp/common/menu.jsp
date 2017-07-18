<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div id="sidebar" class="sidebar responsive">

	<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
		<i class="ace-icon fa fa-angle-double-left"
			data-icon1="ace-icon fa fa-angle-double-left"
			data-icon2="ace-icon fa fa-angle-double-right"></i>
	</div>

	<ul class="nav nav-list">
		<c:forEach var="list" items="${functionList }" varStatus="funcList">
			<li >
				<a href="#" class="dropdown-toggle"> 
					<i class="menu-icon fa " style="background:url(<%=basePath%>/resources/images/menu/icon_tool_${funcList.index+1}.png) no-repeat top center;"></i>
					<span class="menu-text">${list.funcName }</span> 
					<b class="arrow fa fa-angle-down"></b>
				</a>
				<ul class="submenu" id="childId_${list.id }">
					
					<c:forEach var="childList" items="${list.childFuncList }">
						<li class="">
					        <a href="javascript:void(0);" class="dropdown-toggle" onclick="jumpIframe('${childList.linkUrl}','${childList.id}')">
					        	<i class='menu-icon fa fa-caret-right'></i>${childList.funcName }
					        </a>
					        <b class='arrow'></b>
					        <ul class="submenu" id="childId_${childList.id }">
					        	
					        	<c:forEach var="childChildList" items="${childList.childFuncList }">
									<li class="">
								        <a href="javascript:void(0);" class="dropdown-toggle" onclick="jumpIframe('${childChildList.linkUrl}','${childChildList.id}')">
								        	<i class='menu-icon fa fa-caret-right'></i>${childChildList.funcName }
								        </a>
								        <b class='arrow'></b>
								        <ul class="submenu" id="childId_${childChildList.id }">
								        	
								        </ul>
							        </li>
								</c:forEach>
					        	
					        </ul>
				        </li>
					</c:forEach>
					
				</ul>
			</li>
		</c:forEach>
	</ul>

<script>
	var primaryId = "";
	
	var ii = 0;
	
	//显示二级菜单，预加载
	function openMenu(funcName,id){
		
		ii++;
		var url = Utils.getRootPath() +"/member/initChildMenu";
		
		if(primaryId == id){
			
			return;
		}
		
		$.ajax({
	        url: url,
	        type:'GET',
	        dataType: "json", 
	        data:{ 
	        	id:id
	        },
	        success: function(result){
	        	var menuCount = 0;
	        	if(null != result){
	        		menuCount = result.total;
		            if(menuCount > 0){
		            	
			            var menuHtml ="";
			            for(var i = 0; i < menuCount; i++){
			            	var childMenu = result.rows[i];
			            	menuHtml += "<li class='' id='"+ childMenu.id +"' onclick=\"openChildMenu('"+childMenu.funcName+"', '"+childMenu.id+"')\">";
			            	menuHtml += "	<a href='javascript:void(0);' class='dropdown-toggle' onclick=\"jumpIframe('"+childMenu.linkUrl+"','"+childMenu.id+"')\">";
			            	menuHtml += "		<i class='menu-icon fa fa-caret-right'></i>" + childMenu.funcName;
			            	menuHtml += "	</a>";
			            	menuHtml += "	<b class='arrow'></b>";
			            	menuHtml += "	<ul class='submenu' id='childId_"+ childMenu.id +"'>";
			            	
			            	menuHtml += "</ul>";
			            	menuHtml += "</li>";
			            	
			            }
			            $("#childId_" + id).html(menuHtml);
			            $("#childId_" + id).attr("class", "submenu nav-show");
			            $("#childId_" + id).attr("style", "display: block;");
			           
			            primaryId = id;
			            
		            }else{
		            	 var menuHtml ="";
		            	 $("#childId_" + id).html(menuHtml);
				         $("#childId_" + id).attr("class", "submenu nav-show");
				         $("#childId_" + id).attr("style", "display: block;");
		            }
	        	}
	        }
	    });
	}
	
	var isopen = false;
	
	//显示三级菜单
	function openChildMenu(funcName,id){
		
		var url = Utils.getRootPath() +"/member/initChildMenu";
		
		if(isopen){
			isopen = false;
			return;
		}
		
		$.ajax({
	        url: url,
	        type:'GET',
	        dataType: "json", 
	        data:{ 
	        	id:id
	        },
	        success: function(result){
	        	var menuCount = 0;
	        	if(null != result){
	        		menuCount = result.total;
		            if(menuCount > 0){
		            	
			            var menuHtml ="";
			            for(var i = 0; i < menuCount; i++){
			            	var childMenu = result.rows[i];
			            	menuHtml += "<li class='' id='"+ childMenu.id +"' >";
			            	menuHtml += "	<a href='javascript:void(0);' onclick=\"jumpIframe('"+childMenu.linkUrl+"','"+childMenu.id+"')\">";
			            	menuHtml += "		<i class='menu-icon fa fa-caret-right'></i>" + childMenu.funcName;
			            	menuHtml += "	</a>";
			            	menuHtml += "	<b class='arrow'></b>";
			            	menuHtml += "</li>";
			            }
			            $("#childId_" + id).html(menuHtml);
			            $("#childId_" + id).attr("class", "submenu nav-show");
			            $("#childId_" + id).attr("style", "display: block;");
			           
			            isopen = true;
		            }
	        	}
	        }
	    });
		
	}
	
	function jumpIframe(url,id)
	{
		if(url!='')
		{
			$('#iframe').attr('src','<%=basePath%>'+url);
			$('li').removeClass('active');
			$('#'+id).addClass('active');
		}
	}
</script>

</div>