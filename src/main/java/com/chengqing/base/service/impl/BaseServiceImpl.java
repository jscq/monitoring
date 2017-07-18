package com.chengqing.base.service.impl;

import java.io.Serializable;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.transaction.annotation.Transactional;

import com.chengqing.base.dao.BaseDao;
import com.chengqing.base.domain.BaseDomain;
import com.chengqing.base.service.BaseService;
import com.chengqing.base.util.PageControl;

/**
 * service实现类层 -- 基本
 * @author ChengQing
 * @version 1.0
 * @param <T>
 */
public abstract class BaseServiceImpl<T extends BaseDomain> implements BaseService<T> {
	
	/**
	 * 获取基础数据库操作类
	 * @return
	 */
	protected abstract BaseDao<T> getBaseDao();
	
	/**
	 * 添加对象,如果要添加的对象没有设置Id或者Id为空字符串或者是空格，则添加数据之前会调用 generateId()方法设置Id
	 * 
	 * @param entity 要实例化的实体，不能为null
	 * @return 
	 */
	@Transactional
	public void insert(T entity) throws Exception{
		getBaseDao().insert(entity);
	}
	
	/**
	 * 根据Id删除对象
	 * 
	 * @param id  要删除的ID，不能为null
	 * @return int 受影响结果数
	 */
	@Transactional
	public int deleteById(Serializable id) throws Exception{
		return getBaseDao().deleteById(id);
	}
	
	/**
	 * 根据Id删除对象
	 * 
	 * @param id  要删除的ID，不能为null
	 * @return int 受影响结果数
	 */
	@Transactional
	public void deleteByIds(Serializable id) throws Exception{
		if(StringUtils.isNotEmpty(id.toString())){
			String[] ids = id.toString().split(",");
			
			if(null != ids && ids.length > 0){
				for (String temp : ids) {
					getBaseDao().deleteById(temp);
				}
			}
		}
	}
	
	/**
	 * 删除所有
	 * 
	 * @return int 受影响结果数
	 */
	@Transactional
	public int deleteAll() throws Exception{
		return getBaseDao().deleteAll();
	}
	
	/**
	 * 更新对象中已设置的字段，未设置的字段不更新
	 * 
	 * @param entity 要更新的实体对象，不能为null，切ID必须不为null
	 * @return int 受影响结果数
	 */
	@Transactional
	public int updateByIdSelective(T entity) throws Exception{
		return getBaseDao().updateByIdSelective(entity);
	}
	
	/**
	 * 查询所有记录列表
	 * 
	 * @return List 结果列表
	 */
	public <V extends T> List<V> selectAll() throws Exception{
		return getBaseDao().selectAll();
	}
	
	/**
	 * 查询对象列表
	 * 
	 * @param query 查询参数，如果未null则查询所有
	 * @return 结果对象列表
	 */
	public <V extends T> List<V> selectList(T query) throws Exception{
		return getBaseDao().selectList(query);
	}
	
	/**
	 * 通过Id查询一个对象，如果id为null这会抛出IllegalArgumentException异常
	 * 
	 * @param id 主键，不能为null
	 * @return  结果对象，如果未找到返回null
	 */
	public <V extends T> V selectById(Serializable id) throws Exception{
		return getBaseDao().selectById(id);
	}
	
	
	/**
	 * 查询总记录数
	 * 
	 * @return long 记录总数
	 */
	public Long selectCount() throws Exception{
		return getBaseDao().selectCount();
	}
	
	
	/**
	 * 查询记录数
	 * 
	 * @param query 查询对象，如果为null，则查询对象总数
	 * @return long 记录总数
	 */
	public Long selectCount(T query) throws Exception{
		return getBaseDao().selectCount(query);
	}
	
	
	/**
	 * 查询数据（分页：rows和page）
	 * @param query
	 * @param rows
	 * @param page
	 * @return
	 */
	public <V extends T> PageControl selectPageList(Object query,int rows,int page) throws Exception{
		return getBaseDao().selectPageList(query,rows,page);
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
	public <V extends T> PageControl selectPageList(Object query,int rows,int page,String sqlId,String sqlCountId) throws Exception{
		return getBaseDao().selectPageList(query, rows, page, sqlId,sqlCountId);
	}
	
	
	
	
	
	
	
	
	

}
