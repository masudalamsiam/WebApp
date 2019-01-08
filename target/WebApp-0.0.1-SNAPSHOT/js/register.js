$(document).ready(function () {
    $('#registration_form').bootstrapValidator({
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
                    }
                }
            },
            user_name: {
                validators: {
                    stringLength: {
                        min: 8
                    },
                    notEmpty: {
                        message: 'Please enter your Username'
                    }
                }
            },
            user_password: {
                validators: {
                    stringLength: {
                        min: 8
                    },
                    notEmpty: {
                        message: 'Please enter your Password'
                    }
                }
            },
            confirm_password: {
                validators: {
                    identical: {
                        field: 'user_password',
                        message: 'The password and its confirm are not the same'
                    },
                    notEmpty: {
                        message: 'Please confirm your Password'
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
                        max: 12
                    },
                    notEmpty: {
                        message: 'Please enter your Contact No.'
                    }

                }
            }
        }
    }).on('success.form.bv', function (e) {
        $("#load").button('loading');
        $('#registration_form').data('bootstrapValidator').resetForm();

        // Prevent form submission
        e.preventDefault();

        // Get the form instance
        var $form = $(e.target);

        // Use Ajax to submit form data
        var url = "Services?Form_Name=Registration&" + $form.serialize() + $(this).val();
        ajax(url, function (responseText) {
            if (responseText != "Success") {
                $("#error").html(responseText);
            } else {
                window.location.href = 'Login.jsp';
            }
            $("#load").button('reset');
        });
        //console.log($form.serialize());
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
});