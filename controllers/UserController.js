const { User } = require("../models");
const bcrypt = require("bcryptjs");
//kalau pake package harus di bikin require

class userController {
  static registerForm(req, res) {
    try {
      res.render("auth-pages/register-form");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async postRegister(req, res) {
    try {
      let { username, email, password, role } = req.body;
      await User.create({ username, email, password, role });
      console.log(req.body);
      console.log("ini dari form register");
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static loginForm(req, res) {
    try {
      res.render("auth-pages/login-form");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static postLogin(req, res) {
    try {
      const { username, password } = req.body;
      User.findOne({ where: { username } });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = userController;
