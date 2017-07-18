//查询
function searchTeacher(){
	var queryParams = {
		'major.majorName':$('#majorName').val(), // 专业名称
		'major.majorCode':$('#majorCode').val(), // 专业编码
		'major.department.id':$('#departmentId').val() // 系部
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
			// 专业名称校验 
			var checkName = verifyMajorName(parameterName,token);
			
			if(checkName){
				//保存
				var url = Utils.getRootPath() +'/major/addMajor';
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
			        			loadDataGrid("major");
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
	add(Utils.getRootPath()+'/major/editMajorPage?major.id='+id,'编辑专业',850,500); 
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
			var url = Utils.getRootPath() + '/major/deleteMajor?'+ parameterName + "=" + token;
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
						loadDataGrid("major");
					} else if (result.status == "ERROR") {
						$.messager.alert('提示', '删除失败', 'error');
					}
				},
			});
		}
	});
}


/**
 * 验证专业名称唯一性
 *
 * 1.新增   验证名称即可 
 * 2.编辑  和隐藏的名称比较,如果相同不校验,如果不同则需校验
 */  
function verifyMajorName(parameterName,token)
{
	var checkFlag = false;
	var returnFlag = false;

	//隐藏功能名称
	var hiddenMajorName = $("#hiddenMajorName").val();
	var majorName = $("#majorName").val();
	
	majorName = majorName.replace(/(^\s*)|(\s*$)/g, "");
	
	if ((hiddenMajorName=='')||(hiddenMajorName != '' && hiddenMajorName != majorName)) 
	{
		checkFlag = true;
	}else if(hiddenMajorName != '' && hiddenMajorName == funcName)
	{
		return true;
	}
	
	if(checkFlag)
	{
		if(majorName!='')
		{

			$.ajax({
				type : "post",
				url : Utils.getRootPath() + '/major/verifyMajorName?'+ parameterName + "=" + token,
				data : {
					"major.majorName" : majorName
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
						$.messager.alert('提示', '专业名称已存在，请重新输入专业名称', 'warning');
					}
				}
			});
		}
	}
	return returnFlag;
}
