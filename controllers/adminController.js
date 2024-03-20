const { Cart, Product, User, Category } = require("../models");

class AdminController {
    static async adminPage(req, res) {
        try {
            let data = await Product.findAll({
                include: {
                    model: Category
                },
                order: [['name']]
            })
            // res.send(data)
            res.render('admin', { data, title: 'Home' })
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = AdminController