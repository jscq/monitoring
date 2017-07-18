//刷新iframe中DataGrid
var loadDataGrid = function(type)
{
	if(type=='function')
	{	
		// 系统管理模块---菜单管理
		$(window.parent.document).contents().find("#iframe")[0].contentWindow.searchFunction();
	}else if(type=='code')
	{	
		// 系统管理模块---数据字典管理
		$(window.parent.document).contents().find("#iframe")[0].contentWindow.searchCode();
	}else if(type=='area')
	{	
		// 系统管理模块---行政区域管理
		$(window.parent.document).contents().find("#iframe")[0].contentWindow.searchArea();
	}
	
	else if(type=='department')
	{	
		// 教务管理模块---系部管理
		$(window.parent.document).contents().find("#iframe")[0].contentWindow.searchDepartment();
	}else if(type=='major')
	{	
		// 教务管理模块---专业管理
		$(window.parent.document).contents().find("#iframe")[0].contentWindow.searchMajor();
	}else if(type=='classRoom')
	{	
		// 教务管理模块---班级管理
		$(window.parent.document).contents().find("#iframe")[0].contentWindow.searchClassRoom();
	}
	
	else if(type == 'itemBank'){
		// 考试管理模块---题库管理
		$(window.parent.document).contents().find("#iframe")[0].contentWindow.searchItemBank();
	}
	
	
}



/**
 * 重置
 */
var resetSearchFrom = function(ff){
	var elements = ff.elements;
    for(var i=0;i<elements.length;i++){
        var element = elements[i];
        if(element.type=="text"){
            element.value = "";
        }else if(element.type=="radio" || element.type=="checkbox"){
        	element.checked = false;
        }else if(element.options!=null){
        	element.options[0].selected  = true;
        }
    }  
    
    // 菜单管理清空树
    $("#parentId").val("");
    
    // 清空专业选择
    $('#majorSelect option').remove();
	$("#majorSelect").append("<option value=''>--请选择--</option>");
};