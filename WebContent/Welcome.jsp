<%--
    Document   : Welcome
    Created on : Jan 5, 2019, 9:45:17 PM
    Author     : siammridha
--%>
<%@page import="java.sql.ResultSet"%>
<%@page import="com.org.Actions"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Welcome</title>

        <link rel="stylesheet" href="css/style2.css">
        <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css'>
        <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery.bootstrapvalidator/0.5.2/css/bootstrapValidator.min.css"/>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.min.css'>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js" type="text/javascript"></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
        <script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js'></script>
        <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/jquery.bootstrapvalidator/0.5.2/js/bootstrapValidator.min.js"></script>
        <script  src="js/Welcome.js"></script>
    </head>
    <body>
        <div class="container">
            <form class="well form-horizontal" method="POST" accept-charset="UTF-8" id="UserInfo_form">
                <fieldset>
                    <!-- Form Name -->
                    <legend>
                        <center>
                            <h2><b>User Info.</b></h2>
                        </center>
                    </legend>
                    <br>
                    <!-- Edit -->
                    <button type="button" class="btn btn-warning" id="edit">EDIT</button>
                    <center>
                        <p id="error" class="text-danger"></p>
                    </center>
                    <%
                        if (session.getAttribute("userName") == null && session.getAttribute("UserPassword") == null) {
                            response.sendRedirect("Login.jsp");
                        } else {
                            Actions action = new Actions();
                            String UserName = session.getAttribute("userName").toString();
                            String Password = session.getAttribute("UserPassword").toString();
                            ResultSet myRs = action.UserInfo(UserName, Password);
                            while (myRs.next()) {
                                //First Name
                                out.println("<div class='form-group'>"
                                        + "<label class='col-md-4 control-label'>First Name:</label>"
                                        + "<div class='col-md-4 inputGroupContainer'>"
                                        + "<div class='input-group'>"
                                        + "<input  name='first_name' value='" + myRs.getString("Firstname") + "' class='form-control'  type='text' maxlength=25 disabled>"
                                        + "</div>"
                                        + "</div>"
                                        + "</div>");
                                //Last Name
                                out.println("<div class='form-group'>"
                                        + "<label class='col-md-4 control-label'>Last Name:</label>"
                                        + "<div class='col-md-4 inputGroupContainer'>"
                                        + "<div class='input-group'>"
                                        + "<input  name='last_name' value='" + myRs.getString("Lastname") + "' class='form-control'  type='text' maxlength=25 disabled>"
                                        + "</div>"
                                        + "</div>"
                                        + "</div>");
                                //Email
                                out.println("<div class='form-group'>"
                                        + "<label class='col-md-4 control-label'>E-Mail Address:</label>"
                                        + "<div class='col-md-4 inputGroupContainer'>"
                                        + "<div class='input-group'>"
                                        + "<input  name='email' value='" + myRs.getString("Email") + "' class='form-control'  type='text' maxlength=50 disabled>"
                                        + "</div>"
                                        + "</div>"
                                        + "</div>");
                                //Phone Number
                                out.println("<div class='form-group'>"
                                        + "<label class='col-md-4 control-label'>Phone Number:</label>"
                                        + "<div class='col-md-4 inputGroupContainer'>"
                                        + "<div class='input-group'>"
                                        + "<input  name='contact_no' value='" + myRs.getString("PhoneNumber") + "' class='form-control'  type='text' maxlength=12 disabled>"
                                        + "</div>"
                                        + "</div>"
                                        + "</div>");
                            }
                        }
                    %>
                    <!-- Log Out -->
                    <center>
                        <button type="button" class="btn btn-warning" id="LogOut">LOGOUT</button>
                    </center>
                </fieldset>
            </form>
        </div><!-- /.container -->
    </body>
</html>
