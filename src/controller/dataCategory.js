const { Category, Book } = require("../../models");

exports.getCategory = async(req, res) => {
    try {
        const categories = await Category.findAll({
            include: {
                model: Book,
                as: "book",
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });

        res.send({
            message: "Category Succsesfully Loaded",
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
            include: {
                model: Book,
                as: "book",
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
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
        const create = await Category.create(req.body, {
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });
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
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
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
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });
        await Category.destroy({
            where: {
                id
            }
        });
        res.send({
            message: `Data with id ${id} has been deleted`,
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