function jbUpdateTypesDropdown(comboboxId) {
    var options = [];

    function callback(tx, results) {
        var combobox = $(comboboxId);

        for (var i = 0; i < results.rows.length; i++) {
            var type = results.rows[i];
            combobox.append(new Option(type['name'], type['id']));
        }
        if (comboboxId === "#jbType") {
            $('select option:contains("Other")').prop('selected', true);
        }
        combobox.selectmenu("refresh");
    }

    Type.selectAll(options, callback);
}

function jbAddFeedback(){
    var businessName = $("#jbBusinessName").val();
    var typeId = Number($("#jbType").val());
    var reviewerEmail = $("#jbReviewerEmail").val();
    var reviewerComments = $("#jbReviewerComments").val();
    var reviewDate = $("#jbReviewDate").val();
    var hasRating = $("#jbAddRatings").prop("checked");
    var rating1 = Number($("#jbFoodQuality").val());
    var rating2 = Number($("#jbServices").val());
    var rating3 = Number($("#jbValue").val());
    var options;

    if (hasRating){
        options = [null,businessName,typeId,reviewerEmail,reviewerComments,reviewDate,hasRating,rating1,rating2,rating3];
    }
    else {
        options = [null,businessName,typeId,reviewerEmail,reviewerComments,reviewDate,hasRating,"","",""];
    }

    function callback(){
        console.info("Success: record inserted into review table.");
    }

    Review.insert(options, callback);
}

function jbGetReviews(){
    var options = [];

    function callback(tx, results) {
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var review = results.rows[i];
            var overallRating;

            if (review['hasRating'] === "true"){
                overallRating = Math.round((review['rating1'] + review['rating2'] + review['rating3']) * (100/15)) + "%";
            }
            else {
                overallRating = "N/A";
            }

            htmlCode += "<li>" +
                "<a data-role='button' data-row-id=" + review['id'] + " href='#jbEditFeedbackPage'>" +
                "<h1>Business Name: " + review['businessName'] + "</h1>" +
                "<p>Reviewer Email: " + review['reviewerEmail'] + "</p>" +
                "<p>Comments: "+ review['reviewerComments'] +"</p>" +
                "<p>Overall Rating: "+ overallRating +"</p>" +
                "</a>" +
                "</li>";
        }
        var list = $("#jbFeedbackList");
        list = list.html(htmlCode);
        list.listview("refresh");

        function clickHandler() {
            localStorage.setItem("reviewId", $(this).attr("data-row-id"));
        }

        $("#jbFeedbackList a").on("click", clickHandler);
    }

    Review.selectAll(options, callback);
}

function jbShowCurrentReview() {
    var id = localStorage.getItem("reviewId");
    var options = [id];

    function callback(tx, results) {
        var review = results.rows[0];

        $("#jbEditBusinessName").val(review['businessName']);
        $("#jbEditType").val(review['typeId']).selectmenu("refresh");
        $("#jbEditReviewerEmail").val(review['reviewerEmail']);
        $("#jbEditReviewerComments").val(review['reviewerComments']);
        $("#jbEditReviewDate").val(review['reviewDate']);
        if (review['hasRating'] === "true") {
            $("#jbEditAddRatings").prop('checked', true).checkboxradio('refresh');
            $("#jbEditRatings").show();
            $("#jbEditFoodQuality").val(review['rating1']);
            $("#jbEditServices").val(review['rating2']);
            $("#jbEditValue").val(review['rating3']);
            var overallRating = Math.round((review['rating1'] + review['rating2'] + review['rating3']) * (100/15)) + "%";
            $("#jbEditOverallRating").val(overallRating);
        }
        else {
            $("#jbEditAddRatings").prop('checked', false).checkboxradio('refresh');
            $("#jbEditRatings").hide();
        }
    }

    Review.select(options, callback);
}
function jbUpdateFeedback() {
    var id = localStorage.getItem("reviewId");
    var businessName = $("#jbEditBusinessName").val();
    var typeId = Number($("#jbEditType").val());
    var reviewerEmail = $("#jbEditReviewerEmail").val();
    var reviewerComments = $("#jbEditReviewerComments").val();
    var reviewDate = $("#jbEditReviewDate").val();
    var hasRating = $("#jbEditAddRatings").prop("checked");
    var rating1 = Number($("#jbEditFoodQuality").val());
    var rating2 = Number($("#jbEditServices").val());
    var rating3 = Number($("#jbEditValue").val());
    var options;

    if (hasRating){
        options = [businessName,typeId,reviewerEmail,reviewerComments,reviewDate,hasRating,rating1,rating2,rating3, id];
    }
    else {
        options = [businessName,typeId,reviewerEmail,reviewerComments,reviewDate,hasRating,"","","", id];
    }

    function callback(){
        console.info("Success: record from review table updated.");
    }

    Review.update(options, callback);
}
function jbDeleteFeedback() {
    var id = localStorage.getItem("reviewId");
    var options = [id];

    function callback(){
        console.info("Success: record deleted from review table.");
    }

    Review.delete(options, callback);
}