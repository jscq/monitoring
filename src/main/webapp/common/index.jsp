<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/common/common.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta name="description" content="overview &amp; stats" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

<title>惠龙e通货物运输集中配送电商平台</title>
<script type="text/javascript" src="<%=basePath%>/resources/ECharts/echarts-plain.js"></script>
<script type="text/javascript" src="<%=basePath%>/resources/js/index/index.js?ver=<Cus:constOut/>"></script>
</head>
<body>
	
	<input type="hidden" id="parameterName" name="parameterName" value="${_csrf.parameterName}"/>
	<input type="hidden" id="token" name="token" value="${_csrf.token}"/>

	<div title="主页" style="padding: 10px">
		<div style="width: 1400px;">
		
			<div style="width: 560px; height: 270px; margin: 5px; float: left;">
				<div style="width:560px;height:270px;float:left;" id="totalMemberDivId"></div>
			</div>
			<div style="width: 560px; height: 270px; margin: 5px; float: left;">
				<div style="width:560px;height:270px;float:left;" id="currentMonthMemberCountDivId"></div>
			</div>
			<div style="width: 560px; height: 270px; margin: 5px; float: left;">
				<div style="width:560px;height:270px;float:left;" id="currentWeekMemberCountDivId"></div>
			</div>
			<div style="width: 560px; height: 270px; margin: 5px; float: left;">
				<div style="width:560px;height:270px;float:left;" id="memberDistributeDivId"></div>
			</div>
			
		</div>
	</div>
</body>
<script type="text/javascript">
	jQuery(document).ready(function() {
		
		var parameterName = '${_csrf.parameterName}';
		var token = '${_csrf.token}';
		
		//会员总量趋势图（饼状）
		totalMember_trendChart(parameterName, token);
	
		//当月会员量（线图）
		currentMonthMemberCount_trendChart(parameterName, token);
		
		//当周会员量（线图）
		currentWeekMemberCount_trendChart(parameterName, token);
		
		//会员分布区域（按省、取排名前10）（柱状图）
		memberDistribute_trendChart(parameterName, token);
		
	});
</script>
</html>