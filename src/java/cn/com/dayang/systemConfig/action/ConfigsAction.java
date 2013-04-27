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
	
	JSONSerializer s = new JSONSerializer().exclude("*.class");
	
	private SystemConfig model = null;
	
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
		String json = s.deepSerialize(ret);
		
		this.responseJson(response, json);
	}
	
	public void get() throws IOException {
		SystemConfig config = configService.findConfigById(model.getConfigGuid());;
		
		HttpServletResponse response = ServletActionContext.getResponse();
		JSONResponse ret = JSONResponse.getSuccess(config);
		String json = s.deepSerialize(ret);
		
		this.responseJson(response, json);
	}
	
}

@Getter@Setter
class JSONResponse {
	
	@SuppressWarnings("unused")
	private boolean success = true;
	private String guid = "";
	private SystemConfig body = null;
	
	public JSONResponse() {
		
	}
	
	public static JSONResponse saveSuccess(String guid) {
		JSONResponse ret = new JSONResponse();
		ret.setSuccess(true);
		ret.setGuid(guid);
		
		return ret;
	}
	
	public static JSONResponse getSuccess(SystemConfig config) {
		JSONResponse ret = new JSONResponse();
		ret.setSuccess(true);
		ret.setBody(config);
		
		return ret;
	}
}
