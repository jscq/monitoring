package com.chengqing.base.constant;

/**
 * Mybatis Sql脚本的ID名称
 */
public interface SqlId {
	public String SQL_SELECT_COUNT = "selectCount";
	public String SQL_SELECT = "select";
	public String SQL_SELECT_BY_ID = "selectById";
	public String SQL_UPDATE_BY_ID = "updateById";
	public String SQL_UPDATE_BY_ID_SELECTIVE = "updateByIdSelective";
	public String SQL_DELETE = "delete";
	public String SQL_DELETE_BY_ID = "deleteById";
	public String SQL_INSERT = "insert";
	public String SQL_UPDATE_BY_OPTIMISTIC_LOCK = "updateByOptimisticLock";
	
	
	/**
	 * 系统管理
	 */
	public String SQL_SELECT_ALL_PARENT = "selectAllParent";//数据字典用(cq)
	public String SQL_SELECT_COUNT_BY_CODE= "selectCodeCount";//数据字典用(cq)
	public String SQL_DELETE_BY_PARENTID = "deleteByParentId";//数据字典用(cq)
	public String SQL_DELETE_BY_PARENTID1 = "deleteByParentId1";//数据字典用(cq)
	public String SQL_SELECT_BY_PARENTID = "selectByParentId";//数据字典用(cq)
	public String SQL_SELECT_BY_PARENTNAME = "selectByParentName";//数据字典用(cq)
	public String SQL_SELECT_BY_CODETYPE = "selectByCodeType";
	
	
}
