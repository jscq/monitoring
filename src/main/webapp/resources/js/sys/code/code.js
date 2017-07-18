
/**
 * 查询
 */
var searchCode = function(){
	var queryParams = {
			'codeName':$('#codeName').val(),//数据名称
			'codeType':$('#codeType').val()//数据类型
	};        	
	$('#dg').treegrid('options').queryParams = queryParams;
	$("#dg").treegrid('load'); 
};

/**
 * 新增
 * @param url
 * @param title
 * @param x
 * @param y
 */
function add(url,title,x,y)
{
	window.parent.initAdd(url,title,x,y);
}

/**
 * 获得选中行
 */
var selections = function(){
	var result = false;
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length==0)
	{
		$.messager.alert('提示','请选择需要操作的数据！','warning');
		return result;
	}
	if(rows.length>1)
	{
		$.messager.alert('提示','请选择一条数据进行操作！','warning');
		return result;
	}
	result = true;
	return result;
};

/**
 * 编辑
 */
var edit = function(){
	//var parameterName = $("#parameterName").val();
	//var token = $("#token").val();
	if(selections()){
		var rows = $('#dg').datagrid('getSelections');
		var id = rows[0].id;
		if(id != ''){
			// 跳转编辑页面
			add(Utils.getRootPath() +'/code/editCode?id='+id,'编辑数据字典信息',800,350); 
		}else{
			$.messager.alert('提示','系统错误,请联系管理员！','warning');
		}
	}
};

/**
 * 删除
 */
var deleteByCode = function(){
	//var parameterName = $("#parameterName").val();
	//var token = $("#token").val();
	if(selections()){
		var rows = $('#dg').datagrid('getSelections');
		var id = rows[0].id;
		if(id != ''){
			
			$.messager.confirm('提示', '是否确定删除，若存在子节点一并删除？', function(r) {
				if(r){
					// 删除
					$.ajax({
				        cache: true,
				        type: "GET",
				        dataType:"json",
				        url:Utils.getRootPath() + "/code/deleteCode",
				        data:{
				        	'id':id
				        },
				        async: false,
				        error: function(request) {
				        	alert(request.status);
				        	$.messager.alert('提示',"验证失败",'warning');
				        },
				        success: function(result) 
				        {
				        	if(null != result && result.status == "OK"){
				        		// 刷新grid
				        		searchCode();
				        		// 删除成功
				        		$.messager.alert('提示','删除成功','warning');
				        	}else{
				        		$.messager.alert('提示',result.message,'warning');
				        	}
				        }
				});
				}
			});
			
		}else{
			$.messager.alert('提示','系统错误,请联系管理员！','warning');
		}
	}
};

/**
 * 选择上级单位
 */
var changeType = function(value){
	// 选择了上级单位,有值,数据类型不给填
	if(value != ''){
		var type = $("#parent"+value).val();
		$("#codeType").val(type);
		$("#codeType").attr("disabled",true); 
		$("#codeValue").attr("disabled",false); 
	}else{
		$("#codeType").val('');
		$("#codeValue").val('');
		$("#codeType").attr("disabled",false); 
		$("#codeValue").attr("disabled",true); 
	}
};

/**
 * 保存
 */
var saveOrUpdateCode = function(formId){
	var parameterName = $("#parameterName").val();
	var token = $("#token").val();
	var url = Utils.getRootPath() + "/code/checkCode?"+parameterName+"="+token;
	
	if(validateSubmit(formId)){
		var id = $("#codeId").val();
		var parent = $("#parent").val();
		var codeName = $("#codeName").val();
		var codeValue = $("#codeValue").val();
		var codeType = $("#codeType").val();
		var codeDescription = $("#codeDescription").val();
		var data = {
				'id':id,//id
				'parent.id':parent,// 上级单位
	        	'codeName':codeName,// 数据名称
	        	'codeValue':codeValue,// 数值
	        	'codeType':codeType,// 数据类型
	        	'codeDescription':codeDescription// 数据描述
	    };
		// 校验: 一级菜单，验证数据名称、数据类型是否存在
		// 	          二级菜单，验证数据名称、数值是否存在
		$.ajax({
		        cache: true,
		        type: "POST",
		        dataType:"json",
		        url:url,
		        data:data,
		        async: false,
		        error: function(request) {
		        	alert(request.status);
		        	$.messager.alert('提示',"验证失败",'warning');
		        },
		        success: function(result) 
		        {
		        	if(null != result && result.status == "OK"){
		        		// 保存、更新
		        		saveOrUpdateCodeToMysql(data);
		        	}else{
		        		$.messager.alert('提示',result.message,'warning');
		        	}
		        }
		});
	}
};

/**
 * 保存更新进数据库
 */
var saveOrUpdateCodeToMysql = function(data){
	var parameterName = $("#parameterName").val();
	var token = $("#token").val();
	var url = Utils.getRootPath() + "/code/saveOrUpdateCode?"+parameterName+"="+token;
	
	$.ajax({
        cache: true,
        type: "POST",
        dataType:"json",
        url:url,
        data:data,
        async: false,
        error: function(request) {
        	alert(request.status);
        	$.messager.alert('提示',"验证失败",'warning');
        },
        success: function(result) 
        {
        	if(null != result && result.status == "OK"){
        		// 刷新grid
        		window.parent.loadDataGrid('code');
        		$.messager.alert('提示',"操作成功",'info',function(){
	        		// 关闭添加页面
	        		window.parent.closeWinForm();
        		});
        		
        	}else{
        		$.messager.alert('提示',result.message,'warning');
        	}
        }
});
};

