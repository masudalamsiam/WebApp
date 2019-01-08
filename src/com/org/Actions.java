package com.org;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
public class Actions {

    private Connection myConn;
    private PreparedStatement myStmt;
    private ResultSet myRs;

    public Actions() throws SQLException, ClassNotFoundException {
        Class.forName("com.mysql.jdbc.Driver");
        this.myConn = DriverManager.getConnection("jdbc:mysql://us-cdbr-iron-east-01.cleardb.net/heroku_7bae431aaf9e4e6", "b6fd4b7c86ca4d", "79ee0e30");
    }

    public void Register(HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException {
        PrintWriter out = response.getWriter();
        try {
            String userName = request.getParameter("user_name");
            String UserPassword = request.getParameter("user_password");
            String FirstName = request.getParameter("first_name");
            String LastName = request.getParameter("last_name");
            String Email = request.getParameter("email");
            String PhoneNumber = request.getParameter("contact_no");
            String SQL1 = "INSERT INTO Users VALUES (?,?,?,?,?,?)";
            myStmt = myConn.prepareStatement(SQL1);
            myStmt.setString(1, userName);
            myStmt.setString(2, UserPassword);
            myStmt.setString(3, FirstName);
            myStmt.setString(4, LastName);
            myStmt.setString(5, Email);
            myStmt.setString(6, PhoneNumber);
            myStmt.executeUpdate();
            out.print("Success");
        } catch (SQLException e) {
            out.print(e);
        }
    }

    public void Login(HttpServletRequest request, HttpServletResponse response) throws IOException, SQLException {
        PrintWriter out = response.getWriter();
        try {
            String userName = request.getParameter("user_name");
            String UserPassword = request.getParameter("user_password");
            String SQL = "SELECT * FROM Users WHERE UserName = ? AND Password = ?";
            myStmt = myConn.prepareStatement(SQL);
            myStmt.setString(1, userName);
            myStmt.setString(2, UserPassword);
            myRs = myStmt.executeQuery();
            if (myRs.next()) {
                HttpSession session = request.getSession();
                session.setAttribute("userName", userName);
                session.setAttribute("UserPassword", UserPassword);
                out.print("Success");
            } else {
                out.print("Incorect User Name or Password");
            }

        } catch (SQLException e) {
            out.print(e);
        }

    }

    public ResultSet UserInfo(String username, String password) {
        try {
            String SQL = "SELECT * FROM Users WHERE UserName = ? AND Password = ?";
            myStmt = myConn.prepareStatement(SQL);
            myStmt.setString(1, username);
            myStmt.setString(2, password);
            myRs = myStmt.executeQuery();
            return myRs;
        } catch (SQLException e) {
            System.out.print(e);
        }
        return null;
    }

    public void UpdateUserInfo(HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException {
        PrintWriter out = response.getWriter();
        try {
            HttpSession session = request.getSession();
            String UserName = session.getAttribute("userName").toString();
            String FirstName = request.getParameter("first_name");
            String LastName = request.getParameter("last_name");
            String Email = request.getParameter("email");
            String PhoneNumber = request.getParameter("contact_no");
            String SQL = "UPDATE Users SET FirstName = ?, LastName= ?, Email= ?, PhoneNumber= ? WHERE UserName = ?";
            myStmt = myConn.prepareStatement(SQL);
            myStmt.setString(1, FirstName);
            myStmt.setString(2, LastName);
            myStmt.setString(3, Email);
            myStmt.setString(4, PhoneNumber);
            myStmt.setString(5, UserName);
            myStmt.executeUpdate();
            out.print("Success");

        } catch (SQLException e) {
            out.print(e);
        }
    }

    public Boolean UpdateInfo() {
        return true;
    }
}

