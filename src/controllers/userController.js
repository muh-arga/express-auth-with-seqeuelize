const { models } = require("../sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const env = require("../env");

module.exports = {
  register: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await models.user.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      if (user) {
        delete user.dataValues.password; //delete password field when returned
        res.status(201).send({
          message: "Success created user",
          data: user,
        });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  login: async (req, res) => {
    const user = await models.user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      try {
        if (await bcrypt.compare(req.body.password, user.password)) {
          const payload = { email: user.email };
          const accessToken = jwt.sign(payload, env.access_token_secret);
          res.status(200).json({ accessToken: accessToken });
        } else {
          res.status(401).json({ message: "Invalid email or password!" });
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    } else {
      res.status(401).json({ message: "Invalid email or password!" });
    }
  },

  getAuthUser: async (req, res) => {
    const user = await models.user.findOne({
      where: { email: req.user.email },
    });

    if (!user) {
      res.status(404).send({ message: "User not found" });
    } else {
      delete user.dataValues.password
      res.status(200).send({ data: user });
    }
  },

  getById: async (req, res) => {
    const user = await models.user.findOne({
      where: { user_id: req.params.id },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      delete user.dataValues.password;
      res.status(200).send({
        data: user,
      });
    }
  },
};
