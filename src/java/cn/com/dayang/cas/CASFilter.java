package cn.com.dayang.cas;

import java.io.*;
import java.net.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.xml.parsers.ParserConfigurationException;

import lombok.extern.log4j.Log4j;

import org.xml.sax.SAXException;

@Log4j
public class CASFilter implements Filter {

    //*********************************************************************
    // Constants

    /** Session attribute in which the username is stored */
    public final static String CAS_FILTER_USER =
        "edu.yale.its.tp.cas.client.filter.user";

    //*********************************************************************
    // Configuration state

    private String casLogin,
        casValidate,
        casAuthorizedProxy,
        casServiceUrl,
        casRenew,
        casServerName;
    private boolean wrapRequest;

    //*********************************************************************
    // Initialization 

    public void init(FilterConfig config) throws ServletException {
        casLogin =
            config.getInitParameter(
                "edu.yale.its.tp.cas.client.filter.loginUrl");
        casValidate =
            config.getInitParameter(
                "edu.yale.its.tp.cas.client.filter.validateUrl");
        casServiceUrl =
            config.getInitParameter(
                "edu.yale.its.tp.cas.client.filter.serviceUrl");
        casAuthorizedProxy =
            config.getInitParameter(
                "edu.yale.its.tp.cas.client.filter.authorizedProxy");
        casRenew =
            config.getInitParameter("edu.yale.its.tp.cas.client.filter.renew");
        casServerName = null;
	wrapRequest = Boolean.valueOf(config.getInitParameter(
		"edu.yale.its.tp.cas.client.filter.wrapRequest")).booleanValue();
    }

    //*********************************************************************
    // Filter processing

    public void doFilter(
    		ServletRequest request,
    		ServletResponse response,
        FilterChain fc)
        throws ServletException, IOException {
    	
    	
        log.info("\n\n\n\n\n cas filt\n\n\n\n");
    	
        // make sure we've got an HTTP request
        if (!(request instanceof HttpServletRequest)
            || !(response instanceof HttpServletResponse))
            throw new ServletException("CASFilter protects only HTTP resources");

	// Wrap the request if desired
    
        
    
	if(wrapRequest) {
		
		log.info("\n\n\n\n\n HttpServletRequest \n\n\n\n");
		
	    request = new CASFilterRequestWrapper((HttpServletRequest)request);
	}

	
	    HttpServletRequest httprequest = (HttpServletRequest)request;
	    int port = request.getServerPort();
	    String StringPort = String.valueOf(port);
	    casServerName = request.getServerName()+":"+StringPort;
        HttpSession session = ((HttpServletRequest)request).getSession();

        // if our attribute's already present, don't do anything
        if (session != null && session.getAttribute(CAS_FILTER_USER) != null) {
            fc.doFilter(request, response);
            
            log.info("\n\n\n\n\n CAS_FILTER_USER \n\n\n\n");
            String ticket = request.getParameter("ticket");
            log.info("ticket:"+ticket);
            log.info(request.getParameterNames());
            Enumeration enums = request.getParameterNames();
            while(enums.hasMoreElements()) {
            	Object enumkey = enums.nextElement();
            	String enumname = request.getParameter((String) enumkey);
            	
            	log.info("enumkey"+enumkey);
            	log.info("enumname"+enumname);
            	log.info("\n\n\n\n\n\n\n\n");
            }
            
            return;
        }

        // otherwise, we need to authenticate via CAS
        String ticket = request.getParameter("ticket");

        
        
        // no ticket?  abort request processing and redirect
        if (ticket == null || ticket.equals("")) {
            if (casLogin == null) {
                throw new ServletException(
                    "When CASFilter protects pages that do not receive a 'ticket' "
                        + "parameter, it needs a edu.yale.its.tp.cas.client.filter.loginUrl "
                        + "filter parameter");
            }
            ((HttpServletResponse)response).sendRedirect(
                casLogin
                    + "?service="
                    + getService((HttpServletRequest)request)
                    + ((casRenew != null && !casRenew.equals(""))
                        ? "&renew=" + casRenew
                        : ""));

            // abort chain13311672793
            
            log.info("\n\n\n\n\n ticket==null \n\n\n\n");
            
            return;
        }

        // Yay, ticket!  Validate it.
        String user = getAuthenticatedUser((HttpServletRequest)request);
        if (user == null){
        	log.info("\n\n\n\n\n user == null \n\n\n\n");
            throw new ServletException("Unexpected CAS authentication error");
        }    

        // Store the authenticated user in the session
        if (session != null) // probably unncessary
            session.setAttribute(CAS_FILTER_USER, user);

        // continue processing the request
        log.info("\n\n\n\n\n return \n\n\n\n");
        
        fc.doFilter(request, response);
    }

    //*********************************************************************
    // Destruction

    public void destroy() {
    }

    //*********************************************************************
    // Utility methods

    /**
     * Converts a ticket parameter to a username, taking into account an
     * optionally configured trusted proxy in the tier immediately in front
     * of us.
     */
    private String getAuthenticatedUser(HttpServletRequest request)
        throws ServletException {
        ProxyTicketValidator pv = null;
        try {
            pv = new ProxyTicketValidator();
            pv.setCasValidateUrl(casValidate);
            pv.setServiceTicket(request.getParameter("ticket"));
            pv.setService(getService(request));
	    pv.setRenew(Boolean.valueOf(casRenew).booleanValue());
            pv.validate();
            if (!pv.isAuthenticationSuccesful())
                throw new ServletException(
                    "CAS authentication error: " + pv.getErrorCode() + ": " + pv.getErrorMessage());
            if (pv.getProxyList().size() != 0) {
                // ticket was proxied
                if (casAuthorizedProxy == null) {
                    throw new ServletException("this page does not accept proxied tickets");
                } else {
                    boolean authorized = false;
                    String proxy = (String)pv.getProxyList().get(0);
                    StringTokenizer casProxies =
                        new StringTokenizer(casAuthorizedProxy);
                    while (casProxies.hasMoreTokens()) {
                        if (proxy.equals(casProxies.nextToken())) {
                            authorized = true;
                            break;
                        }
                    }
                    if (!authorized) {
                        throw new ServletException(
                            "unauthorized top-level proxy: '"
                                + pv.getProxyList().get(0)
                                + "'");
                    }
                }
            }
            return pv.getUser();
        } catch (SAXException ex) {
            String xmlResponse = "";
            if (pv != null)
                xmlResponse = pv.getResponse();
            throw new ServletException(ex + " " + xmlResponse);
        } catch (ParserConfigurationException ex) {
            throw new ServletException(ex);
        } catch (IOException ex) {
            throw new ServletException(ex);
        }
    }

    /**
     * Returns either the configured service or figures it out for the current
     * request.  The returned service is URL-encoded.
     */
    private String getService(HttpServletRequest request)
        throws ServletException {
        // ensure we have a server name or service name
        if (casServerName == null && casServiceUrl == null)
            throw new ServletException(
                "need one of the following configuration "
                    + "parameters: edu.yale.its.tp.cas.client.filter.serviceUrl or "
                    + "edu.yale.its.tp.cas.client.filter.serverName");

        // use the given string if it's provided
        if (casServiceUrl != null)
            return URLEncoder.encode(casServiceUrl);
        else
            // otherwise, return our best guess at the service
            return CASUtil.getService(request, casServerName);
    }
}
