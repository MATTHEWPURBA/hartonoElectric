const { Cart, Product, User, Category } = require("../models");

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
      res.render("admin", { data, title: "Admin" });
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
}

module.exports = AdminController;
