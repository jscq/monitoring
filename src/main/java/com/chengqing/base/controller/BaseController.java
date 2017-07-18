package com.chengqing.base.controller;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.chengqing.base.domain.BaseDomain;
import com.chengqing.base.service.BaseService;
import com.chengqing.base.util.DateEditor;
import com.chengqing.base.util.MyCustomNumberEditor;
import com.chengqing.base.util.PageControl;
import com.chengqing.base.util.ResData;
import com.chengqing.base.util.StringEditor;


/**
 * 基础controller
 * @author ChengQing
 * @version 1.2
 */
public abstract class BaseController<T extends BaseDomain> implements Serializable {
	
	private static final long serialVersionUID = 1L;

	protected abstract BaseService<T> getBaseService();
	
	@InitBinder
	protected void initBinder(WebDataBinder binder) {
		binder.registerCustomEditor(Date.class, new DateEditor());     
	    binder.registerCustomEditor(int.class, new MyCustomNumberEditor(Integer.class));
	    binder.registerCustomEditor(Integer.class, new MyCustomNumberEditor(Integer.class)); 
	    binder.registerCustomEditor(double.class, new MyCustomNumberEditor(Double.class));
	    binder.registerCustomEditor(float.class, new MyCustomNumberEditor(Float.class));
	    binder.registerCustomEditor(long.class, new MyCustomNumberEditor(Long.class));
	    
	    binder.registerCustomEditor(String.class, new StringEditor());
	  
	}
	
	/**
	 * list页面数据
	 * @param query 实体对象
	 * @param rows	行数
	 * @param page	页数
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/listJson", method = RequestMethod.POST)
	public ResData listMajorJson(@ModelAttribute T t ,int rows,int page)
	{
		ResData res = new ResData();
		try {
			PageControl pc = getBaseService().selectPageList(t,rows,page);
			List<T> list = new ArrayList<T>();
			res.setRows(null!=pc&&null!=pc.getList()?pc.getList():list);
			res.setTotal(pc.getTotalitem());
			res.setQuery(t);
		} catch (Exception e) {
			
		}
		return res;
	}
	
	
}
