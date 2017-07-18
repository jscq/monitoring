//查询
function searchDepartment(){
	var queryParams = {
		'department.departmentName':$('#departmentName').val(), // 系部名称
		'department.departmentCode':$('#departmentCode').val() // 系部编码
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
			// 系部名称校验 
			var checkName = verifyDepartmentName(parameterName,token);
			
			if(checkName){
				//保存
				var url = Utils.getRootPath() +'/department/addDepartment';
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
			        			loadDataGrid("department");
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
	add(Utils.getRootPath()+'/department/editDepartmerntPage?department.id='+id,'编辑系部',850,500); 
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
	
	$.messager.confirm('提示', '是否确定删除？', function(r) {
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
			var url = Utils.getRootPath() + '/department/deleteDepartment?'+ parameterName + "=" + token;
			$.ajax({
				type : "post",
				url : url,
				data : {
					"id" : str
				},
				async : false,
				dataType : 'json',
				success : function(result) {
					if (result.status == "OK") {
						
						loadDataGrid("department");
					} else if (result.status == "ERROR") {
						$.messager.alert('提示', '删除失败', 'error');
					}
				},
			});
		}
	});
}


/**
 * 验证系部名称唯一性
 *
 * 1.新增   验证名称即可 
 * 2.编辑  和隐藏的名称比较,如果相同不校验,如果不同则需校验
 */  
function verifyDepartmentName(parameterName,token)
{
	var checkFlag = false;
	var returnFlag = false;

	//隐藏功能名称
	var hiddenDepartmentName = $("#hiddenDepartmentName").val();
	var departmentName = $("#departmentName").val();
	departmentName = departmentName.replace(/(^\s*)|(\s*$)/g, "");
	
	if ((hiddenDepartmentName=='')||(hiddenDepartmentName != '' && hiddenDepartmentName != departmentName)) 
	{
		checkFlag = true;
	}else if(hiddenDepartmentName != '' && hiddenDepartmentName == funcName)
	{
		return true;
	}
	
	if(checkFlag)
	{
		if(departmentName!='')
		{

			$.ajax({
				type : "post",
				url : Utils.getRootPath() + '/department/verifyDepartmentName?'+ parameterName + "=" + token,
				data : {
					"department.departmentName" : departmentName
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
						$.messager.alert('提示', '系部名称已存在，请重新输入系部名称', 'warning');
					}
				}
			});
		}
	}
	return returnFlag;
}
