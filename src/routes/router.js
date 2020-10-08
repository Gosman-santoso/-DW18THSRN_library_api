const express = require("express");

const router = express.Router();

const { getUsers, deleteUser } = require("../controller/userData.js");

const {
    getCategory,
    detailCategory,
    addCategory,
    deleteCategory,
    editCategory
} = require("./../controller/categoryData.js");

router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);

router.get("/categories", getCategory);
router.get("/category/:id", detailCategory);
router.post("/categories", addCategory);
router.patch("/category/:id", editCategory);
router.delete("/category/:id", deleteCategory);

module.exports = router;