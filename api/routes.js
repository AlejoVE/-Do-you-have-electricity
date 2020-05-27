const controllers = require("./controllers.js");
const express = require("express");

const router = express.Router();

router.get("/", controllers.hello);

router.get("/reports", controllers.getReports);

module.exports = router;
