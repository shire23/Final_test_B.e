const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.json());

const siswa = require("./routes/siswa");

app.use("../Final_Test/routes/siswa.js", siswaRoutes);

app.listen(port, () => {
  console.log(`Examle app in port ${port}`);
});
