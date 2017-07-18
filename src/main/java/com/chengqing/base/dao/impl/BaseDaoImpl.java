package com.chengqing.base.dao.impl;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;

import com.chengqing.base.constant.SqlId;
import com.chengqing.base.dao.BaseDao;
import com.chengqing.base.domain.BaseDomain;
import com.chengqing.base.exception.DaoException;
import com.chengqing.base.util.Identities;
import com.chengqing.base.util.PageControl;
import com.chengqing.base.util.Reflections;

public class BaseDaoImpl<T extends BaseDomain> implements BaseDao<T>{
	
	@Autowired(required = true)
	protected SqlSession sqlSessionTemplate;
	
	public static final String SQLNAME_SEPARATOR = ".";
	
	/**
	 * @fields sqlNamespace SqlMapping命名空间 
	 */
	private String sqlNamespace = getDefaultSqlNamespace();
	
	/**
	 * 获取泛型类型的实体对象类全名
	 * 
	 * @return
	 */
	protected String getDefaultSqlNamespace() {
		Class<?> genericClass = Reflections.getClassGenricType(getClass());
		return genericClass == null ? null : genericClass.getName();
	}
	
	/**
	 * 将SqlMapping命名空间与给定的SqlMapping名组合在一起。
	 * 
	 * @param sqlName SqlMapping名 
	 * @return 组合了SqlMapping命名空间后的完整SqlMapping名 
	 */
	protected String getSqlName(String sqlName) {
		return sqlNamespace + SQLNAME_SEPARATOR + sqlName;
	}
	
	/**
	 * 生成主键值。 默认使用{@link UUIDUtils#create()}方法
	 * 如果需要生成主键，需要由子类重写此方法根据需要的方式生成主键值。 
	 * 
	 * @param entity 要持久化的对象 
	 */
	protected String generateId() {
		return Identities.uuid2();
	}
	
	/**
	 * 添加对象,如果要添加的对象没有设置Id或者Id为空字符串或者是空格，则添加数据之前会调用 generateId()方法设置Id
	 * 
	 * @param entity 要实例化的实体，不能为null
	 * @return 
	 */
	public void insert(T entity){
		Assert.notNull(entity);
		try {
			 
			/**
			 * 添加ID主键
			 */
			if (StringUtils.isBlank(entity.getId()))
			{
				entity.setId(generateId());
				
				if (null == entity.getCreateTime()) {
					entity.setCreateTime(new Date());
				}
			}
			sqlSessionTemplate.insert(getSqlName(SqlId.SQL_INSERT), entity);
		} catch (Exception e) {
			throw new DaoException(String.format("添加对象出错！语句：%s", getSqlName(SqlId.SQL_INSERT)), e);
		}
	}
	
	/**
	 * 根据Id删除对象
	 * 
	 * @param id  要删除的ID，不能为null
	 * @return int 受影响结果数
	 */
	public int deleteById(Serializable id){
		Assert.notNull(id);
		try {
			return sqlSessionTemplate.delete(getSqlName(SqlId.SQL_DELETE_BY_ID), id);
		} catch (Exception e) {
			throw new DaoException(String.format("根据ID删除对象出错！语句：%s", getSqlName(SqlId.SQL_DELETE_BY_ID)), e);
		}
	}
	
	/**
	 * 删除所有
	 * 
	 * @return int 受影响结果数
	 */
	public int deleteAll(){
		try {
			return sqlSessionTemplate.delete(getSqlName(SqlId.SQL_DELETE));
		} catch (Exception e) {
			throw new DaoException(String.format("删除所有对象出错！语句：%s", getSqlName(SqlId.SQL_DELETE)), e);
		}
	}
	
	/**
	 * 更新对象中已设置的字段，未设置的字段不更新
	 * 
	 * @param entity 要更新的实体对象，不能为null，切ID必须不为null
	 * @return int 受影响结果数
	 */
	public int updateByIdSelective(T entity){
		Assert.notNull(entity);
		
		entity.setUpdateTime(new Date());
		
		try {
			int cnt = sqlSessionTemplate.update(getSqlName(SqlId.SQL_UPDATE_BY_ID_SELECTIVE), entity);
			if(cnt==0)
			{
				throw new DaoException(String.format("乐观锁更新失败，请重新操作！语句：%s", getSqlName(SqlId.SQL_UPDATE_BY_ID_SELECTIVE)));
			}
		} catch (Exception e) {
			
			throw new DaoException(String.format("根据ID更新对象某些属性出错！语句：%s", getSqlName(SqlId.SQL_UPDATE_BY_ID_SELECTIVE)),
					e);
		}
		return 1;
	}
	
	/**
	 * 查询所有记录列表
	 * 
	 * @return List 结果列表
	 */
	public <V extends T> List<V> selectAll(){
		try {
			return sqlSessionTemplate.selectList(getSqlName(SqlId.SQL_SELECT));
		} catch (Exception e) {
			throw new DaoException(String.format("查询所有对象列表出错！语句：%s", getSqlName(SqlId.SQL_SELECT)), e);
		}
	}
	
