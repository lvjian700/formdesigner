/*
 * Created on 2006-4-6
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package cn.com.dayang.common.core.util;



import java.io.Serializable;
import java.util.UUID;

import org.hibernate.engine.SessionImplementor;
import org.hibernate.id.IdentifierGenerator;

//import net.sf.hibernate.engine.SessionImplementor;
//import net.sf.hibernate.id.IdentifierGenerator;

/**
 * @author Administrator
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class Guid implements IdentifierGenerator{
	
	private UUID uuid = UUID.randomUUID();
	
	public Guid(){
	}
	
	public String toString(){
		return uuid.toString().toLowerCase();
	}
	
	public Serializable generate(SessionImplementor cache, Object obj) {
		return UUID.randomUUID().toString();	
	}
	public static void main(String[] args){
		System.out.println(new Guid().toString());
	}

	public final static String EMTPY_GUID
		= "00000000-0000-0000-0000-000000000000";
	
	/**
	 * 如果格式为 00000000-0000-0000-0000-000000000000 则为空
	 * @param guid
	 * @return
	 */
	public static boolean isEmptyGuid(String guid) {
		if(guid == null || "".equals(guid)) {
			return true;
		}
		
		if(EMTPY_GUID.equals(guid)) {
			return true;
		}
		
		return false;
	}
}
