package cn.com.dayang.systemConfig.web.action;

import java.text.SimpleDateFormat;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.log4j.Log4j;

import org.apache.struts2.ServletActionContext;
import org.springframework.stereotype.Controller;

import cn.com.dayang.systemConfig.web.AppAction;
import edu.yale.its.tp.cas.client.filter.CASFilter;

@SuppressWarnings("serial")
@Log4j
@Setter@Getter
@Controller("LoginAction")
public class LoginAction extends AppAction implements Anonymous{
	
	private String name = null;
	
	public String execute(){		
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy.MM.dd");
		String thisdate=sdf.format(new java.util.Date());
		
		name = (String)session.getAttribute(CASFilter.CAS_FILTER_USER);
		
		session.setAttribute("username", name);
		session.setAttribute("thisdate", thisdate);
		
		return "success";
	}

}
