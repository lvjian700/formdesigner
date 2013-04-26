/*
 * Created on 2006-4-5
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package cn.com.dayang.common.web;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;


public class EncodingFilter implements Filter {

	protected String encoding = "UTF-8";

	
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {        
		
		request.setCharacterEncoding(encoding);
		response.setCharacterEncoding(encoding);
			
		chain.doFilter(request, response);    
	}

	public void init(FilterConfig filterConfig) throws ServletException {       
		this.encoding = filterConfig.getInitParameter("encoding");   
	}

	public void destroy() {
		encoding = null;
	}
	

}