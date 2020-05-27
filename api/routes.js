const controllers = require("./controllers.js");
const express = require("express");

const router = express.Router();

router.get("/", controllers.hello);

router.get("/reports", controllers.getAllReports);
router.get("/reports/:id", controllers.getReport);
router.post("/reports", controllers.addReport);

module.exports = router;
