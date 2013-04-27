package cn.com.dayang.systemConfig.action;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.log4j.Log4j;

import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import cn.com.dayang.systemConfig.domain.SystemConfig;
import cn.com.dayang.systemConfig.service.ConfigService;
import cn.com.dayang.systemConfig.web.AppAction;

import com.opensymphony.xwork2.ModelDriven;

import flexjson.JSONSerializer;

@SuppressWarnings("serial")
@Controller("configsAction")
@Log4j
public class ConfigsAction extends AppAction  implements ModelDriven<SystemConfig> {
	
	@Autowired
	private ConfigService configService = null;
	
	
	
	
	private SystemConfig model = new SystemConfig();
	
	public void setModel(SystemConfig model) {
		this.model = model;
	}
	
	public SystemConfig getModel() {
		return model;
	}
	
	public void save() throws IOException {
		log.info("saving config...");
		configService.addConfig(model);
		
		String guid = model.getConfigGuid();
		log.debug("the result id: " + guid);
		
		HttpServletResponse response = ServletActionContext.getResponse();
		
		JSONResponse ret = JSONResponse.saveSuccess(guid);
		JSONSerializer s = new JSONSerializer().exclude("*.class");
		String json = s.serialize(ret);
		
		this.responseJson(response, json);
	}
	
	public String getById() throws IOException {
		log.info("get by id...");
		log.debug("--guid: " + model.getConfigGuid());
		
		SystemConfig config = configService.findConfigById(model.getConfigGuid());;
		
		HttpServletResponse response = ServletActionContext.getResponse();
		JSONResponse ret = JSONResponse.getSuccess(config);
		JSONSerializer s = new JSONSerializer().include("body").exclude("*.class");
		String json = s.serialize(ret);
		
		log.info("response json: \n" + json);
		
		this.responseJson(response, json);
		
		return null;
	}
	
	public static void main(String[] args) {
		SystemConfig obj = new SystemConfig();
		JSONResponse resp = new JSONResponse();
		resp.setBody(obj);
		
		JSONSerializer s = new JSONSerializer().include("body").exclude("*.class");
		String json = s.serialize(resp);
		System.out.println(json);
	}
	
}

