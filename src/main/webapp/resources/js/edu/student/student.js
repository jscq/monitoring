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
 * 选择专业
 */
var checkMajor = function(departmentId){
	// 清空专业和班级
	$('#major option').remove();
	$('#classRomm option').remove();

	// 通过系部id获得专业
	var url = Utils.getRootPath() +'/student/selectMajor';
	$.ajax({
        type: "POST",
        url: url,
        data:{
        	'department.id':departmentId
        },
        async: false,
        dataType: 'json',
        error: function(request) {
        	$.messager.alert('提示','系统异常,请稍后重新再试!','error');
        },
        success: function(result) 
        {
        	if (null != result && result.status == "OK"){
        		if(result.message.length>0)
				{
					var options = "<option value=''>--请选择--</option>";
					for(var i = 0;i<result.message.length;i++)
					{
						options+="<option value=" + result.message[i].id + ">--" +  result.message[i].majorName + "--</option>";
					}
					
					$("#major").append(options);
				}
            } 
        }
    });
}

/**
 * 选择班级
 */
var checkClassRomm = function(majorId){
	$('#classRomm option').remove();

	// 通过系部id获得专业
	var url = Utils.getRootPath() +'/student/selectClassRomm';
	$.ajax({
        type: "POST",
        url: url,
        data:{
        	'major.id':majorId
        },
        async: false,
        dataType: 'json',
        error: function(request) {
        	$.messager.alert('提示','系统异常,请稍后重新再试!','error');
        },
        success: function(result) 
        {
        	if (null != result && result.status == "OK"){
        		if(result.message.length>0)
				{
					var options = "<option value=''>--请选择--</option>";
					for(var i = 0;i<result.message.length;i++)
					{
						options+="<option value=" + result.message[i].id + ">--" +  result.message[i].classRoomName + "--</option>";
					}
					
					$("#classRomm").append(options);
				}
            } 
        }
    });
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

/**
 * 上传图片
 */
var showWinPic = function()
{
	$('#showPic').window({  
		title:'上传图片',
		closable: true,
		collapsible: false,
	  	minimizable: false,
	   	maximizable: false,	
	   	resizable: false,
	   	modal: false,
		draggable:false
	});
	$("#showPic").window('open');
}


//上传图片到服务器
function savePic(obj){
	var imgName = obj.value;
	var pos = imgName.lastIndexOf(".");
	var fileName = imgName.substring(pos+1);
	//处理图片路径
	
	console.log(imgName);
	
	imgName = getFileName(imgName);
	if(fileName == "jpg" || fileName == "JPG" || fileName == "jpeg" || fileName == "JPEG" || fileName == "png" || fileName == "PNG"|| fileName == "bmp" || fileName == "BMP" || fileName == "gif" || fileName == "GIF"){
		if(navigator.userAgent.indexOf("MSIE")>0) {//是IE
			$("#uploadForm").ajaxSubmit(function(result){
				result = result.replace("<pre>","");
				result = result.replace("<PRE>","");
				result = result.replace("</pre>","");
				result = result.replace("</PRE>","");
				
				var resultObj = eval('('+result+')');
				
	            if (resultObj.msg == "success"){
	            	
	            	$("#attachmentName").attr("value", resultObj.fileName);
	            	$("#attachmentPath").attr("value", resultObj.filePath);
	            	$("#documentName").attr("value", resultObj.documentName);
	            	
	            	$.messager.alert('提示','图片上传成功！','info');
	            	flag = 0;
	            	
	            } else if(resultObj.msg == "fail"){
	            	$.messager.alert('提示','图片文件大小不得大于5M！','warning');
					return;
	            }
			});
		}else{//不是IE
			$("#uploadForm").ajaxSubmit(function(result){
				result = result.substring(result.indexOf("{"),result.indexOf("}")+1);
				var result = eval('('+result+')');
	            if (result.msg == "success"){
	            	
	            	$("#attachmentName").attr("value", result.fileName);
	            	$("#attachmentPath").attr("value", result.filePath);
	            	$("#documentName").attr("value", result.documentName);
	            	
	            	$.messager.alert('提示','图片上传成功！','info');
	            	flag = 0;
	            	
	            	//显示图片
	            	var url = Utils.getBasePath() + result.filePath + "/" +  result.fileName;
	            	$("#picSpan").html('');
	            	$("#picSpan").append("<img src='"+url+"' width='100px' height='110px' />");
	            	//显示删除按钮
	            	$("#buttonSpan").html('');
	            	$("#buttonSpan").append("<a href='javascript:void(0);' onclick=deleteUploadPic() style='color:red'>删除</a>");	
	            } else if(result.msg == "fail"){
	            	$.messager.alert('提示','图片文件大小不得小于20K或大于5M！','warning');
					return;
	            }
			});
		}
	}else{
		$.messager.alert('提示','请选择一张图片上传！','warning');
		flag = 2;
		return;
	}
}

//图片路径处理
function getFileName(path){
	var pos1 = path.lastIndexOf('/');
	var pos2 = path.lastIndexOf('\\');
	var pos = Math.max(pos1, pos2);
	return path.substring(pos+1);
}
