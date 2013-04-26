package cn.com.dayang.cas;

import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

/**
 * Provides utility functions in support of CAS clients.
 */
public class CASUtil {

  /**
   * Returns a service ID (URL) as a composite of the preconfigured server
   * name and the runtime request.
   */
  public static String getService(HttpServletRequest request, String server)
      throws ServletException {
    // ensure we have a server name
    if (server == null)
      throw new IllegalArgumentException("name of server is required");

    // now, construct our best guess at the string
    StringBuffer sb = new StringBuffer();
    if (request.isSecure())
      sb.append("https://");
    else
      sb.append("http://");
    sb.append(server);
    sb.append(request.getRequestURI());

    if (request.getQueryString() != null) {
      // first, see whether we've got a 'ticket' at all
      int ticketLoc = request.getQueryString().indexOf("ticket=");

      // if ticketLoc == 0, then it's the only parameter and we ignore
      // the whole query string

      // if no ticket is present, we use the query string wholesale
      if (ticketLoc == -1)
        sb.append("?" + request.getQueryString());
      else if (ticketLoc > 0) {
	ticketLoc = request.getQueryString().indexOf("&ticket=");
	if (ticketLoc == -1) {
	  // there was a 'ticket=' unrelated to a parameter named 'ticket'
	  sb.append("?" + request.getQueryString());
	} else if (ticketLoc > 0) {
	  // otherwise, we use the query string up to "&ticket="
          sb.append("?" + request.getQueryString().substring(0, ticketLoc));
	}
      }
    }
    return URLEncoder.encode(sb.toString());
  }
}
