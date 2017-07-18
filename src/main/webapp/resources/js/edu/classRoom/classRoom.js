 /**
 * 改变专业
 */
var changeMajor = function(value){
	
	if(null != value && '' != value){
		var url = Utils.getRootPath() +'/major/getMajorByDepartmentId';
		$.ajax({
	        type: "POST",
	        url: url,
	        data:{
	        	'major.department.id':value
	        },
	        async: false,
	        dataType: 'json',
	        error: function(request) {
	        	$.messager.alert('提示','系统异常,请稍后重新再试!','error');
	        },
	        success: function(result) 
	        {
	        	if(result.status != 'ERROR' && result.message.length > 0){
	        		for(var i = 0;i<result.message.length;i++)
					{
						$("#majorSelect").append("<option value=" + result.message[i].id + ">" +  result.message[i].majorName + "</option>");
					}
	        	}else{
	        		// 清空专业选择
					$('#majorSelect option').remove();
					$("#majorSelect").append("<option value=''>--请选择--</option>");
	        	}
	        }
	    });
	}else{
		// 清空专业选择
		$('#majorSelect option').remove();
		$("#majorSelect").append("<option value=''>--请选择--</option>");
	}
	
	
};	


//查询
function searchClassRoom(){
	var queryParams = {
		'classRoom.year':$('#year').val(), // 入学年份
		'classRoom.major.department.id':$('#departmentId').val(), // 系部名称
		'classRoom.major.id':$('#majorSelect').val(), // 专业名称
		'classRoom.classRoomName':$('#classRoomName').val() // 班级名称
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
			// 班级名称校验 
			var checkName = verifyClassRoomName(parameterName,token);
			
			if(checkName){
				//保存
				var url = Utils.getRootPath() +'/classRoom/addClassRoom';
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
			        			loadDataGrid("classRoom");
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
	add(Utils.getRootPath()+'/classRoom/editClassRoomPage?classRoom.id='+id,'编辑班级',850,500); 
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
			var url = Utils.getRootPath() + '/classRoom/deleteClassRoom?'+ parameterName + "=" + token;
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
						loadDataGrid("classRoom");
					} else if (result.status == "ERROR") {
						$.messager.alert('提示', '删除失败', 'error');
					}
				},
			});
		}
	});
}


/**
 * 验证班级名称唯一性
 *		同系部同专业下不能重复即可
 * 1.新增   验证班级即可 
 * 2.编辑  和隐藏的名称比较,如果相同不校验,如果不同则需校验
 */  
function verifyClassRoomName(parameterName,token)
{
	var checkFlag = false;
	var returnFlag = false;

	//隐藏功能名称
	var hiddenClassRoomName = $("#hiddenClassRoomName").val();
	var classRoomName = $("#classRoomName").val();
	
	classRoomName = classRoomName.replace(/(^\s*)|(\s*$)/g, "");
	
	if ((hiddenClassRoomName=='')||(hiddenClassRoomName != '' && hiddenClassRoomName != classRoomName)) 
	{
		checkFlag = true;
	}else if(hiddenClassRoomName != '' && hiddenClassRoomName == classRoomName)
	{
		return true;
	}
	
	if(checkFlag)
	{
		$.ajax({
				type : "post",
				url : Utils.getRootPath() + '/classRoom/verifyClassRoomName?'+ parameterName + "=" + token,
				data : {
					"classRoom.year" : $("#year").val(),
					"classRoom.major.department.id" : $("#departmentId").val(),
					"classRoom.major.id" : $("#majorSelect").val(),
					"classRoom.classRoomName" : classRoomName
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
						$.messager.alert('提示', '班级名称已存在，请重新输入专业名称', 'warning');
					}
				}
			});
	}
	return returnFlag;
}
