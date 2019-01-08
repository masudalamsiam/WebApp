$(document).ready(function () {
    $('#login_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
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
            }
        }
    }).on('success.form.bv', function (e) {
        $("#load").button('loading');
        $('#login_form').data('bootstrapValidator').resetForm();

        // Prevent form submission
        e.preventDefault();


        // Get the form instance
        var $form = $(e.target);

        // Use Ajax to submit form data
        var url = "Services?Form_Name=Login&" + $form.serialize() + $(this).val();
        ajax(url, function (responseText) {
            if (responseText != "Success") {
                $("#error").html(responseText);
            } else {
                window.location.href = 'Welcome.jsp';
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