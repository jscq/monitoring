var initAreaMap = "";
var initCodeMap = "";
//$.ajax({
//	type : "get",
//	url : Utils.getRootPath() + '/index/getAreaInfo',
//	data : {
//	},
//	async : false,
//	dataType : 'json',
//	success : function(result) {
//		if(result.status == "OK"){
//			initAreaMap = result.message;
//		}
//		
//	}
//});
//
//$.ajax({
//	type : "get",
//	url : Utils.getRootPath() + '/index/initCode',
//	data : {
//	},
//	async : false,
//	dataType : 'json',
//	success : function(result) {
//		if(result.status == "OK"){
//			initCodeMap = result.message;
//		}
//		
//	}
//});
//初始化行政区划 ---根据id赋值
function initArea(areaId)
{
	$.ajax({
		type : "get",
		url : Utils.getRootPath() + '/index/initArea', 
		data : {
		},
		async : false,
		dataType : 'json',
		success : function(result) {
			if(result.status == "ERROR"){
				$.messager.alert('提示', '行政区划初始化失败', 'error');
			}else if(result.status == "OK")
			{
				if(result.message.length>0)
				{
					for(var i = 0;i<result.message.length;i++)
					{
						$("#"+areaId).append("<option value=" + result.message[i].areaValue + ">" +  result.message[i].areaName + "</option>");
					}
				}
				
			}
			
		}

	});
}

//获取行政区划名称 --（code转name）
function getAreaInfo(val,type)
{
	var str = "";
	$.ajax({
		type : "get",
		url : Utils.getRootPath() + '/index/getAreaInfo',
		data : {
			"value":val,
			"type":type
		},
		async : false,
		dataType : 'json',
		success : function(result) {
			if(result.status == "OK"){
				str = result.message;
			}
			
		}
	});
	return str;
}
//获取行政区划名称 --（code转name）
function getAreaDetailInfo(province,city,county,type)
{
	var str = "";
	$.ajax({
		type : "get",
		url : Utils.getRootPath() + '/index/getAreaDetailInfo',
		data : {
			"province":province,
			"city":city,
			"county":county,
			"type":type
		},
		async : false,
		dataType : 'json',
		success : function(result) {
			if(result.status == "OK"){
				str = result.message;
			}
			
		}
	});
	return str;
}

//初始化行政区划 --（返回字符串）
function initAreaStr()
{
	var options ="";
	$.ajax({
		type : "get",
		url : Utils.getRootPath() + '/index/initArea',
		data : {
		},
		async : false,
		dataType : 'json',
		success : function(result) {
			if(result.status == "ERROR"){
				$.messager.alert('提示', '行政区划初始化失败', 'error');
			}else if(result.status == "OK")
			{
				if(result.message.length>0)
				{
					for(var i = 0;i<result.message.length;i++)
					{
						options+="<option value=" + result.message[i].areaValue + ">" +  result.message[i].areaName + "</option>";
					}
				}
				
			}
			
		}

	});
	return options;
}

//选择行政区划（联动）
function selectArea(parentId,areaId,tempId)
{
	if(parentId!='')
	{
		$.ajax({
			type : "get",
			url : Utils.getRootPath() + '/index/initArea',
			data : {
				"parentId" : parentId
			},
			async : false,
			dataType : 'json',
			success : function(result) {
				if(result.status == "OK")
				{
					if(result.message.length>0)
					{
						if(areaId==tempId)
						{
							$('#'+tempId+' option').remove();
							$("#"+tempId).append("<option value=''>--请选择--</option>");
						}else if(areaId!=tempId)
						{
							$('#'+areaId+' option').remove();
							$('#'+tempId+' option').remove();
							$("#"+areaId).append("<option value=''>--请选择--</option>");
							$("#"+tempId).append("<option value=''>--请选择--</option>");
						}
						for(var i = 0;i<result.message.length;i++)
						{
							$("#"+areaId).append("<option value=" + result.message[i].areaValue + ">" +  result.message[i].areaName + "</option>");
						}
					}
					
				}
				
			}

		});
	}else 
	{
		if(areaId==tempId)
		{
			$('#'+tempId+' option').remove();
			$("#"+tempId).append("<option value=''>--请选择--</option>");
		}else if(areaId!=tempId)
		{
			$('#'+areaId+' option').remove();
			$('#'+tempId+' option').remove();
			$("#"+areaId).append("<option value=''>--请选择--</option>");
			$("#"+tempId).append("<option value=''>--请选择--</option>");
		}
	}
	
}

