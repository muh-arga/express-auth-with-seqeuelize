const { models } = require("../sequelize");
const bcrypt = require('bcrypt')

module.exports = {
  register: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const user = await models.user.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      if (user) {
        delete user.dataValues.password   //delete password field when returned
        res.status(200).send({
          'message': 'Success created user',
          'data': user
        });
      }

    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};
