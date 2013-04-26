package cn.com.dayang.cas;

import javax.servlet.http.*;

/**
 * <p>Wraps the <code>HttpServletRequest</code> object, replacing
 * <code>getRemoteUser()</code> with a version that returns the current
 * CAS logged-in user.</p>
 *
 * @author Drew Mazurek
 */
public class CASFilterRequestWrapper extends HttpServletRequestWrapper {

    public CASFilterRequestWrapper(HttpServletRequest request) {
	super(request);
    }

    /**
     * <p>Returns the currently logged in CAS user.</p>
     * <p>Specifically, this returns the value of the session attribute,
     * <code>CASFilter.CAS_FILTER_USER</code>.</p>
     */
    public String getRemoteUser() {
	return (String)getSession().getAttribute(CASFilter.CAS_FILTER_USER);
    }
}
