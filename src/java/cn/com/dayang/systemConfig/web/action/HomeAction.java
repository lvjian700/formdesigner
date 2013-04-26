package cn.com.dayang.systemConfig.web.action;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.log4j.Log4j;

import org.springframework.stereotype.Controller;

import cn.com.dayang.systemConfig.web.AppAction;

@SuppressWarnings("serial")
@Log4j
@Setter@Getter
@Controller("HomeAction")
public class HomeAction extends AppAction{
	
	public String execute(){
		return "success";
	}

}
