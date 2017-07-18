function add(url,title,x,y)
{
	window.parent.initAdd(url,title,x,y);
}

//查询
function searchDept(){
	var queryParams = {
		'sysQuery.deptName' : $("#deptName").val(),
		'sysQuery.deptCode':$('#deptCode').val()
	};        	
	$('#dg').datagrid('options').queryParams = queryParams;
	$("#dg").datagrid('load'); 
}

function save(formId,parameterName,token)
{
	//数据有限性判断
	if (validateSubmit(formId)) {
		//判断部门名称不能重复
		if(verifyDeptName(parameterName,token)){
			//保存
			var url = Utils.getRootPath() +'/department/saveDept';
			$.ajax({
		        type: "POST",
		        url: url,
		        data:$('#'+formId).serialize(),
		        async: false,
		        dataType: 'json',
		        error: function(request) {
		        	$.messager.alert('提示','保存失败，请联系管理员','error');
		        },
		        success: function(result) 
		        {
		        	if (null != result && result.status == "OK"){
		        		$.messager.alert('提示','保存成功','info',function(){
		        			loadDataGrid();
		                	window.parent.closeWinForm();
		        		});
		            } else{
		            	$.messager.alert('提示','保存失败，请联系管理员','error');
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
	var id = selections();
	add(Utils.getRootPath()+'/department/editDept?department.id='+id,'编辑部门',850,500); 
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

/**
 * 删除
 */
function del(parameterName,token){
	
	var rows = $('#dg').datagrid('getSelections');
	if (rows.length == 0) {
		$.messager.alert('提示', '请选择需要操作的数据！', 'warning');
		return;
	}
	
	$.messager.confirm('提示', '是否确定删除，若有下级部门一并删除？', function(r) {
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
			var url = Utils.getRootPath() + '/department/deleteDept?'
					+ parameterName + "=" + token;
			$.ajax({
				type : "post",
				url : url,
				data : {
					"deptIds" : str
				},
				async : false,
				dataType : 'json',
				success : function(result) {
					if (result.status == "OK") {
		        		loadDataGrid();
					} else if (result.status == "ERROR") {
						$.messager.alert('提示', '删除失败', 'error');
					}
				},
			});
		}
	});
}

//关闭修改页面和新增页面，刷新主列表
function loadDataGrid(){
	$(window.parent.document).contents().find("#iframe")[0].contentWindow.searchDept();
}

//为当前选择的部门添加用户
function distributeUsers(title){
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
	add(Utils.getRootPath()+'/department/gotoDistributeUsers?department.id='+id,title,850,500);
}

//查询当前选择的部门中所有的用户
function searchDepartUsers(title){
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
	add(Utils.getRootPath()+'/department/gotoSearchDepartUsers?department.id='+id,title,850,500); 
}

//验证部门名称唯一性  
function verifyDeptName(parameterName,token)
{
	var checkFlag = false;
	var returnFlag = false;
	//隐藏部门名称
	var hiddenDeptName = $("#hiddenDeptName").val();
	var deptName = $("#deptName").val();
	deptName = deptName.replace(/(^\s*)|(\s*$)/g, "");
	if ((hiddenDeptName=='')||(hiddenDeptName != '' && hiddenDeptName != deptName)) 
	{
		checkFlag = true;
	}else if(hiddenDeptName != '' && hiddenDeptName == deptName)
	{
		return true;
	}	
	if(checkFlag)
	{
		if(deptName!='')
		{
			$.ajax({
				type : "post",
				url : Utils.getRootPath() + '/department/verifyDeptName?'+ parameterName + "=" + token,
				data : {
					"deptName" : deptName
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
						$.messager.alert('提示', '部门名称已存在，请重新输入部门名称', 'warning');
					}
				}
			});
		}
	}
	return returnFlag;
}
