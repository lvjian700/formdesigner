package cn.com.dayang.common.web;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.Map;

import lombok.extern.log4j.Log4j;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.util.StrutsTypeConverter;

@Log4j
public class DateConverter extends StrutsTypeConverter {

	@Override  
    public Object convertFromString(Map context, String[] values, Class toClass) {
        Date date = null;
        
        try {  
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
            if(!StringUtils.isEmpty(values[0])) {
            	date = sdf.parse(values[0]);
            }
        } catch (ParseException e) {  
            e.printStackTrace();  
        }  
        
        return date;  
    }  
  
    @Override  
    public String convertToString(Map context, Object o) {  
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
        return sdf.format(o);  
    }  
    
    public static void main(String[] args) {
    	SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:dd");
    	Calendar c = Calendar.getInstance();
    	Calendar.getInstance(Locale.CHINA);
    	Date d = c.getTime();
    	
    	System.out.println(sf.format(d));
    }

}
