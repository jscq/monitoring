package com.chengqing.base.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * Dao层异常信息
 * @author chengqing
 * @date 
 */
public class DaoException extends RuntimeException {
		
	private Logger log = LoggerFactory.getLogger(DaoException.class);
	/**
	 * @fields serialVersionUID 
	 */
	private static final long serialVersionUID = 8350049272861703406L;

	public DaoException() {
		super();
	}


	public DaoException(String message, Throwable cause) {
		super(message, cause);
		log.error(message);
		cause.printStackTrace();
	}

	public DaoException(String message) {
		super(message);
		log.error(message);
	}

	public DaoException(Throwable cause) {
		super(cause);
		cause.printStackTrace();
	}

}
