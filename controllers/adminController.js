const { Cart, Product, User, Category } = require("../models");
const convert = require('../helper/formatCreated');

class AdminController {
  static async adminPage(req, res) {
    try {
      let data = await Product.findAll({
        include: {
          model: Category,
        },
        order: [["name"]],
      });
      // res.send(data)
      res.render("admin", { data, title: "Admin", convert:convert });
    } catch (error) {
      res.send(error);
    }
  }

  static async getFormAdd(req, res) {
    try {
      let data = await Category.findAll();
      let { error, path } = req.query;
      res.render("add-product", { data, error, path });
      // res.send(data)
    } catch (error) {
      res.send(error);
    }
  }
  static async postFormAdd(req, res) {
    try {
      let { name, price, stock, CategoryId, urlPicture, description } = req.body;
      // res.send(req.body)
      await Product.create({ name, price, stock, CategoryId, urlPicture, description });
      res.redirect("/admin");
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        let err = error.errors.map((e) => {
          return e.message;
        });
        let path = error.errors.map((e) => {
          return e.path;
        });
        res.redirect(`/admin/addProduct?error=${err}&path=${path}`);
      } else {
        res.send(error);
      }
    }
  }
  static async getEdit(req, res) {
    try {
      let {id} = req.params
      let category = await Category.findAll();
      let product = await Product.findByPk(id)

      let { error, path } = req.query;
      res.render("edit-product", { category, product, error, path });
      // res.send(data)
    } catch (error) {
      res.send(error);
    }
  }
  static async postEdit(req, res) {
    let { id } = req.params
    try {
      let { name, price, stock, CategoryId, urlPicture, description } = req.body;
      // res.send(req.body)
      await Product.update({ name, price, stock, CategoryId, urlPicture, description }, {
        where:{
          id:id
        }
      });
      res.redirect("/admin");
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        let err = error.errors.map((e) => {
          return e.message;
        });
        let path = error.errors.map((e) => {
          return e.path;
        });
        res.redirect(`/admin/edit/${id}?error=${err}&path=${path}`);
      } else {
        res.send(error);
      }
    }
  }
}

module.exports = AdminController;
