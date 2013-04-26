/*
 * Created on 2006-4-19
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package cn.com.dayang.common.core.util;

import java.util.Date;
import java.util.List;


/**
 * @author Administrator
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class CoreUtil {
	public static Integer trueInteger = 1;
	public static Integer falseInteger = 0;
	
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
	
	/**
	 * lvjian
	 * @param sec
	 * @param avformat
	 * @return
	 */
	public static long secondToFrame(long sec) {			
		return sec * 25;
	}
	
	public static int timeCodeStringToFrames(String timecode, int avformat){
	  int framecount = 0;
	if (!hasContent(timecode))
		timecode="00:00:00:00";
	  String[] timecode_arr = timecode.split(":");
		  int	nhour = Integer.valueOf(timecode_arr[0]).intValue();
		  int	nminute = Integer.valueOf(timecode_arr[1]).intValue();
		  int	nsec = Integer.valueOf(timecode_arr[2]).intValue();
		  int	nframe = Integer.valueOf(timecode_arr[3]).intValue();

		  if(avformat == 2){
			  if( (nminute%10) != 0 ) {
				  if( nsec == 0 && (nframe == 0 || nframe == 1 ) )
					  nframe = 2;
			  }
			  framecount = nhour*107892 + (nminute/10)*17982 + (nminute%10)*1798 + nsec*30 + nframe;
		  }
		  if(avformat == 3){
			  framecount = nhour*108000 + nminute*1800 + nsec*30 + nframe;
		  }
		  if(avformat == 0 || avformat == 1){
			  framecount = nhour*90000 + nminute*1500 + nsec*25 + nframe;
		  }
	  return framecount;
	}
	public static String notNull(String input){
		if (input==null)
			return "";
		else return input.trim();
	}
	public static boolean hasContent(String input){
		if((input!=null)&&(input.length()>0))
			return true;
		else 
			return false;
	}
	
	public static String[] split(String source, String div) {
		int arynum = 0, intIdx = 0, intIdex = 0, div_length = div.length();
		if (source.compareTo("") != 0) {
			if (source.indexOf(div) != -1) {
				intIdx = source.indexOf(div);
				for (int intCount = 1; ; intCount++) {
					if (source.indexOf(div, intIdx + div_length) != -1) {
						intIdx = source.indexOf(div, intIdx + div_length);
						arynum = intCount;
					} else {
						arynum += 2;
						break;
				  }
				}
			} else {
				arynum = 1;
			}
		} else {
			arynum = 1;
		}
	  intIdx = 0;
	  intIdex = 0;
	  String[] returnStr = new String[arynum];

	  if (source.compareTo("") != 0) {
		if (source.indexOf(div) != -1) {
			intIdx = (int) source.indexOf(div);
			returnStr[0] = (String) source.substring(0, intIdx);
			for (int intCount = 1; ; intCount++) {
				if (source.indexOf(div, intIdx + div_length) != -1) {
					intIdex = (int) source.indexOf(div, intIdx + div_length);
					returnStr[intCount] = (String) source.substring(intIdx + div_length,intIdex);
					intIdx = (int) source.indexOf(div, intIdx + div_length);
				} else {
					returnStr[intCount] = (String) source.substring(intIdx + div_length,
					source.length());
					break;
				}
			}
		} else {
			returnStr[0] = (String) source.substring(0, source.length());
			return returnStr;
		}
	  } else {
		returnStr[0] = "";
		return returnStr;
	  }
	  return returnStr;
	}
	
	public static int getWeekLoopDayInt(String[] day) {
		int resultInt = 0;
		for(int i=0;i<day.length;i++) {
			resultInt = resultInt + Integer.parseInt(day[i].trim());
		}
		return resultInt;
	}
	
	public static String getWeekLoopDayString(int i) {
		String weekLoopDay = "0";
		int j=0;
		while((i/2)>0 || ((i/2==0) && (i%2>0))) {
			if(i%2>0) {
			  //weekLoopDay = weekLoopDay + "," + Integer.toString(((int)Math.pow(2,j))*(i%2));
			  weekLoopDay = weekLoopDay + "," + j;
		  }
			i=i/2;
			j++;
		}
		weekLoopDay = weekLoopDay.substring(weekLoopDay.indexOf(",")+1);
		return weekLoopDay;
	}
	public static boolean isTrue(int i){
		return !(i==0);
	}
	public static boolean isTrue(Integer i){
		if (i==null)
			return false;
		return !(i.intValue()==0);
	}
	@SuppressWarnings("rawtypes")
	public static boolean isEmpty(List list){
		if ((list==null)||(list.size()==0))
			return true;
		else return false;
	}
	public static Date changeTime(Date source,int changeValue){
		return new Date(source.getTime()+ changeValue);
	}
	public static Date changeTime(Date source,long changeValue){
		return new Date(source.getTime()+ changeValue);
	}
	
	
}
