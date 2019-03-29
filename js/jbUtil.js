/*
Mobile web development
Assignment 2
Created by: Jarod Burchill
*/
function jbResetRatings(foodQuality, services, value) {
    document.getElementById(foodQuality).value = "0";
    document.getElementById(services).value = "0";
    document.getElementById(value).value = "0";
}
function jbResetAdd() {
    $("#jbBusinessName").val("");
    $('select option:contains("Other")').prop('selected', true);
    $("#jbType").selectmenu('refresh');
    $("#jbReviewerEmail").val("");
    $("#jbReviewerComments").val("");
    $("#jbReviewDate").val("");
    $("#jbAddRatings").prop('checked', false).checkboxradio('refresh');
    $("#jbRatings").hide();
}
function jbCalculateRating(foodQuality, services, value, overallRatingId) {
    var total = (Number(foodQuality) + Number(value) + Number(services)) * (100/15);
    total = Math.round(total);
    document.getElementById(overallRatingId).value = total.toString() + '%';
}
function jbValidateAdd(){
    var form = $("#jbAddForm");
    form.validate({
        rules: {
            jbBusinessName: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            jbReviewerEmail: {
                required: true,
                emailValid: true
            },
            jbReviewDate: {
                required: true
            },
            jbFoodQuality: {
                required: true,
                min: 0,
                max: 5
            },
            jbServices: {
                required: true,
                min: 0,
                max: 5
            },
            jbValue: {
                required: true,
                min: 0,
                max: 5
            }
        },
        messages: {
            jbBusinessName: {
                required: "Business name is required.",
                minlength: "Name length must be 2-20 characters long.",
                maxlength: "Name length must be 2-20 characters long."
            },
            jbReviewerEmail: {
                required: "Email address is required.",
                emailValid: "Please enter a valid email address."
            },
            jbReviewDate: {
                required: "Review date is required."
            },
            jbFoodQuality: {
                required: "Rating must be 0-5.",
                min: "Rating must be 0-5.",
                max: "Rating must be 0-5."
            },
            jbServices: {
                required: "Rating must be 0-5.",
                min: "Rating must be 0-5.",
                max: "Rating must be 0-5."
            },
            jbValue: {
                required: "Rating must be 0-5.",
                min: "Rating must be 0-5.",
                max: "Rating must be 0-5."
            }
        }
    });
    return form.valid();
}
function jbValidateEdit(){
    var form = $("#jbEditForm");
    form.validate({
        rules: {
            jbEditBusinessName: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            jbEditReviewerEmail: {
                required: true,
                emailValid: true
            },
            jbEditReviewDate: {
                required: true
            },
            jbEditFoodQuality: {
                required: true,
                min: 0,
                max: 5
            },
            jbEditServices: {
                required: true,
                min: 0,
                max: 5
            },
            jbEditValue: {
                required: true,
                min: 0,
                max: 5
            }
        },
        messages: {
            jbEditBusinessName: {
                required: "Business name is required.",
                minlength: "Name length must be 2-20 characters long.",
                maxlength: "Name length must be 2-20 characters long."
            },
            jbEditReviewerEmail: {
                required: "Email address is required.",
                emailValid: "Please enter a valid email address."
            },
            jbEditReviewDate: {
                required: "Review date is required."
            },
            jbEditFoodQuality: {
                required: "Rating must be 0-5.",
                min: "Rating must be 0-5.",
                max: "Rating must be 0-5."
            },
            jbEditServices: {
                required: "Rating must be 0-5.",
                min: "Rating must be 0-5.",
                max: "Rating must be 0-5."
            },
            jbEditValue: {
                required: "Rating must be 0-5.",
                min: "Rating must be 0-5.",
                max: "Rating must be 0-5."
            }
        }
    });
    return form.valid();
}
function jbValidateDefaultEmail(){
    var form = $("#jbSettingsForm");
    form.validate({
        rules: {
            jbDefaultEmail: {
                emailValid: true
            }
        },
        messages: {
            jbDefaultEmail: {
                emailValid: "Please enter a valid email address."
            }
        }
    });
    return form.valid();
}
jQuery.validator.addMethod("emailValid",
    function (email){
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
})
