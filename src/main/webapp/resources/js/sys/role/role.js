function add(url,title,x,y)
{
	window.parent.initAdd(url,title,x,y);
}

//查询
function searchRole(){
	var queryParams = {
		'sysQuery.roleName' : $("#roleName").val(),
		'sysQuery.roleCode' : $('#roleCode').val()
	};        	
	$('#dg').datagrid('options').queryParams = queryParams;
	$("#dg").datagrid('load'); 
}

function saveRole(formId,parameterName,token)
{
	//数据有限性判断
	if (validateSubmit(formId)) {
		//判断功能名称不能重复
		if(verifyRoleName(parameterName,token)){
			//保存
			var url = Utils.getRootPath() +'/role/saveRole?'+ parameterName + "=" + token;
			$.ajax({
		        type: "POST",
		        url: url,
		        data:$('#'+formId).serialize(),
		        async: false,
		        dataType: 'json',
		        error: function(request) {
		        	$.messager.alert('提示','保存失败','error');
		        },
		        success: function(result) 
		        {
		        	if (null != result && result.status == "OK"){
		        		$.messager.alert('提示','保存成功','info',function(){
		        			loadDataGrid();
		                	window.parent.closeWinForm();
		        		});
		            } else{
		            	$.messager.alert('提示','保存失败','error');
		            }
		        }
		    });
		}
	}
}

/**
 * 编辑
 */
function editRole(){
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
	var id = selections();
	add(Utils.getRootPath()+'/role/editRole?roles.id='+id,'编辑角色',850,500); 
};

/**
 * 非空判断
 * @param str
 * @returns {Boolean}
 */
function isNotEmpty(str){
	var b = false;
	if(null != str && '' != str){
		b = true;
	}
	return b;
}

/**
 * 获得选中行
 */
function selections(){
	var selectId = "";
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
	var row = rows[0];
	
	selectId = row.id;
	
	return selectId;
}

function clearForm(ff)
{	
	var elements = ff.elements;
    for(var i = 0; i < elements.length; i++){
        var element = elements[i];
        if(element.type=="text"){
            element.value = "";
        }else if(element.type=="radio" || element.type=="checkbox"){
        	element.checked = false;
        }else if(element.options!=null){
        	element.options[0].selected  = true;
        }
    }
}

/**
 * 删除
 */
function delRole(parameterName,token){
	
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
			var url = Utils.getRootPath() + '/role/deleteRole?'+ parameterName + "=" + token;
			$.ajax({
				type : "post",
				url : url,
				data : {
					"roleIds" : str
				},
				async : false,
				dataType : 'json',
				success : function(result) {
					if (null != result && result.status == "OK") {
						loadDataGrid();
					} else {
						$.messager.alert('提示', '删除失败', 'error');
					}
				},
			});
		}
	});
}

//添加操作权限
function distributeFunction(title){
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
	var id = selections();
	add(Utils.getRootPath()+'/role/gotoDistributeFunction?roles.id='+id,title,850,500);
}

//查看操作权限
function searchDepartFunction(title){
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
	var id = selections();
	add(Utils.getRootPath()+'/role/gotoSearchDepartFunction?roles.id='+id,title,850,500);
}

//验证角色名称唯一性  
function verifyRoleName(parameterName,token)
{
	var checkFlag = false;
	var returnFlag = false;
	//隐藏角色名称
	var hiddenRoleName = $("#hiddenRoleName").val();
	var roleName = $("#roleName").val();
	roleName = roleName.replace(/(^\s*)|(\s*$)/g, "");
	if ((hiddenRoleName=='')||(hiddenRoleName != '' && hiddenRoleName != roleName)) 
	{
		checkFlag = true;
	}else if(hiddenRoleName != '' && hiddenRoleName == roleName)
	{
		return true;
	}	
	if(checkFlag)
	{
		if(roleName!='')
		{
			$.ajax({
				type : "post",
				url : Utils.getRootPath() + '/role/verifyRoleName?'+ parameterName + "=" + token,
				data : {
					"roleName" : roleName
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
						$.messager.alert('提示', '角色名称已存在，请重新输入角色名称', 'warning');
					}
				}
			});
		}
	}
	return returnFlag;
}

//关闭修改页面和新增页面，刷新主列表
function loadDataGrid(){
	$(window.parent.document).contents().find("#iframe")[0].contentWindow.searchRole();
}

//删除
function deleteDistributeRoles(){ 
	//用户ID
	var userId = $("#userId").val();
	//获取选择的用户信息
	var selectIds = "";
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length==0)
	{
		$.messager.alert('提示','请选择需要操作的数据！','warning');
		return;
	}
	for(var i = 0; i < rows.length; i++){
		var row = rows[i];
		var roleId = row.id;
		if(i == 0){
			selectIds = roleId;
		}else{
			selectIds = selectIds + "@_@" + roleId;
		}
	}
	
	var parameterName = $("#parameterName").val();
	var token = $("#token").val();
	var url = Utils.getRootPath() +'/userRoleRelation/deleteDistributeRoles?' + parameterName + "=" + token;
	$.ajax({
        type: "post",
        url:url,
        data:{'userRoleRelation.user.id':userId, 'userRoleRelation.roles.id':selectIds},
        async: false,
        dataType: 'json',
        success: function(result) 
        {
     		$.messager.alert('提示','删除成功','info',function(){
     			window.location.reload();
     			return;
     		});
        }
    });
}


//添加用户到部门
function distributeRoles(){
	//用户ID
	var userId = $("#userId").val();
	//获取选择的用户信息
	var selectIds = "";
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length==0)
	{
		$.messager.alert('提示','请选择需要操作的数据','warning');
		return;
	}
	for(var i = 0; i < rows.length; i++){
		var row = rows[i];
		var roleId = row.id;
		if(i == 0){
			selectIds = roleId;
		}else{
			selectIds = selectIds + "@_@" + roleId;
		}
	}
	
	var parameterName = $("#parameterName").val();
	var token = $("#token").val();
	var url = Utils.getRootPath() +'/userRoleRelation/distributeRoles?' + parameterName + "=" + token;
	$.ajax({
      type: "post",
      url:url,
      data:{'userRoleRelation.user.id':userId, 'userRoleRelation.roles.id':selectIds},
      async: false,
      dataType: 'json',
      success: function(result) 
      {
   		$.messager.alert('提示','用户分配成功','info',function(){
   			window.location.reload();
   			return;
   		});
      }
  });
}