	/**
	 * 查询对象列表
	 * 
	 * @param query 查询参数，如果未null则查询所有
	 * @return 结果对象列表
	 */
	public <V extends T> List<V> selectList(T query){
		try {
			Map<String, Object> params = Reflections.toMap(query);
			return sqlSessionTemplate.selectList(getSqlName(SqlId.SQL_SELECT), params);
		} catch (Exception e) {
			throw new DaoException(String.format("查询对象列表出错！语句：%s", getSqlName(SqlId.SQL_SELECT)), e);
		}
	}
	
	/**
	 * 通过Id查询一个对象，如果id为null这会抛出IllegalArgumentException异常
	 * 
	 * @param id 主键，不能为null
	 * @return  结果对象，如果未找到返回null
	 */
	public <V extends T> V selectById(Serializable id){
		Assert.notNull(id);
		sqlSessionTemplate.clearCache(); 
		try {
			return sqlSessionTemplate.selectOne(getSqlName(SqlId.SQL_SELECT_BY_ID), id);
		} catch (Exception e) {
			throw new DaoException(String.format("根据ID查询对象出错！语句：%s", getSqlName(SqlId.SQL_SELECT_BY_ID)), e);
		}
	}
	
	/**
	 * 查询总记录数
	 * 
	 * @return long 记录总数
	 */
	public Long selectCount(){
		try {
			return sqlSessionTemplate.selectOne(getSqlName(SqlId.SQL_SELECT_COUNT));
		} catch (Exception e) {
			throw new DaoException(String.format("查询对象总数出错！语句：%s", getSqlName(SqlId.SQL_SELECT_COUNT)), e);
		}
	}
	
	
	/**
	 * 查询记录数
	 * 
	 * @param query 查询对象，如果为null，则查询对象总数
	 * @return long 记录总数
	 */
	public Long selectCount(T query){
		try {
			Map<String, Object> params = Reflections.toMap(query);
			return sqlSessionTemplate.selectOne(getSqlName(SqlId.SQL_SELECT_COUNT), params);
		} catch (Exception e) {
			throw new DaoException(String.format("查询对象总数出错！语句：%s", getSqlName(SqlId.SQL_SELECT_COUNT)), e);
		}
	}
	
	
	/**
	 * 查询数据（分页：rows和page）
	 * @param query
	 * @param rows
	 * @param page
	 * @return
	 */
	public <V extends T> PageControl selectPageList(Object query,int rows,int page){
		try {
			int intPage = page==0 ? 1:page;  
			int initRows =  rows==0 ? 10:rows;  
			int start = (intPage-1)*rows; 
			Map<String, Object> params = Reflections.toMap(query);
			params.put("start", start);
			params.put("rows", initRows);
			List<V> contentList = sqlSessionTemplate.selectList(getSqlName(SqlId.SQL_SELECT),params);
			Long totalItem = selectCount(query);
			PageControl pc = new PageControl();
			pc.setPagesize(rows);
			pc.setCpage(intPage);
			pc.setTotalitem(totalItem.intValue());
			pc.setList((null!=contentList&&contentList.size()>0)?contentList:null);
			return pc;
		} catch (Exception e) {
			throw new DaoException(String.format("根据分页对象查询列表出错！语句:%s", getSqlName(SqlId.SQL_SELECT)), e);
		}
	}
	
	/**
	 * 查询数据（总数）
	 * @param query
	 * @return
	 */
	public Long selectCount(Object query) {
		try {
			Map<String, Object> params = Reflections.toMap(query);
			return sqlSessionTemplate.selectOne(getSqlName(SqlId.SQL_SELECT_COUNT), params);
		} catch (Exception e) {
			throw new DaoException(String.format("查询对象总数出错！语句：%s", getSqlName(SqlId.SQL_SELECT_COUNT)), e);
		}
	}
	
	/**
	 * 指定的mapper里的sql查询数据（分页：rows和page）
	 * @param query
	 * @param rows
	 * @param page
	 * @param sqlId
	 * @param sqlCountId
	 * @return
	 */
	public <V extends T> PageControl selectPageList(Object query,int rows,int page,String sqlId,String sqlCountId){
		try {
			int intPage = page==0 ? 1:page;  
			int initRows =  rows==0 ? 10:rows;  
			int start = (intPage-1)*rows; 
			Map<String, Object> params = Reflections.toMap(query);
			params.put("start", start);
			params.put("rows", initRows);
			List<V> contentList = sqlSessionTemplate.selectList(getSqlName(sqlId),params);
			Long totalItem = sqlSessionTemplate.selectOne(getSqlName(sqlCountId), params);
			PageControl pc = new PageControl();
			pc.setPagesize(rows);
			pc.setCpage(intPage);
			pc.setTotalitem(totalItem.intValue());
			pc.setList((null!=contentList&&contentList.size()>0)?contentList:null);
			return pc;
		} catch (Exception e) {
			throw new DaoException(String.format("根据分页对象查询列表出错！语句:%s", getSqlName(sqlId)), e);
		}
	}
}
