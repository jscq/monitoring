/**
 * 查询
 */
var searchArea = function() {
	var queryParams = {
		'area.name' : $('#name').val(),// 区域名称
		'area.code' : $('#code').val(),// 区域代码
		'area.id' : "0",
	};
	$('#dg').treegrid('options').queryParams = queryParams;
	$("#dg").treegrid('load');
};


/**
 * 编辑
 */
function edit() {
	if (selections()) {
		var rows = $('#dg').datagrid('getSelections');
		var id = rows[0].id;
		if (id != '') {
			// 跳转编辑页面
			add(Utils.getRootPath() + '/area/editArea?id=' + id,
					'编辑行政信息', 800, 350);
		} else {
			$.messager.alert('提示', '系统错误,请联系管理员！', 'warning');
		}
	}
}

/**
 * 删除
 */
function deleteByArea() {
	var rows = $('#dg').datagrid('getSelections');
	if (rows.length == 0) {
		$.messager.alert('提示', '请选择需要删除的数据！', 'warning');
		return;
	}
	var ids = "";
	for (var i = 0; i < rows.length; i++) {
		if (rows.length == i + 1) {
			ids += rows[i].id;
		} else {
			ids += rows[i].id + ",";
		}
	}

	if (ids != '' && ids != null) {

		$.messager.confirm('提示', '是否确定删除，若存在子节点一并删除？', function(r) {
			if (r) {
				// 删除
				$.ajax({
					cache : true,
					type : "GET",
					dataType : "json",
					url : Utils.getRootPath() + "/area/deleteArea",
					data : {
						'id' : ids
					},
					async : false,
					error : function(request) {
						$.messager.alert('提示', "验证失败", 'warning');
					},
					success : function(result) {
						if (null != result && result.status == "OK") {
							// 删除成功
							$.messager.alert('提示', '删除成功', 'warning',function(){
								// 刷新grid
								searchArea();
							});
						} else {
							$.messager.alert('提示', result.message, 'warning');
						}
					}
				});
			}
		});

	} else {
		$.messager.alert('提示', '系统错误,请联系管理员！', 'warning');
	}

};

/**
 * 保存
 */
var saveOrUpdateArea = function(formId, type) {
	var parameterName = $("#parameterName").val();
	var token = $("#token").val();
	var url = Utils.getRootPath() + "/area/checkArea?" + parameterName + "=" + token;

	if (validateSubmit(formId)) {
		var id = $("#areaId").val();
		
		var t = $('#areaTree').combotree('tree');
		var name = $("#name").val();
		var code = $("#code").val();
		
		var n = t.tree('getSelected'); // 获取选择的节点

		var parentId = "";

		if (n != null) {
			if (n.id != null && n.id != "") {
				parentId = n.id;
			}
		}else{
			parentId = "0";
		} 	
		
		var data = {
			'id' : id,// id
			'parentId' : parentId,// 上级单位
			'name' : name,
			'code' : code
		// 区域代码
		};
		// 校验: 一级菜单，验证数据名称、数据类型是否存在
		// 二级菜单，验证数据名称、数值是否存在
		$.ajax({
			cache : true,
			type : "POST",
			dataType : "json",
			url : url,
			data : data,
			async : false,
			error : function(request) {
				$.messager.alert('提示', "验证失败", 'warning');
			},
			success : function(result) {
				if (null != result && result.status == "OK") {
					// 保存、更新
					saveOrUpdateAreaToMysql(data);
				} else {
					$.messager.alert('提示', result.message, 'warning');
				}
			}
		});
	}
};

/**
 * 保存更新进数据库
 */
var saveOrUpdateAreaToMysql = function(data) {
	var parameterName = $("#parameterName").val();
	var token = $("#token").val();
	var url = Utils.getRootPath() + "/area/saveOrUpdateArea?"+ parameterName + "=" + token;

	$.ajax({
		cache : true,
		type : "POST",
		dataType : "json",
		url : url,
		data : data,
		async : false,
		error : function(request) {
			$.messager.alert('提示', "验证失败", 'warning');
		},
		success : function(result) {
			if (null != result && result.status == "OK") {
				$.messager.alert('提示', "保存成功", 'info',function(){
					// 刷新grid
					loadDataGrid("area");
					// 关闭添加页面
					window.parent.closeWinForm();
				});
			} else {
				$.messager.alert('提示', result.message, 'warning');
			}
		}
	});
};
