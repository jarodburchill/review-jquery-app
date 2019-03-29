var Review = {
    insert: function(options, callBack){
        function txFunction(tx) {
            var sql = "INSERT INTO review(id,businessName,typeId,reviewerEmail,reviewerComments," +
                "reviewDate,hasRating,rating1,rating2,rating3) VALUES(?,?,?,?,?,?,?,?,?,?);";
            tx.executeSql(sql, options, callBack, jbErrorHandler);
        }
        function successInsert() {
            console.info("Success: review insert transaction successful.");
        }
        db.transaction(txFunction, jbErrorHandler, successInsert);
    },
    delete: function(options, callBack){
        function txFunction(tx) {
            var sql = "DELETE FROM review WHERE id=?;";
            tx.executeSql(sql, options, callBack, jbErrorHandler);
        }
        function successDelete() {
            console.info("Success: review delete transaction successful.");
        }
        db.transaction(txFunction, jbErrorHandler, successDelete);
    },
    selectAll: function(options, callBack){
        function txFunction(tx) {
            var sql = "SELECT * FROM review;";
            tx.executeSql(sql, options, callBack, jbErrorHandler);
        }
        function successSelectAll() {
            console.info("Success: review select all transaction successful.");
        }
        db.transaction(txFunction, jbErrorHandler, successSelectAll);
    },
    select: function(options,callBack){
        function txFunction(tx) {
            var sql = "SELECT * FROM review WHERE id=?;";
            tx.executeSql(sql, options, callBack, jbErrorHandler);
        }
        function successSelect() {
            console.info("Success: review select transaction successful.");
        }
        db.transaction(txFunction, jbErrorHandler, successSelect);
    },
    update: function(options, callBack){
        function txFunction(tx) {
            var sql = "UPDATE review SET businessName=?,typeId=?,reviewerEmail=?,reviewerComments=?," +
                "reviewDate=?,hasRating=?,rating1=?,rating2=?,rating3=? WHERE id=?;";
            tx.executeSql(sql, options, callBack, jbErrorHandler);
        }
        function successUpdate() {
            console.info("Success: review update transaction successful.");
        }
        db.transaction(txFunction, jbErrorHandler, successUpdate);
    }
};

var Type ={
    selectAll: function(options, callBack){
        function txFunction(tx) {
            var sql = "SELECT * FROM type;";
            tx.executeSql(sql, options, callBack, jbErrorHandler);
        }
        function successSelectAll() {
            console.info("Success: type select all transaction successful.");
        }
        db.transaction(txFunction, jbErrorHandler, successSelectAll);
    },
};