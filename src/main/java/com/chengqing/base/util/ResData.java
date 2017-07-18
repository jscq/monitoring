package com.chengqing.base.util;

import java.util.List;

/**
 * 分页返回数据
 * @author chengqing
 *
 */
public class ResData {
	
	/**
	 * 总记录数
	 */
	private int total;
	
	/**
	 * 总页数
	 */
	private int pages;
	/**
	 * 数据集合
	 */
	private List rows;
	
	/**
	 * 查询对象
	 */
	private Object query;
	
	/**
	 * 统计数据
	 */
	private List footer;
	
	
	public List getFooter() {
		return footer;
	}

	public void setFooter(List footer) {
		this.footer = footer;
	}

	public Object getQuery() {
		return query;
	}

	public void setQuery(Object query) {
		this.query = query;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}


	public List getRows() {
		return rows;
	}

	public void setRows(List rows) {
		this.rows = rows;
	}

	public int getPages() {
		return pages;
	}

	public void setPages(int pages) {
		this.pages = pages;
	}

}
