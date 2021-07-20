const express = require("express");
const bodyParser = require("body-parser");
require("./db");
const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 8888;

app.use("/api/v1/user", require("./v-1.0.0/routes/user.route"));
app.use("/api/v1/hospital", require("./v-1.0.0/routes/hospital.route"));
app.use("/api/v1/patient", require("./v-1.0.0/routes/patient.route"));
app.listen(port, () => {
  console.log("Server started at ", port);
});
