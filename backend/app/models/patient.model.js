const sql = require("./db.js");

// constructor
const Patient = function(patient) {
    this.patientId = patient.patientId;
    this.reportedOn = patient.reportedOn;
    this.onsetEstimate = patient.onsetEstimate;
    this.ageEstimate = patient.ageEstimate;
    this.gender = patient.gender;
    this.city = patient.city;
    this.district = patient.district;
    this.state = patient.state;
    this.status = patient.status;
    this.notes = patient.notes;
    this.contractedFrom = patient.contractedFrom;
    this.travel = [];
    this.relationship = [];
    this.nationality = [];
    this.sources = [];
    this.place_attributes = [];
};




Patient.getAll = result => {

    var str = "SELECT P.*, PPA.place as place_attribute_place, PPA.is_foreign as place_attribute_is_foreign, " +
        " PS.source " +
          " FROM patient P "  +
        "LEFT JOIN patient_place_attribute PPA ON PPA.patient_id = P.patientId "   +
        "LEFT JOIN patient_source PS ON PS.patient_id = P.patientId " //  +
        //  "LEFT JOIN patient_rel PR ON PR.patient_a = P.patientId " +
     //   "LEFT JOIN patient_travel PT ON PT.patient_id = P.patientId"
        str += " ORDER BY state ASC";

    sql.query(str, (err, rows) => {
        var rawPatientData = [], index = {};
        if (err) throw err;

        rows.forEach(function (row) {
            if ( !(row.patientId in index) ) {
                index[row.patientId] = {
                    patientId : row.patientId,
                    reportedOn : row.reportedOn,
                    onsetEstimate : row.onsetEstimate,
                    ageEstimate : row.ageEstimate,
                    gender : row.gender,
                    city : row.city,
                    district : row.district,
                    state : row.state,
                    status : row.status,
                    notes : row.notes,
                    contractedFrom : row.contractedFrom,
                    travel : [],
                    relationship : [],
                    nationality : [],
                    sources : [],
                    place_attributes : []
                };

                if (row.place_attribute_place) {
                    index[row.patientId].place_attributes.push({
                        is_foreign: row.place_attribute_is_foreign,
                        place:  row.place_attribute_place,
                    });
                }

                if (row.source) {
                    index[row.patientId].sources.push(row.source);
                }


                rawPatientData.push(index[row.patientId]);

            } else {
                if (row.place_attribute_place) {
                    index[row.patientId].place_attributes.push({
                        is_foreign: row.place_attribute_is_foreign,
                        place:  row.place_attribute_place,
                    });
                }

                if (row.source) {
                    index[row.patientId].sources.push(row.source);
                }

            }

        });



        let data = {
            "data" : {
                "rawPatientData": rawPatientData
            }
        };
        result(null, data);
    });
};




Patient.getAllByDate = (reportDate, result) => {


    var str = "SELECT P.*, PPA.place as place_attribute_place, PPA.is_foreign as place_attribute_is_foreign, " +
        " PS.source " +
        " FROM patient P "  +
        " LEFT JOIN patient_place_attribute PPA ON PPA.patient_id = P.patientId "   +
        " LEFT JOIN patient_source PS ON PS.patient_id = P.patientId " //  +

    str += " WHERE P.reportedOn <= ? ";
    str += " ORDER BY state ASC";
    sql.query(str, [reportDate], (err, rows) => {
        var rawPatientData = [], index = {};
        if (err) throw err;

        rows.forEach(function (row) {
            if ( !(row.patientId in index) ) {
                index[row.patientId] = {
                    patientId : row.patientId,
                    reportedOn : row.reportedOn,
                    onsetEstimate : row.onsetEstimate,
                    ageEstimate : row.ageEstimate,
                    gender : row.gender,
                    city : row.city,
                    district : row.district,
                    state : row.state,
                    status : row.status,
                    notes : row.notes,
                    contractedFrom : row.contractedFrom,
                    travel : [],
                    relationship : [],
                    nationality : [],
                    sources : [],
                    place_attributes : []
                };

                if (row.place_attribute_place) {
                    index[row.patientId].place_attributes.push({
                        is_foreign: row.place_attribute_is_foreign,
                        place:  row.place_attribute_place,
                    });
                }

                if (row.source) {
                    index[row.patientId].sources.push(row.source);
                }


                rawPatientData.push(index[row.patientId]);

            } else {
                if (row.place_attribute_place) {
                    index[row.patientId].place_attributes.push({
                        is_foreign: row.place_attribute_is_foreign,
                        place:  row.place_attribute_place,
                    });
                }

                if (row.source) {
                    index[row.patientId].sources.push(row.source);
                }

            }

        });

        let data = {
            "data" : {
                "rawPatientData": rawPatientData
            }
        };


        result(null, data);
    });
};

module.exports = Patient;