//初始化下拉编码表并赋值
function initSelectCode(type,id)
{
	console.log(type);
	
	
	var options ="<option value=''>--请选择--</option>";
	$.ajax({
		type : "get",
		url : Utils.getRootPath() + '/index/initCode',
		data : {
			"codeType" : type
		},
		async : false,
		dataType : 'json',
		success : function(result) {
			if (result.status == "OK") {
				for(var i = 0;i<result.message.length;i++)
				{
					options += "<option value='" + result.message[i].codeValue + "'>" +  result.message[i].codeName + "</option>";
					
				}
			} else if (result.status == "ERROR") {
				$.messager.alert('提示', '初始化'+type+'下拉列表失败', 'error');
			}
		}

	});
	$('#'+id).append(options);
}


//初始化下拉编码表并赋值
function initSelectCodeByDefault0(type,id)
{
	var options ="<option value='0'>--请选择--</option>";
	$.ajax({
		type : "get",
		url : Utils.getRootPath() + '/index/initCode',
		data : {
			"codeType" : type
		},
		async : false,
		dataType : 'json',
		success : function(result) {
			if (result.status == "OK") {
				for(var i = 0;i<result.message.length;i++)
				{
					options += "<option value='" + result.message[i].codeValue + "'>" +  result.message[i].codeName + "</option>";
					
				}
			} else if (result.status == "ERROR") {
				$.messager.alert('提示', '初始化'+type+'下拉列表失败', 'error');
			}
		}

	});
	$('#'+id).append(options);
}


//初始化下拉编码表并赋值
function initSelectCodeByDefaultValue(type,id)
{
	var options ="";
	$.ajax({
		type : "get",
		url : Utils.getRootPath() + '/index/initCode',
		data : {
			"codeType" : type
		},
		async : false,
		dataType : 'json',
		success : function(result) {
			if (result.status == "OK") {
				for(var i = 0;i<result.message.length;i++)
				{
					options += "<option value='" + result.message[i].codeValue + "'>" +  result.message[i].codeName + "</option>";
					
				}
			} else if (result.status == "ERROR") {
				$.messager.alert('提示', '初始化'+type+'下拉列表失败', 'error');
			}
		}

	});
	$('#'+id).append(options);
}

//初始化下拉编码表 (加载数据过多只初始化值)
function initSelectCodeValue(type)
{
	var options ="<option value=''>--请选择--</option>";
	$.ajax({
		type : "get",
		url : Utils.getRootPath() + '/index/initCode',
		data : {
			"codeType" : type
		},
		async : false,
		dataType : 'json',
		success : function(result) {
			if (result.status == "OK") {
				for(var i = 0;i<result.message.length;i++)
				{
					options += "<option value='" + result.message[i].codeValue + "'>" +  result.message[i].codeName + "</option>";
					
				}
			} else if (result.status == "ERROR") {
				$.messager.alert('提示', '初始化'+type+'下拉列表失败', 'error');
			}
		}

	});
	return options;
}

//显示编码表值 
function viewSelectCode(type,value)
{
	var returnValue = "";
	$.ajax({
		type : "get",
		url : Utils.getRootPath() + '/index/initCode',
		data : {
			"codeType" : type
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
			} else if (result.status == "ERROR") {
				$.messager.alert('提示', '初始化'+type+'下拉列表失败', 'error');
			}
		}

	});
	return returnValue;
}

//初始化下拉编码表 (加载数据过多只初始化值,无请选择)
function initSelectCodeByDefaultValueCache(type)
{
	var options ="";
	$.ajax({
		type : "get",
		url : Utils.getRootPath() + '/index/initCode',
		data : {
			"codeType" : type
		},
		async : false,
		dataType : 'json',
		success : function(result) {
			if (result.status == "OK") {
				for(var i = 0;i<result.message.length;i++)
				{
					options += "<option value='" + result.message[i].codeValue + "'>" +  result.message[i].codeName + "</option>";
				}
			} else if (result.status == "ERROR") {
				$.messager.alert('提示', '初始化'+type+'下拉列表失败', 'error');
			}
		}

	});
	return options;
}


