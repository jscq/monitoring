<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div id="navbar" class="navbar navbar-default">
	<div class="navbar-container" id="navbar-container">
		<button type="button" class="navbar-toggle menu-toggler pull-left"
			id="menu-toggler">
			<span class="sr-only">Toggle sidebar</span> <span class="icon-bar"></span>
			<span class="icon-bar"></span> <span class="icon-bar"></span>
		</button>

		<div class="navbar-header pull-left">
			<span style="color:#fff;font-size:20px;line-height: 40px;">建筑工程学院(综合测评管理系统)</span>
		</div>
		<div class="navbar-buttons navbar-header pull-right" style="margin-right: 15px">
		
		<span style="color:#fff;font-size:14px;">欢迎您：${userName }</span>
		 <i style="margin-top: 17px;margin-left: 4px;width: 30px;height: 30px" class="ace-icon fa fa-cog"></i><a href="#" onclick="viewPassword()" style="font-size:14px;color:#fff;">修改密码</a>
	
		 <i style="margin-top: 17px;margin-left: 4px;width: 30px;height: 30px" class="ace-icon fa fa-power-off"></i><a href="<c:url value='/logout'/>" style="font-size:14px;color:#fff;" >退出系统</a>
		</div>
		
	<div id="upPasswordTitle" title="修改密码提示框" class="easyui-window" style="width:420px;height:250px;">
	<div class="cell">
		<form action="" name="HZGXR" id="HZGXR" method="post">
		<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
		<input type="hidden" name="parameterName" id="parameterName1" value="${_csrf.parameterName}" />
		<input type="hidden" name="token" id="token1" value="${_csrf.token}" />
			<table style="wdth:100%;text-align:center;">
			<tr>
				<th style="width:30%"><span style="color: red;">*</span>原密码：</th>
				<td style="width:70%">
					<input type="password" id="oldPassword" name="oldPassword" class="form_text" placeholder="请填写原密码" maxlength="30" style="height:25px;" />
				</td>
			</tr>
			<tr>
				<th><span style="color: red;">*</span>新密码：</th>
				<td>
					<input type="password" id="newPassword1" name="newPassword1" class="form_text" placeholder="请填写新密码" maxlength="30" style="height:25px;" />
				</td>
			</tr>
			<tr>
				<th><span style="color: red;">*</span>确认密码：</th>
				<td>
					<input type="password" id="newPassword2" name="newPassword2" class="form_text" placeholder="请填写确认密码" maxlength="30" style="height:25px;" />
				</td>
			</tr>
			</table>
		</form>
		<div class="box_03">
        	<div class="box_inner_03">
        		<div class="btn_area_setl btn_area_bg">
        			<a href="javascript:void(0)" onclick="validatePassword()" class="btn_01">确定<b></b></a>
    				<a href="#" onclick="$('#upPasswordTitle').window('close');" class="btn_01">关闭<b></b></a>
        		</div>
        	</div>
       	</div>
		</div>
	</div>
<script type="text/javascript">
	$(function(){ 
		var changePwdFlag = '${changePwdFlag}';
		if(changePwdFlag != null && changePwdFlag == "1"){
			viewPassword();
		}else {
			$('#upPasswordTitle').window('close');
		}
	});
</script>
</div>
</div>
