package cn.com.dayang.systemConfig.service;

import java.util.List;

import cn.com.dayang.systemConfig.domain.SystemConfig;

public interface ConfigService {
	
	public List<SystemConfig> findAllConfig();
	
	public SystemConfig findConfigById(String id);
	
	public List<SystemConfig> findConfigByType(long configType);
	
	public List<SystemConfig> findTmpls();
	
	public void updateConfig(SystemConfig systemconfig);
	
	public void addConfig(SystemConfig systemconfig);
	
	public void deleteConfig(SystemConfig systemconfig);
	

}
