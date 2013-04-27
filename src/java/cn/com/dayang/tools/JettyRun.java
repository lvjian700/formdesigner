package cn.com.dayang.tools;

import java.net.URL;

import lombok.extern.log4j.Log4j;

import org.mortbay.jetty.Server;
import org.mortbay.jetty.webapp.WebAppContext;

@Log4j
public class JettyRun {
	
	
	public static WebAppContext context() {
		
		WebAppContext context = new WebAppContext();  
		context.setContextPath("/");
		context.setResourceBase("public");
		context.setDescriptor("public/WEB-INF/web.xml");
		context.setParentLoaderPriority(true);
		
		return context;
	}

	public static void main(String[] args) throws Exception {
		Server server = new Server(8000);
		
		WebAppContext context = context();
		server.setHandler(context);
		
		server.start();
		server.join();
	}
}
