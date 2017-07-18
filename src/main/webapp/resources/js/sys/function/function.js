function add(url,title,x,y)
{
	window.parent.initAdd(url,title,x,y);
}

//查询
function searchFunction(){
	var queryParams = {
		'function.funcName' : $("#funcName").val(),
		'function.funcCode' : $('#funcCode').val(),
		'function.parent.id' : $('#parentId').val()
	};        	
	$('#dg').datagrid('options').queryParams = queryParams;
	$("#dg").datagrid('load'); 
}

/**
 * 添加功能
 * @param formId
 * @param parameterName
 * @param token
 */
function save(formId,parameterName,token)
{
	//数据有限性判断
	if (validateSubmit(formId)) {
			// 功能名称校验 
			var checkName = verifyFuncName(parameterName,token);
			
			if(checkName){
				//保存
				var url = Utils.getRootPath() +'/function/saveFunction';
				$.ajax({
			        type: "POST",
			        url: url,
			        data:$('#'+formId).serialize(),
			        async: false,
			        dataType: 'json',
			        error: function(request) {
			        	$.messager.alert('提示','系统异常,请稍后重新再试!','error');
			        },
			        success: function(result) 
			        {
			        	var message = "";
			        	var id = $("#id").val();
			        	if(id != null && id != undefined && id != ''){
		        			message = "更新";
		        		}else{
		        			message = "保存";
		        		}
			        	
			        	if (null != result && result.status == "OK"){
			        		$.messager.alert('提示',message + '成功','info',function(){
			        			loadDataGrid("function");
			                	window.parent.closeWinForm();
			        		});
			            } else{
			            	$.messager.alert('提示',message + '失败','error');
			            }
			        }
			    });
			}
	}
}

/**
 * 编辑
 */
function edit(){
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length==0)
	{
		$.messager.alert('提示','请选择需要操作的数据！','warning');
		return;
	}
	if(rows.length>1)
	{
		$.messager.alert('提示','请选择一条数据进行操作！','warning');
		return;
	}
	var id = rows[0].id;
	add(Utils.getRootPath()+'/function/editFunction?function.id='+id,'编辑功能',850,500); 
};

  
/**
 * 删除
 */
function del(parameterName,token){
	
	var rows = $('#dg').datagrid('getSelections');
	if (rows.length == 0) {
		$.messager.alert('提示', '请选择需要操作的数据！', 'warning');
		return;
	}
	
	$.messager.confirm('提示', '是否确定删除，若有下级功能一并删除？', function(r) {
		if (r) {
			var str = '';
			for(var i=0; i<rows.length; i++){
				var row = rows[i];
				
				if (str == '') {
					str = row.id;
				} else {
					str += "," + row.id;
				}
			}
			var url = Utils.getRootPath() + '/function/deleteFunction?'+ parameterName + "=" + token;
			$.ajax({
				type : "post",
				url : url,
				data : {
					"functionIds" : str
				},
				async : false,
				dataType : 'json',
				success : function(result) {
					if (result.status == "OK") {
						loadDataGrid("function");
					} else if (result.status == "ERROR") {
						$.messager.alert('提示', '删除失败', 'error');
					}
				},
			});
		}
	});
}

//验证功能名称唯一性  
function verifyFuncName(parameterName,token)
{
	var checkFlag = false;
	var returnFlag = false;
	// 父节点id
	var parentId = "";
	//隐藏功能名称
	var hiddenFuncName = $("#hiddenFuncName").val();
	var funcName = $("#funcName").val();
	funcName = funcName.replace(/(^\s*)|(\s*$)/g, "");
	if ((hiddenFuncName=='')||(hiddenFuncName != '' && hiddenFuncName != funcName)) 
	{
		if(hiddenFuncName=='' || hiddenFuncName== undefined){
			parentId = $("#addParentId").val()
		}else{
			parentId = $("#editParentId").val()
		}
		checkFlag = true;
	}else if(hiddenFuncName != '' && hiddenFuncName == funcName)
	{
		return true;
	}
	
	if(checkFlag)
	{
		if(funcName!='')
		{

			$.ajax({
				type : "post",
				url : Utils.getRootPath() + '/function/verifyFunctionName?'+ parameterName + "=" + token,
				data : {
					"sysQuery.funcName" : funcName,
					"sysQuery.parentId" : parentId
				},
				async : false,
				dataType : 'json',
				success : function(result) {
					if (result.status == "OK") 
					{
						returnFlag = true;
					}
					else if(result.status == "ERROR") 
					{
						$.messager.alert('提示', '功能名称已存在，请重新输入功能名称', 'warning');
					}
				}
			});
		}
	}
	return returnFlag;
}