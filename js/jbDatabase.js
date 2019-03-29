<!--tx = Transaction-->
function jbErrorHandler (tx,error){
    console.log("SQL error: " + tx + " (" + error.code +") " + error.message);
}

var db;

var DB ={

    jbCreateDatabase: function(){

        var shortName = "JBFeedbackDB";
        var version = "1.0";
        var displayName = "DB for JBFeedbackA3 app";
        var dbSize = 2 * 1024 * 1024;

        //create database
        function dbCreateSuccess() {
            console.info(("Success: Database created Successfully."))
        }
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

    },

    jbCreateTables: function(){

        function txFunction(tx) {
            var reviewOptions = [];
            var typeOptions = [];

            //Drop type table
            var dropTypeSQL = "DROP TABLE IF EXISTS type";
            function successDropType() {
                console.info("Table: 'type' dropped successfully.");
            }
            tx.executeSql(dropTypeSQL, typeOptions, successDropType, jbErrorHandler);

            //Create type table
            var createTypeSQL = "CREATE TABLE IF NOT EXISTS type( "
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(20) NOT NULL);";
            function successCreateType() {
                console.info("Table: 'type' created successfully.");
            }
            tx.executeSql(createTypeSQL, typeOptions, successCreateType, jbErrorHandler);

            //Insert Canadian row
            var insertCanadianTypeSQL = "INSERT INTO type VALUES (NULL, 'Canadian');";
            function successInsertCanadian() {
                console.info("Row: 'Canadian' inserted successfully.");
            }
            tx.executeSql(insertCanadianTypeSQL, typeOptions, successInsertCanadian, jbErrorHandler);

            //Insert Asian row
            var insertAsianTypeSQL = "INSERT INTO type VALUES (NULL, 'Asian');";
            function successInsertAsian() {
                console.info("Row: 'Asian' inserted successfully.");
            }
            tx.executeSql(insertAsianTypeSQL, typeOptions, successInsertAsian, jbErrorHandler);

            //Insert Other row
            var insertOtherTypeSQL = "INSERT INTO type VALUES (NULL, 'Other');";
            function successInsertOther() {
                console.info("Row: 'Other' inserted successfully.");
            }
            tx.executeSql(insertOtherTypeSQL, typeOptions, successInsertOther, jbErrorHandler);

            //Create review table
            var reviewSQL = "CREATE TABLE IF NOT EXISTS review( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "businessName VARCHAR(30) NOT NULL," +
                "typeId INTEGER NOT NULL," +
                "reviewerEmail VARCHAR(30)," +
                "reviewerComments TEXT," +
                "reviewDate DATE," +
                "hasRating VARCHAR(5)," +
                "rating1 INTEGER," +
                "rating2 INTEGER," +
                "rating3 INTEGER," +
                "FOREIGN KEY(typeId) REFERENCES type(id));";
            function successCreateReview() {
                console.info("Table: 'review' dropped successfully.");
            }
            tx.executeSql(reviewSQL, reviewOptions, successCreateReview, jbErrorHandler);
        }
        function successCreateTables() {
            console.info("Success: all tables and rows created successfully.");
        }
        db.transaction(txFunction, jbErrorHandler, successCreateTables);
    },

    jbDropTables: function(){
        function txFunction(tx) {
            var dropOptions = [];

            //Drop type
            var dropTypeSQL = "DROP TABLE IF EXISTS type;";
            function successDropType() {
                console.info("Table: 'type' dropped successfully.");
            }
            tx.executeSql(dropTypeSQL, dropOptions, successDropType, jbErrorHandler);

            //Drop review
            var dropReviewSQL = "DROP TABLE IF EXISTS review;";
            function successDropReview() {
                console.info("Table: 'review' dropped successfully.");
            }
            tx.executeSql(dropReviewSQL, dropOptions, successDropReview, jbErrorHandler);
        }
        function successDropTables() {
            console.info("Success: all tables and rows dropped successfully.");
        }
        db.transaction(txFunction, jbErrorHandler, successDropTables);
    }
};


