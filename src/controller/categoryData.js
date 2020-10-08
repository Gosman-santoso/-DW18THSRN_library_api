const { Category } = require("./../../models");

exports.getCategory = async(req, res) => {
    try {
        const categories = await Category.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });

        res.send({
            message: "Response Succses",
            data: { categories }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.detailCategory = async(req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });
        res.send({
            message: "Detail Category",
            data: {
                Category: category
            }
        });
    } catch (err) {
        console.log(err),
            res.status(500).send({
                message: "Server Error"
            });
    }
};

exports.addCategory = async(req, res) => {
    try {
        const create = await Category.create(req.body);
        res.send({
            message: "Data succsesfully created",
            data: {
                Category: create
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.editCategory = async(req, res) => {
    try {
        const { id } = req.params;

        const edit = await Category.update(req.body, {
            where: {
                id
            }
        });
        res.send({
            message: "Data has been updated",
            data: {
                Category: req.body
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.deleteCategory = async(req, res) => {
    try {
        const { id } = req.params;
        const dataDeleted = await Category.findOne({
            where: {
                id
            }
        });
        await Category.destroy({
            where: {
                id
            }
        });
        res.send({
            data: {
                Category: dataDeleted
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};