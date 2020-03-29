'use strict';

const express = require('express');
const bodyParser = require("body-parser");

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/', (req, res) => {
    res.json({ message: "Welcome to covid tn backend." });
});

require("./app/routes/patients.routes.js")(app);
require("./app/routes/lastupdate.routes.js")(app);



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);