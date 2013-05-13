package cn.com.dayang.systemConfig.action;

import lombok.Getter;
import lombok.Setter;
import cn.com.dayang.systemConfig.domain.SystemConfig;


@Getter@Setter
public class JSONResponse {
	
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
	
	public static JSONResponse delSuccess(String guid) {
		JSONResponse ret = new JSONResponse();
		ret.setSuccess(true);
		ret.setGuid(guid);
		
		return ret;
	}
	
	public static JSONResponse delFail(String guid) {
		JSONResponse ret = new JSONResponse();
		ret.setSuccess(false);
		ret.setGuid(guid);
		
		return ret;
	}
	
}