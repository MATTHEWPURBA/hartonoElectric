const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

router.get("/", Controller.home);
// router.use("/incubators", require("./incubators"));
// router.use("/startUp", require("./startUp"));

module.exports = router;
