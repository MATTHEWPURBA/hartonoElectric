const { Cart, Product, User, Category } = require("../models");
const { Op } = require('sequelize');

class Controller {
  static async home(req, res) {
    try {
      let { name, CategoryId } = req.query
      let option = {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: Category,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          }
        }, where: {},
        order: [['name', 'asc']]
      }
      if ({ name, CategoryId }){
        if (name) option.where.name = { [Op.iLike]: `%${name}%` }
        if (CategoryId) option.where.CategoryId = { [Op.eq]: CategoryId }
        let data = await Product.findAll(option)
        res.render("home", { data, title: "Home" });
      }else{
        let data = await Product.readProduct(Category)
        res.render("home", { data, title: "Home" });
      }
    } catch (error) {
      res.send(error);
    }
  }

  
}
module.exports = Controller;
