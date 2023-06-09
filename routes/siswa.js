const express = require("express");
const router = express.Router();

const userController = require("../controllers/siswa");

router.get("/", userController.getAllUser);
router.get("/:id", userController.getUserById);
router.post("/", userController.postUser);
router.put("/:id", userController.updateUser);

// require untuk mengimport data
// router get dan post digunakan untuk ngepost data ke postman
module.exports = router;
