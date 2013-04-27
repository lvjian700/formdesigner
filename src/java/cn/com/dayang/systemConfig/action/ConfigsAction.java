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

@Controller("configsAction")
@Log4j
public class ConfigsAction extends AppAction  implements ModelDriven<SystemConfig> {
	
	@Autowired
	private ConfigService configService = null;
	
	private SystemConfig config = null;
	
	public void setModel(SystemConfig model) {
		config = model;
	}
	
	public SystemConfig getModel() {
		return config;
	}
	
	public void save() throws IOException {
		log.info("saving config...");
		configService.addConfig(config);
		
		String guid = config.getConfigGuid();
		log.debug("the result id: " + guid);
		
		HttpServletResponse response = ServletActionContext.getResponse();
		JSONSerializer s = new JSONSerializer().exclude("*.class");
		JSONResponse ret = JSONResponse.saveSuccess(guid);
		String json = s.deepSerialize(ret);
		
		this.responseJson(response, json);
	}
	
	
}

@Getter@Setter
class JSONResponse {
	private boolean success = true;
	private String guid = "";
	private SystemConfig body = null;
	
	public static JSONResponse saveSuccess(String guid) {
		JSONResponse ret = new JSONResponse();
		ret.setGuid(guid);
		
		return ret;
	}
}
