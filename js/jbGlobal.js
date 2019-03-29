/*
Mobile web development
Assignment 2
Created by: Jarod Burchill
*/
$(document).ready(function () {
    init();
    initDB()
});
function initDB() {
    try {
        DB.jbCreateDatabase();
        if (db) {
            console.info("Creating Tables....");
            DB.jbCreateTables();
        }
        else {
            console.error("Error: cannot create DB. can not proceed.");
        }
    }
    catch (ex) {
        console.error("Error: " + ex.toString() +" (Fatal) Error in initDB(). can not proceed.");
    }
}
function init() {
    console.info("DOM is ready");
    $("#jbAddRatings").on("click", jbAddRatings_Click);
    $("#jbEditAddRatings").on("click", jbEditAddRatings_Click);

    $("#jbFoodQuality").on("change", jbRatingsGroup_Change);
    $("#jbServices").on("change", jbRatingsGroup_Change);
    $("#jbValue").on("change", jbRatingsGroup_Change);
    $("#jbEditFoodQuality").on("change", jbEditRatingsGroup_Change);
    $("#jbEditServices").on("change", jbEditRatingsGroup_Change);
    $("#jbEditValue").on("change", jbEditRatingsGroup_Change);

    $("#jbSave").on("click", jbSave_Click);
    $("#jbUpdate").on("click", jbUpdate_Click);
    $("#jbDelete").on("click", jbDelete_Click);
    $('#jbCancel').on("click", jbCancel_Click);

    $("#jbSaveDefault").on("click", jbSaveDefault_Click);
    $("#jbClearDatabase").on("click", jbClearDatabase_Click);

    $("#jbAddFeedbackPage").on("pageshow", jbAddFeedbackPage_Show);
    $("#jbViewFeedbackPage").on("pageshow", jbViewFeedbackPage_Show);
    $("#jbEditFeedbackPage").on("pageshow", jbEditFeedbackPage_Show);
    $("#jbSettingsPage").on("pageshow", jbAddSettingsPage_Show);
}
function jbAddRatings_Click() {
    jbResetRatings("jbFoodQuality", "jbServices", "jbValue");
    jbRatingsGroup_Change();
    $("#jbRatings").toggle();
}
function jbEditAddRatings_Click() {
    jbResetRatings("jbEditFoodQuality", "jbEditServices", "jbEditValue");
    jbEditRatingsGroup_Change();
    $("#jbEditRatings").toggle();
}
function jbRatingsGroup_Change(){
    jbCalculateRating(
        $("#jbFoodQuality").val(),
        $("#jbServices").val(),
        $("#jbValue").val(),
        "jbOverallRating"
        );
}
function jbEditRatingsGroup_Change() {
    jbCalculateRating(
        $("#jbEditFoodQuality").val(),
        $("#jbEditServices").val(),
        $("#jbEditValue").val(),
        "jbEditOverallRating"
    );
}
function jbSave_Click() {
    if (jbValidateAdd()) {
        console.info("Success: validation was successful.");
        jbAddFeedback();
        alert("New Feedback Added.");
        jbResetAdd();
        window.location.href = "#jbViewFeedbackPage";
    }
    else {
        console.info("Failure: validation failed.");
    }
}
function jbUpdate_Click() {
    if (jbValidateEdit()) {
        console.info("Success: validation was successful.");
        jbUpdateFeedback();
        alert("Feedback Updated.");
        window.location.href = "#jbViewFeedbackPage";
    }
    else {
        console.info("Failure: validation failed.");
    }
}
function jbDelete_Click() {
    jbDeleteFeedback();
    alert("Feedback Deleted.");
    window.location.href = "#jbViewFeedbackPage";
}
function jbCancel_Click() {
    window.location.href = "#jbViewFeedbackPage";
}
function jbSaveDefault_Click() {
    if (jbValidateDefaultEmail()) {
        localStorage.setItem("DefaultEmail", $("#jbDefaultEmail").val());
        alert("Default reviewer email address saved.");
    }
}
function jbClearDatabase_Click() {
    try {
        if (confirm("Are you sure you want to clear the database?")) {
            DB.jbDropTables();
            alert("Database Cleared.");
            initDB();
        }
    }
    catch (ex) {
        console.error("Error: " + ex.toString() +" (Fatal) Error in initDB(). can not proceed.");
    }
}
var comboboxCreated = false;
function jbAddFeedbackPage_Show() {
    document.getElementById("jbReviewerEmail").value = localStorage.getItem("DefaultEmail");
    if (!comboboxCreated) {
        jbUpdateTypesDropdown("#jbType");
        comboboxCreated = true;
    }
}
function jbViewFeedbackPage_Show() {
    jbGetReviews();
}
var editComboboxCreated = false;
function jbEditFeedbackPage_Show() {
    if (!editComboboxCreated) {
        jbUpdateTypesDropdown("#jbEditType");
        editComboboxCreated = true;
    }
    jbShowCurrentReview();
}
function jbAddSettingsPage_Show() {
    document.getElementById("jbDefaultEmail").value = localStorage.getItem("DefaultEmail");
}


