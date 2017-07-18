//*******************************长度验证**********************************
function getBytes(str) {
	var cArr = str.match(/[^\x00-\xff]/ig);
	return str.length + (cArr == null ? 0 : cArr.length);
};
//*******************************字符串全局替换*****************************
String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
	if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
		return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")),replaceWith);
	} else {
		return this.replace(reallyDo, replaceWith);
	}
};

//Date时间转换
function formatterDate(val) {
	if (null != val && '' != val) 
	{
		//ie转化格式
		if(navigator.userAgent.indexOf("MSIE")>0 && 'NaN' == (new Date(val))) 
		{
			val = val.replace(/-/g,"/");
		}
		var date = new Date(val);
		//月
		var month = date.getMonth() + 1;
		if(month < 10){
			month = "0" + month;
		}
		//日
		var day = date.getDate();
		if(day < 10){
			day = "0" + day;
		}
		
		return date.getFullYear() + '-' + month + '-' + day;
	}
}

//Date时间转换
function formatterDateByM(val) {
	if (null != val && '' != val) 
	{
		//ie转化格式
		if(navigator.userAgent.indexOf("MSIE")>0 && 'NaN' == (new Date(val))) 
		{
			val = val.replace(/-/g,"/");
		}
		var date = new Date(val);
		var month = date.getMonth() + 1;
		if(month < 10)
			month = "0" + month;
		var day = date.getDate();
		if(day < 10)
			day = "0" + day;
		var hour = date.getHours();
		if(hour < 10)
			hour = "0" + hour;
		var minute = date.getMinutes();
		if(minute < 10)
			minute = "0" + minute;
		return date.getFullYear() + '-' + month + '-' + day+' '+hour+':'+minute;
	}
};

//Date时间转换年-月-日  时:分:秒
function formatterCompleteDate(val) {
	
	if (null != val && '' != val) 
	{
		//ie转化格式
		if(navigator.userAgent.indexOf("MSIE")>0  && 'NaN' == (new Date(val))) 
		{
			val = val.replace(/-/g,"/");
		}
		var date = new Date(val);
		var month = date.getMonth() + 1;
		if(month < 10)
			month = "0" + month;
		var day = date.getDate();
		if(day < 10)
			day = "0" + day;
		var hour = date.getHours();
		if(hour < 10)
			hour = "0" + hour;
		var minute = date.getMinutes();
		if(minute < 10)
			minute = "0" + minute;
		var second = date.getSeconds();
		if(second < 10)
			second = "0" + second;
		return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
	}
};

function getCurentDate()
{ 
    var now = new Date();
   
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
   
    var clock = year + "";
   
    if(month < 10)
        clock += "0";
   
    clock += month + "";
   
    if(day < 10)
        clock += "0";
       
    clock += day;
   
    return(clock); 
} 


//*********************************表单验证******************************
$(function(){
	
	$("input[precision]").each(function(){
		var precision = $(this).attr("precision");
		
		var regex = new RegExp("^\\d*(?:\\.\\d{0,"+precision+"})?$");
		//ie浏览器
		if(navigator.userAgent.indexOf("MSIE")>0) {
			var browser = navigator.userAgent.toLowerCase();
			var vesion = parseFloat(browser.match(/msie ([\d]+)/)[1]);
			//ie9以上版本弃用onpropertychange方法
			if(vesion < 9){
				$(this).bind("propertychange", function() {
					if(this.value==this.value2){
						return;
					}
					if(this.value.search(regex)==-1){
						$(this).val((this.value2)?this.value2:'');
					}else{
						this.value2=this.value;
					}
				}); 
			}else{
				$(this).on('input',function(){  
					if(this.value==this.value2){
						return;
					}
					if(this.value.search(regex)==-1){
						$(this).val((this.value2)?this.value2:'');
					}else{
						this.value2=this.value;
					}  
				}); 
			}
		}else {
			$(this).on('input',function(){  
				if(this.value==this.value2){
					return;
				}
				if(this.value.search(regex)==-1){
					$(this).val((this.value2)?this.value2:'');
				}else{
					this.value2=this.value;
				} 
			}); 
		}
	});
}); 

function validateSubmit(formId)
{
	var isSubmit = true;
	$("#"+formId+" :input[reg]").each(function(){
		var tip = $(this).attr("tip");
		if(!validate($(this),tip)){ 
			isSubmit = false;
			return false;
		} 
	});
	return isSubmit;
}

function validate(obj,tip){
	if(null == tip || '' == tip){
		tip = "请填写正确格式";
	}
	
	var reg = comparison(obj.attr("reg"));   //属性
	var objValue = obj.attr("value"); 
	objValue = objValue.replace(/(^\s*)|(\s*$)/g, "");
	
	if(obj.attr("reg") == "IdCard" || obj.attr("reg") == "NullOrIdCard"){
		if(obj.attr("reg") == "NullOrIdCard" && (objValue == null || objValue == "")){
			return true;
		}else {
			if(!validateIdCard(objValue)){
				$.messager.alert('提示', tip, 'warning');
				return false;
			}else {
				return true;
			}
		}
	}else{
		if(reg!=null && !reg.test(objValue)){ 
			$.messager.alert('提示', tip, 'warning');
			return false;
		}else {
			return true;
		}
	}
}

function validateSubmitByAlert(formId)
{
	var isSubmit = true;
	$("#"+formId+" :input[reg]").each(function(){
		var tip = $(this).attr("tip");
		if(!validateByAlert($(this),tip)){ 
			isSubmit = false;
			return false;
		} 
	});
	return isSubmit;
}

