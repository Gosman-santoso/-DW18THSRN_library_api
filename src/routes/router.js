const express = require("express");

const router = express.Router();

const { getUsers, deleteUser } = require("../controller/userData.js");

router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);

module.exports = router;