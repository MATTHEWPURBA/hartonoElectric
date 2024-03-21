const { Cart, Product, User, Category, UserProfile } = require("../models");
const { Op } = require('sequelize');

class Controller {
  static async home(req, res) {
    try {
      let { name, CategoryId } = req.query
      let { userId } = req.session
      let user = await User.findAll({where:{id:userId}})
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
        res.render("home", { data, title: "Home", user });
      }else{
        let data = await Product.readProduct(Category)
        res.render("home", { data, title: "Home", user });
      }
    } catch (error) {
      res.send(error);
    }
  }
  static async readUser(req, res){
    try {
      let { userId } = req.session
      let user = await User.findAll({ 
        where: { id: userId },
        include:{
          model: UserProfile
        }
      })
      console.log(user);
      res.render('user', {title:'User Details', user })
      // res.send(user)
    } catch (error) {
      res.send(error)
    }
  }
  static async getEditUserProfile(req, res) {
    try {
      let { userId } = req.session
      let user = await User.findAll({ where: { id: userId } })
      let { id } = req.params
      let profile = await UserProfile.findByPk(id)

      let { error, path } = req.query;
      res.render("edit-profile", { profile, error, path, user });
      // res.send(data)
    } catch (error) {
      res.send(error);
    }
  }
  static async postEditUserProfile(req, res) {
    try {
      let { id } = req.params
      let { fullName, dateOfBirth, profilePicture} = req.body;
      await UserProfile.update({ fullName, dateOfBirth, profilePicture }, {
        where: {
          id: id
        }
      });
      res.redirect(`/user/${id}`);
    } catch (error) {
      res.send(error)
    }
  }

  
}
module.exports = Controller;
