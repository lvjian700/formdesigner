package cn.com.dayang.systemConfig.domain;

@SuppressWarnings("serial")
public class SystemConfig implements java.io.Serializable{
	
	private String configGuid;
	private String configName;
	private Long configType;
	private Long orderNum;
	private String configValue;
	private String preceptName;
	
	public SystemConfig(){
		
	}
	
    public SystemConfig(String configGuid,String configName,Long configType,Long orderNum,String configValue,String preceptName){
		this.configGuid = configGuid;
		this.configName = configName;
		this.configType = configType;
		this.configValue = configValue;
		this.orderNum = orderNum;
		this.preceptName = preceptName;
	}

	public String getConfigGuid() {
		return configGuid;
	}

	public void setConfigGuid(String configGuid) {
		this.configGuid = configGuid;
	}

	public String getConfigName() {
		return configName;
	}

	public void setConfigName(String configName) {
		this.configName = configName;
	}

	public Long getConfigType() {
		return configType;
	}

	public void setConfigType(Long configType) {
		this.configType = configType;
	}

	public Long getOrderNum() {
		return orderNum;
	}

	public void setOrderNum(Long orderNum) {
		this.orderNum = orderNum;
	}

	public String getConfigValue() {
		return configValue;
	}

	public void setConfigValue(String configValue) {
		this.configValue = configValue;
	}

	public String getPreceptName() {
		return preceptName;
	}

	public void setPreceptName(String preceptName) {
		this.preceptName = preceptName;
	}
    
    

}
