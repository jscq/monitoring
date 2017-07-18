package com.chengqing.base.util;
import java.beans.PropertyEditorSupport;

import org.springframework.util.StringUtils;

public class StringEditor extends PropertyEditorSupport {

 

    @Override
    public void setAsText(String text) throws IllegalArgumentException {
        if (!StringUtils.hasText(text)) {
            setValue("");
        }else { 
            setValue(text.trim());
        }
    }

}