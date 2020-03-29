const LastUpdate = require("../models/lastupdate.model.js");

// Retrieve all Customers from the database.
exports.getLastUpdate = (req, res) => {
    LastUpdate.getLastUpdate((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

