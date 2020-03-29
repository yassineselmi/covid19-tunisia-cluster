module.exports = app => {
    const patients = require("../controllers/patient.controller.js");


    // Retrieve all patients
    app.get("/api/patients", patients.findAll);

    app.get("/api/patients/date/:reportDate", patients.findAllByDate);

};