function  validatePassword(){
	var oldpassword=$('#oldPassword').val();
	var newPassword1=$('#newPassword1').val();
	var newPassword2=$('#newPassword2').val();
	if(oldpassword ==''){
		$.messager.alert('提示', '请填写原密码！', 'warning');
	}else if(newPassword1 ==''){
		$.messager.alert('提示', '请填写新密码！', 'warning');
	}else if(newPassword2 == ''){
		$.messager.alert('提示', '请填写确认密码！', 'warning');
	}else if( newPassword2 == newPassword1){
		$.messager.confirm('提示','确定修改密码？',function(r){
			if(r){
				//验证原始密码的正确性
				var rsult=validateInitPass(oldpassword);
				if(rsult == "OK"){
					var yesOrfault = resetPassword(newPassword1);
					if(yesOrfault =="OK"){
						$.messager.alert('提示', '修改成功，请重新登录！',"info", function() {
							window.location.href="../logout";
						});
					}
				}
			}
		});
	}else {
		$.messager.alert('提示', '新密码与确认密码不一致！', 'warning');
	}
}

/**
 * 验证初始密码的正确性
 * @param oldpassword
 */
function validateInitPass(oldpassword){
	var dataPass="FAIL";
	$.ajax({
		type : "get",
		url : Utils.getRootPath() + '/auth/user/validateInitPass',
		data : {
			"oldpassword" : oldpassword
		},
		async : false,
		dataType : 'json',
		success : function(result) {
			if (result.status == "OK") {
				dataPass=result.status;
			} else if (result.status == "ERROR") {
				$.messager.alert('提示', '原密码错误！', 'error');
			}else{
				$.messager.alert('提示', '系统错误,请联系管理员！', 'error');
			}
		}
	});
	return dataPass;
}
//重置密码
function resetPassword(password){
	var dataPass="FAIL";
	$.ajax({
		type : "get",
		url : Utils.getRootPath() + '/auth/user/resetPassword',
		data : {
			"password" : password
		},
		async : false,
		dataType : 'json',
		success : function(result) {
			if (result.status == "OK") {
				dataPass=result.status;
			} else if (result.status == "ERROR") {
				$.messager.alert('提示', '修改密码失败,请重试！', 'error');
			}else{
				$.messager.alert('提示', '系统错误,请联系管理员！', 'error');
			}
		}

	});
	return dataPass;
}

//格式化数字，pattern为显示小数点位数（不为零的数值），小数情况若不填默认显示为2位
function formatNumber(value,pattern){
	var number = parseFloat(value);
	var str = number + '';
	var decimalIndex = str.indexOf('.');
	//小数
	if(decimalIndex != -1){
		var digit = str.substring(decimalIndex+1,str.length).length;
		if(null != pattern && '' != pattern && 'undefined' != pattern){
			if(digit > pattern){
				number = number.toFixed(pattern);
			}
		}else {
			if(digit > 2){
				number = number.toFixed(2);		
			}
		}
	}
	return number;
}

// js对数字进行截取
var Digit = {};
Digit.round = function(digit, length) {
    length = length ? parseInt(length) : 0;
    if (length <= 0) return Math.round(digit);
    digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length);
    return digit;
};


/**
 * 获得浏览器宽度
 */ 
var windowWidth = function(){
	var pageWidth = window.innerWidth;
	if(typeof pageWidth != 'number'){
		if(document.compatMode == 'CSS1Compat'){
			pageWidth = document.documentElement.clientWidth;
		}else{
			pageWidth = document.body.clientWidth;
		}
	}
	return pageWidth;
};

/**
 * 获得浏览器高度
 */
var windowHeight = function(){
	var pageHeight = window.innerHeight;
	if(typeof pageHeight != 'number'){
		if(document.compatMode == 'CSS1Compat'){
			pageHeight = document.documentElement.clientHeight;
		}else{
			pageHeight = document.body.clientHeight;
		}
	}
	return pageHeight;
};


/**
 * 页面弹框
 * @param url
 * @param title
 * @param x
 * @param y
 */
function add(url,title,x,y)
{
	window.parent.initAdd(url,title,x,y);
}



