const express = require("express");
const router = express.Router();

const siswaController = require("../controllers/siswa");
const { upload } = require("../middleware/uploadfile");

router.get("/:id", siswaController.getSiswaById);
router.post("/submit", siswaController.submitSiswa);
router.put("/edit:id", siswaController.editSiswa);

router.post("/", upload.single("file", siswaController));

module.exports = router;
