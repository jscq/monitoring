package com.chengqing.base.util;

import java.beans.PropertyEditorSupport;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.util.StringUtils;

public class DateEditor extends PropertyEditorSupport {
	@Override
	public void setAsText(String text) throws IllegalArgumentException {
		
		
		
		Date date = null;
		if (!StringUtils.hasText(text)) {
			// Treat empty String as null value.
		}
		else
		{
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			date = format.parse(text);
		} catch (ParseException e) {
			format = new SimpleDateFormat("yyyy-MM-dd");
			try {
				date = format.parse(text);
			} catch (ParseException e1) {
				format = new SimpleDateFormat("yyyy-MM");
				try {
					date = format.parse(text);
				} catch (ParseException e2) {
					e2.printStackTrace();
				}
			}
		}
		}
		setValue(date);
	}
}