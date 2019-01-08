$(document).ready(function () {
    $('#UserInfo_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            first_name: {
                validators: {
                    stringLength: {
                        min: 2
                    },
                    notEmpty: {
                        message: 'Please enter your First Name'
                    },
                    regexp: {
                        regexp: /^[A-Za-z]*[A-Za-z][A-Za-z]*$/,
                        message: 'First Name can only consist of alphabetical'
                    }
                }
            },
            last_name: {
                validators: {
                    stringLength: {
                        min: 2
                    },
                    notEmpty: {
                        message: 'Please enter your Last Name'
                    },
                    regexp: {
                        regexp: /^[A-Za-z]*[A-Za-z][A-Za-z]*$/,
                        message: 'Last Name can only consist of alphabetical'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Please enter your Email Address'
                    },
                    emailAddress: {
                        message: 'Please enter a valid Email Address'
                    }
                }
            },
            contact_no: {
                validators: {
                    stringLength: {
                        min: 12,
                        message: 'Please enter your Contact No in the folowing format'
                    },
                    notEmpty: {
                        message: 'Please enter your Contact No.'
                    }

                }
            }
        }
    }).on('success.form.bv', function (e) {
        $('#UserInfo_form').data('bootstrapValidator').resetForm();

        // Prevent form submission
        e.preventDefault();

        // Get the form instance
        var $form = $(e.target);

        // Use Ajax to submit form data
        var url = "Services?Form_Name=UserInfo&" + $form.serialize() + $(this).val();
        ajax(url, function (responseText) {
            if (responseText !== "Success") {
                $("#error").html(responseText);
            } else {
                $("#edit").html("EDIT");
                $("input").prop('disabled', true);
            }
        });
    });

    function ajax(url, callback) {
        var http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
                callback(http.responseText);
            }
        };
        http.send(null);
    }

    $("#edit").click(function () {
        if ($(this).html() === "EDIT") {
            $(this).html("SAVE");
            $("input").prop('disabled', false);
            $("#edit").prop('type', 'button');

        } else if ($(this).html() === "SAVE") {
            $(this).prop('type', 'submit');
        }
    });

    $("#LogOut").click(function () {
        var url = "Services?Form_Name=Logout&";
        ajax(url, function (responseText) {
            if (responseText === "Success") {
                window.location.href = 'Welcome.jsp';
            }
            console.log(responseText);
        });
    });

});