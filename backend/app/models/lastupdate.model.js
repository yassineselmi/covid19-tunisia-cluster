const sql = require("./db.js");

const LastUpdate = function(lastupdate) {
    this.lastupdate = lastupdate.lastupdate

}


LastUpdate.getLastUpdate = result => {

    var str = "SELECT lastupdate from lastupdate "

    sql.query(str, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};



module.exports = LastUpdate;
