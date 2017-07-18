//添加
function add(url,title,x,y)
{	
	window.parent.initAdd(url,title,x,y);	
}

//编辑
function edit(title,x,y)
{
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

	if(row.username == "admin"){
		$.messager.alert('提示','无法对超级管理员操作！','warning');
		return;
	}
	var url = Utils.getRootPath() +'/auth/user/gotoEditUsers?id='+row.id;
	add(url,title,x,y);
}



//查询
function searchUser(){
	
	var queryParams = {
		'user.username':$('#username').val(),
		'user.userState':$("#userState option:selected").val()
	};
	$('#dg').datagrid('options').queryParams = queryParams;
	$("#dg").datagrid('load');
}

//保存货方会员基本信息
function saveBaseInfo(formId,parameterName,token)
{
	
//	var userPost = $("#userPost").val();
//	// 大区经理
//	if(userPost == 5){
//		var areaType = $("#areaType").val();
//		if(areaType == null || areaType == ''){
//			$.messager.alert('提示','请选择大区经理分管区域！','warning');
//			return;
//		}
//	}
//	// 省级经理
//	if(userPost == 6){
//		var province = $("#province").val();
//		if(province == null || province == ''){
//			$.messager.alert('提示','请选择省级经理分管区域！','warning');
//			return;
//		}
//	}
//	// 省级副经理
//	if(userPost == 7){
//		var province = $("#province").val();
//		if(province == null || province == ''){
//			$.messager.alert('提示','请选择省级副经理分管区域！','warning');
//			return;
//		}
//	}
	
	//var t = $('#areaPyramidIdTree').combotree('tree');	// 获取树对象
	//var n = t.tree('getSelected');		// 获取选择的节点
	
	var getAllId = $('#areaPyramidIdTree').combotree("getValues");
	if(getAllId != ""){
		$("#areaPyramidId").val(getAllId);
	}else{
		$("#areaPyramidId").val("");
	}
	
	//alert(n.text);
	
	//if(n != null){
	//	if(n.id != null && n.id != ""){
	//		
	//	}else{
	//		$.messager.alert('提示','请选择分管区域！','warning');
	//		return;
	//	}
	//}else{
	//	$.messager.alert('提示','请选择分管区域！','warning');
	//	return;
	//}

	//数据有限性判断
	if (validateSubmit(formId)) {
		//判断用户名不能重复
		if(verifyUserName(parameterName,token)){
			//保存
			var url = Utils.getRootPath() +'/auth/user/saveUserBaseInfo';
			$.ajax({
		        type: "post",
		        url:url,
		        data:$('#'+formId).serialize(),
		        async: false,
		        dataType: 'json',
		        success: function(result) 
		        {
		        	if (result.status == "OK"){
		            	$.messager.alert('提示','保存成功','info',function(){
		            		loadDataGrid();
		            		window.parent.closeWinForm();
		            	});
		            } else if(result.status == "ERROR"){
		            	if(result.message == "error"){
		            		$.messager.alert('提示','保存失败，分管区域只能选择同级目录！','error');
		            	}else{
		            		$.messager.alert('提示','保存失败，请联系管理员','error');
		            	}
		            }
		        }
		    });
		}
	}
}



//验证用户名唯一性  
function verifyUserName(parameterName,token)
{
	var checkFlag = false;
	var returnFlag = false;
	//隐藏用户名
	var hiddenUserName = $("#hiddenUserName").val();
	var userName = $("#userName").val();
	userName = userName.replace(/(^\s*)|(\s*$)/g, "");
	if ((hiddenUserName=='')||(hiddenUserName != '' && hiddenUserName != userName)) 
	{
		checkFlag = true;
	}else if(hiddenUserName != '' && hiddenUserName == userName)
	{
		return true;
	}	
	if(checkFlag)
	{
		if(userName!='')
		{
			$.ajax({
				type : "post",
				url : Utils.getRootPath() + '/auth/user/verifyUserName?'+ parameterName + "=" + token,
				data : {
					"userName" : userName
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
						$.messager.alert('提示', '用户名已存在，请重新输入用户名', 'warning');
					}
				}
			});
		}
	}
	return returnFlag;
}

//关闭修改页面和新增页面，刷新主列表
function loadDataGrid(){
	$(window.parent.document).contents().find("#iframe")[0].contentWindow.searchUser();
}

//为当前选择的部门分配角色
function distributeRoles(title){
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
	add(Utils.getRootPath()+'/auth/user/gotoDistributeRoles?user.id='+id,title,850,500);
}

