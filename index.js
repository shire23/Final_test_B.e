const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const siswaRoutes = require("./routes/siswa");

app.use("/siswa", siswaRoutes);

app.listen(port, () => {
  console.log(`Examle app in port ${port}`);
});
