const Patient = require("../models/patient.model.js");

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Patient.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};



exports.findAllByDate = (req, res) => {
    Patient.getAllByDate(req.params.reportDate, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};