//查询当前选择的部门中所有的角色
function searchUserRoles(title){
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
	add(Utils.getRootPath()+'/auth/user/gotoSearchUserRoles?user.id='+id,title,850,500); 
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
    for(var i = 0;i<elements.length;i++){
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

//重置密码
function resetPassword(parameterName,token){
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
	
	$.messager.confirm('提示','是否确认重置密码，默认密码为888888',function(r){
		if(r){
			var id = selections();
			
			var url = Utils.getRootPath() +'/auth/user/resetPasswordByAdmin?' + parameterName + "=" + token;
			$.ajax({
		        type: "post",
		        url:url,
		        data:{
		        	"userId" : id
		        },
		        async: false,
		        dataType: 'json',
		        success: function(result) 
		        {
		        	if (null != result && result.status == "OK"){
		        		$.messager.alert('提示','重置成功','info');
		            } else{
		            	$.messager.alert('提示','重置失败，请联系管理员','error');
		            }
		        }
		    });
		}
	});
}

//显示编码表值 
function viewUserPost(value)
{
	var returnValue = "";
	$.ajax({
		type : "get",
		url : Utils.getRootPath() + '/index/initCode',
		data : {
			"codeType" : "userPost"
		},
		async : false,
		dataType : 'json',
		success : function(result) {
			if (result.status == "OK") {
				for(var i = 0;i<result.message.length;i++)
				{
					if(result.message[i].codeValue==value)
					{
						returnValue = result.message[i].codeName;
					}
				}
			} 
		}
	});
	return returnValue;
}

//添加用户到部门
function distributeUsers(){
	//部门ID
	var departmentId = $("#departmentId").val();
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
		var userId = row.id;
		if(i == 0){
			selectIds = userId;
		}else{
			selectIds = selectIds + "@_@" + userId;
		}
	}
	
	var parameterName = $("#parameterName").val();
	var token = $("#token").val();
	var url = Utils.getRootPath() +'/userDeptRelation/distributeUsers?' + parameterName + "=" + token;
	$.ajax({
        type: "post",
        url:url,
        data:{'userDeptRelation.user.id':selectIds, 'userDeptRelation.department.id':departmentId},
        async: false,
        dataType: 'json',
        success: function(result) 
        {
     		$.messager.alert('提示','用户分配成功！','info',function(){
     			window.location.reload();
     			return;
     		});
        }
    });
}

//添加用户到部门
function deleteDistributeUsers(){
	//部门ID
	var departmentId = $("#departmentId").val();
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
		var userId = row.id;
		if(i == 0){
			selectIds = userId;
		}else{
			selectIds = selectIds + "@_@" + userId;
		}
	}
	
	var parameterName = $("#parameterName").val();
	var token = $("#token").val();
	var url = Utils.getRootPath() +'/userDeptRelation/deleteDistributeUsers?' + parameterName + "=" + token;
	$.ajax({
        type: "post",
        url:url,
        data:{'userDeptRelation.user.id':selectIds, 'userDeptRelation.department.id':departmentId},
        async: false,
        dataType: 'json',
        success: function(result) 
        {
     		$.messager.alert('提示','删除成功！','info',function(){
     			window.location.reload();
     			return;
     		});
        }
    });
}

function updateUserStatus(userState,parameterName,token){
	//获取选择的用户信息
	var selectIds = "";
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length==0)
	{
		$.messager.alert('提示','请选择需要操作的数据！','warning');
		return;
	}
	
	$.messager.confirm('提示','是否确定修改用户状态？',function(r){
	if(r){
	
		for(var i = 0; i < rows.length; i++){
			var row = rows[i];
			var roleId = row.id;
			if(i == 0){
				selectIds = roleId;
			}else{
				selectIds = selectIds + "," + roleId;
			}
		}
		
		var url = Utils.getRootPath() +'/auth/user/deleteUsers?' + parameterName + "=" + token;
		$.ajax({
	        type: "post",
	        url:url,
	        data:{'userState':userState,'userIds':selectIds},
	        async: false,
	        dataType: 'json',
	        success: function(result) 
	        {
	
	        	$.messager.alert('提示','用户状态修改成功！','info',function(){
	     			window.location.reload();
	     			return;
	     		});
	        	
	        }
			});
		}
	});
}
 
function searchUser1(){
	var queryParams = {
		'user.username':$('#username').val(),
		'user.userState':$("#userState option:selected").val()
	};
	$('#dg').datagrid('options').queryParams = queryParams;
	$("#dg").datagrid('load');
}