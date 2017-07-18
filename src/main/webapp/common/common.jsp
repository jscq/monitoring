<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<%
String path = request.getContextPath();
//String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/"+"webapp";
String basePath = path;
request.setAttribute("basePath",basePath);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="pragma" content="no-cache"/>
<meta http-equiv="cache-control" content="no-cache"/>
<meta http-equiv="expires" content="0"/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />


<link rel="shortcut icon" href="<%=basePath%>/resources/favicon.ico"/>
<link rel="bookmark" href="<%=basePath%>/resources/favicon.ico"/>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/resources/jquery-easyui-1.4.2/themes/gray/easyui.css">
<link rel="stylesheet" type="text/css" href="<%=basePath%>/resources/jquery-easyui-1.4.2/themes/icon.css">
<link rel="stylesheet" type="text/css" href="<%=basePath%>/resources/css/common.css" >
<link rel="stylesheet" type="text/css" href="<%=basePath%>/resources/css/form.css" >

<script type="text/javascript" src="<%=basePath%>/resources/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/resources/js/jquery.form.js"></script>
<script type="text/javascript" src="<%=basePath%>/resources/jquery-easyui-1.4.2/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/resources/jquery-easyui-1.4.2/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=basePath%>/resources/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=basePath%>/resources/js/common/Utils.js"></script>
<script type="text/javascript" src="<%=basePath%>/resources/js/common/validate.js"></script>
<script type="text/javascript" src="<%=basePath%>/resources/js/common/common.js"></script>
<script type="text/javascript" src="<%=basePath%>/resources/js/common/loadDataGrid.js"></script>

<!-- 操作弹框,页面显示正在加载中,遮盖 -->
<link rel="stylesheet" type="text/css" href="<%=basePath%>/resources/css/div.css" >
