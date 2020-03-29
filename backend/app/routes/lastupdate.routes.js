module.exports = app => {
    const lastupdate = require("../controllers/lastupdate.controller.js");


    app.get("/api/last_update", lastupdate.getLastUpdate);

};