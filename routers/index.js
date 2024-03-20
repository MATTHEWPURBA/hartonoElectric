const express = require("express");
const Controller = require("../controllers/controller");
const AdminController = require("../controllers/adminController");
const router = express.Router();

router.get("/", Controller.home);
// router.use("/incubators", require("./incubators"));
// router.use("/startUp", require("./startUp"));
router.get('/admin', AdminController.adminPage)
module.exports = router;
