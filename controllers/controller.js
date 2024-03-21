const { Cart, Product, User, Category } = require("../models");

class Controller {
  static async home(req, res) {
    try {
      let data = await Product.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: Category,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      });
      res.render("home", { data, title: "Home" });
    } catch (error) {
      res.send(error);
    }
  }
}
module.exports = Controller;
