const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authToken = require("../middleware/authToken");

router.post("/auth/register", userController.register);
router.post("/auth/login", userController.login);
router.get("/auth/user/:id", authToken, userController.getById)
router.get("/auth/me", authToken, userController.getAuthUser)

module.exports = router;
