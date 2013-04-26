package cn.com.dayang.systemConfig.web;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.log4j.Log4j;

import com.opensymphony.xwork2.Preparable;

@SuppressWarnings("serial")
@Log4j
@Getter@Setter
public class AppAction extends BaseAction implements Preparable{
	
	
	public AppAction(){
		
	}

	@Override
	public void prepare() throws Exception {
		// TODO Auto-generated method stub
		this.clearErrorsAndMessages();  
	}
	
	protected void responseJson(HttpServletResponse response, String ret)throws IOException {
		
		PrintWriter out = response.getWriter();
		out.println(ret);
		out.flush();
		out.close();
	}
	
	
	public static String framesToTimeCodeString(int framecount) {
		
		if(framecount == 0){
			return "00:00:00:00";
		}
		int	hour = 0, minute = 0, reste = 0, second = 0, frame = 0;
		String strhour = "",strminute = "",strsecond = "",strframe = "";
		hour = (framecount / 90000);
		reste = (framecount % 90000);
		minute = (reste / 1500);
		reste = (reste % 1500);
		second = reste / 25;
		frame = reste % 25;
		if(hour < 10) {
		  strhour = "0" + String.valueOf(hour);
		} else {
		  strhour = String.valueOf(hour);
		}
		if(minute < 10) {
		  strminute = "0" + String.valueOf(minute);
		} else {
		  strminute = String.valueOf(minute);
		}
		if(second < 10) {
		  strsecond = "0" + String.valueOf(second);
		} else {
		  strsecond = String.valueOf(second);
		}
		if(frame < 10) {
		  strframe = "0" + String.valueOf(frame);
		} else {
		  strframe = String.valueOf(frame);
		}
		return strhour+":"+strminute+":"+strsecond+":"+strframe;
	}

}
