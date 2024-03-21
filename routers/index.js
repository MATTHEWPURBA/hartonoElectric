const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

//get register
router.get("/register", userController.registerForm);

//post register
router.post("/register", userController.postRegister);

//get login
router.get("/login", userController.loginForm);


router.post("/login", userController.postLogin);

//post login
router.post("/login", userController);


router.get("/", Controller.home);


router.get("/admin", AdminController.adminPage);
// router.use("/incubators", require("./incubators"));
// router.use("/startUp", require("./startUp"));
router.get('/admin', AdminController.adminPage)
module.exports = router;
