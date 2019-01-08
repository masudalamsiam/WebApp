package com.org;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/Services")
public class Services extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public Services() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        PrintWriter out = response.getWriter();
        try {
            Actions acrions = new Actions();
            if (request.getParameter("Form_Name").equals("Registration")) {
                acrions.Register(request, response);
            } else if (request.getParameter("Form_Name").equals("Login")) {
                acrions.Login(request, response);
            	
            } else if (request.getParameter("Form_Name").equals("UserInfo")) {
                acrions.UpdateUserInfo(request, response);
            } else if (request.getParameter("Form_Name").equals("Logout")) {
                session.removeAttribute("userName");
                session.removeAttribute("UserPassword");
                session.invalidate();
                out.print("Success");
            }
        } catch (SQLException | ClassNotFoundException ex) {
            Logger.getLogger(Services.class.getName()).log(Level.SEVERE, null, ex);
        }
	}

}
