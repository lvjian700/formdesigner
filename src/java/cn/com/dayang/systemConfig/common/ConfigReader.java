package cn.com.dayang.systemConfig.common;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.commons.lang.StringUtils;

public class ConfigReader {
	
	/**
	 * 直接读取confog/param.properties文件
	 * @return
	 */
	public static ConfigReader getPath() {
		return new ConfigReader("config/param.properties");
	}
	
	public static ConfigReader getJms() {
		return new ConfigReader("config/jms.properties");
	}
	
	public static ConfigReader get(String nameInConfigFolder) {
		return new ConfigReader("config/" + nameInConfigFolder);
	}
	
	private Properties properties = null;
	
	public ConfigReader(String fileClassPath) {
		InputStream is = this.getClass().getClassLoader().getResourceAsStream(fileClassPath);
		properties = new Properties();
		try {
			properties.load(is);
		} catch (IOException e) {
			e.printStackTrace();
		}		
		System.out.println();
	}
	
	public String val(String key) {
		if(properties.get(key) == null) {
			return null;
		}
		
		return properties.get(key).toString();
	}
	
	public Integer intVal(String key) {
		if(properties.get(key) == null) {
			return null;
		}
		
		String val = properties.get(key).toString();
		return Integer.parseInt(val);
	}
	
	public Long longVal(String key) {
		if(properties.get(key) == null) {
			return null;
		}
		
		String val = properties.get(key).toString();
		return Long.parseLong(val);
	}
	
	public Boolean boolVal(String key) {
		if(properties.get(key) == null) {
			return false;
		}
		
		String val = properties.get(key).toString();
		return Boolean.parseBoolean(val);
	}
	
}
