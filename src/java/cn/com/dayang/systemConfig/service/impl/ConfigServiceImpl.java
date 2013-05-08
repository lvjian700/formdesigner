package cn.com.dayang.systemConfig.service.impl;

import java.util.List;

import lombok.extern.log4j.Log4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import cn.com.dayang.systemConfig.common.ConfigReader;
import cn.com.dayang.systemConfig.domain.SystemConfig;
import cn.com.dayang.systemConfig.service.ConfigService;

@Log4j
@SuppressWarnings("unchecked")
public class ConfigServiceImpl extends HibernateDaoSupport implements ConfigService{
	
	public static final String FIND_TMPLS 
		= "from SystemConfig where configType = 10 or configType = 12 order by configType asc";
	
	public List<SystemConfig> findAllConfig(){
		return getHibernateTemplate().loadAll(SystemConfig.class);
	}
	
	public SystemConfig findConfigById(String id){
		Object cfg = getHibernateTemplate().get(SystemConfig.class, id);
		if(cfg == null){
			return null;
		}
		return (SystemConfig)cfg;
	}
	
	public List<SystemConfig> findConfigByType(long configType){
		log.info(configType);
		String hql = "from SystemConfig where configType = :configType";
		List<SystemConfig> cfg = getHibernateTemplate().findByNamedParam(hql, "configType", configType);
		log.info(cfg);
		if(cfg.size() == 0){
			return null;
		}
		return cfg;
	}
	
	public List<SystemConfig> findTmpls() {
		
		List<SystemConfig> cfg = this.getHibernateTemplate().find(FIND_TMPLS);
		return cfg;
	}

	public void updateConfig(SystemConfig systemconfig){
		getHibernateTemplate().update(systemconfig);
	}
	
	public void addConfig(SystemConfig systemconfig){
		getHibernateTemplate().saveOrUpdate(systemconfig);
	}
	
	public void deleteConfig(SystemConfig systemconfig){
		getHibernateTemplate().delete(systemconfig);
	}

}