function validateByAlert(obj,tip){
	if(null == tip || '' == tip){
		tip = "请填写正确格式";
	}
	var reg = comparison(obj.attr("reg"));   //属性
	var objValue = obj.attr("value"); 
	objValue = objValue.replace(/(^\s*)|(\s*$)/g, "");
	
	if(obj.attr("reg") == "IdCard" || obj.attr("reg") == "NullOrIdCard"){
		if(obj.attr("reg") == "NullOrIdCard" && (objValue == null || objValue == "")){
			return true;
		}else {
			if(!validateIdCard(objValue)){
				alert(tip);
				return false;
			}else {
				return true;
			}
		}
	}else{
		if(reg!=null && !reg.test(objValue)){ 
			alert(tip);
			return false;
		}else {
			return true;
		}
	}
}


function comparison(obj)
{
	switch(obj)
	{
		case "Email":
			return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		case "NullOrEmail":
			return /null|^$|^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		case "Chinese":
			return /^[\u0391-\uFFE5]+$/;
		case "Require":
			return /.+/;
		case "Phone":
		    return /^0\d{2,3}-?\d{7,8}$/;
		case "NullOrPhone":
		    return /null|^$|^0\d{2,3}-?\d{7,8}$/;  
		case "Mobile":
		    return /^0?1[3|4|5|7|8][0-9]\d{8}$/;
		case "NullOrMobile":
		    return /null|^$|^0?1[3|4|5|7|8][0-9]\d{8}$/;
		case "MobileOrPhone":
			return /^0?1[3|4|5|7|8][0-9]\d{8}|^0\d{2,3}-?\d{7,8}$/;
		case "NullOrMobileOrPhone":
			return /null|^$|^0?1[3|4|5|7|8][0-9]\d{8}|^0\d{2,3}-?\d{7,8}$/;
		case "IdCard":
		    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
		case "NullOrIdCard":
		    return /null|^$|^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
		case "Zip":
		    return /^[0-9]\d{5}$/;
		case "NullOrZip":
		    return /null|^$|^[0-9]\d{5}$/;
		case "Fax":
		    return /^0\d{2,3}-?\d{7,8}$/;
		case "NullOrFax":
		    return /null|^$|^0\d{2,3}-?\d{7,8}$/;
		case "Num":
			return /^\d+(\.{0,1}\d+){0,1}$/;
		case "NullOrNum":
			return /null|^$|^\d+(\.{0,1}\d+){0,1}$/;
		case "Money":
			return /^(([1-9]\d*)|0)(\.\d{1,2})?$/;
		case "NullOrMoney":
			return /null|^$|^(([1-9]\d*)|0)(\.\d{1,2})?$/;
		case "yyyy-MM-dd":
			return /^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$/;
		case "HH:mm":
			return /^(?:[01]\d|2[0-3])(?::[0-5]\d)$/;
		case "HH:mm:ss":
			return /^(?:[01]\d|2[0-3])(?::[0-5]\d){2}$/;
		case "CarNum":
			return /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z0-9]{5}$/;
		case "organizationCode":
			return /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]$/;  //组织机构代码证
		case "NullOrTaxpayerNumber":
			return /null|^$|^[a-zA-Z0-9]{15}$|^[a-zA-Z0-9]{18}$|^[a-zA-Z0-9]{20}$/;
		case "TaxpayerNumber":
			return /^[a-zA-Z0-9]{15}$|^[a-zA-Z0-9]{18}$|^[a-zA-Z0-9]{20}$/;
	}
}

//严格验证身份证方法
function validateIdCard(idCard){
	var flag = false;
 	//15位和18位身份证号码的正则表达式
 	var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

 	//如果通过该验证，说明身份证格式正确，但准确性还需计算
 	if(regIdCard.test(idCard)){
 		if(idCard.length==18){
   			var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
   			var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
   			var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
   			for(var i=0;i<17;i++){
    			idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
   			}

   			var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
   			var idCardLast=idCard.substring(17);//得到最后一位身份证号码

   			//如果等于2，则说明校验码是10，身份证号码最后一位应该是X
   			if(idCardMod==2){
    			if(idCardLast=="X"||idCardLast=="x"){
     				flag = true;
    			}else{
     				flag = false;
    			}
   			}else{
	    		//用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
			    if(idCardLast==idCardY[idCardMod]){
			     	flag = true;
			    }else{
			     	flag = false;
			    }
   			}
  		}else if(idCard.length==15){
	       var id17 = idCard.substring(0,6) + '19' + idCard.substring(6);
	       var parityBit = getParityBit(id17);
	       return id17 + parityBit;
  		} 
	 }else{
	  	flag = false;
	 }
	 return flag;
}

/*计算校检码*/
function getParityBit(idCardNo){
	/*每位加权因子*/
	var powers = ["7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"];
  
	/*第18位校检码*/
	var parityBit = ["1","0","X","9","8","7","6","5","4","3","2"];

    var id17 = idCardNo.substring(0,17);    
    /*加权 */
    var power = 0;
    for(var i=0;i<17;i++){
      power += parseInt(id17.charAt(i),10) * parseInt(powers[i]);
    }              
    /*取模*/ 
    var mod = power % 11;
    return parityBit[mod];
}

/*验证字符串非空*/
function validateString(strValue)
{
	var isSubmit = false;
	if(null != strValue && "" != strValue){
		isSubmit = true;
	}
	return isSubmit;
}