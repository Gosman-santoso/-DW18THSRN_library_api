const { User, Category, Book } = require("./../../models");

exports.getBooks = async(req, res) => {
    try {
        const books = await Book.findAll({
            include: [{
                    model: Category,
                    as: "category_id",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                },
                {
                    model: User,
                    as: "user_id",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }
            ],
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt",
                    "categoryId",
                    "userId",
                    "CategoryId",
                    "UserId"
                ]
            }
        });

        res.send({
            message: "Response Succses",
            data: {
                books
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.getDetailBook = async(req, res) => {
    try {
        const { id } = req.params;
        const detail = await Book.findOne({
            where: {
                id
            },
            include: [{
                    model: Category,
                    as: "category_id",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                },
                {
                    model: User,
                    as: "user_id",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }
            ],
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt",
                    "categoryId",
                    "userId",
                    "CategoryId",
                    "UserId"
                ]
            }
        });

        res.send({
            message: `Book witsh id ${id} found`,
            data: {
                Book: detail
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.addBook = async(req, res) => {
    try {
        const createBook = await Book.create(req.body);
        res.send({
            message: "Data succsesfully created",
            data: {
                Book: createBook
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.editBook = async(req, res) => {
    try {
        const { id } = req.params;
        const edit = await Book.update(req.body, {
            where: {
                id
            }
        });

        res.send({
            message: "Data has been updated",
            data: {
                Book: req.body
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.deleteBook = async(req, res) => {
    try {
        const { id } = req.params;
        const dataDeleted = await Book.findOne({
            where: {
                id
            },
            attributes: {
                exclude: [
                    "title",
                    "publication",
                    "categoryId",
                    "userId",
                    "pages",
                    "ISBN",
                    "aboutBook",
                    "file",
                    "status",
                    "createdAt",
                    "updatedAt"
                ]
            }
        });
        await Book.destroy({
            where: {
                id
            }
        });

        res.send({
            message: "Data has been deleted",
            data: {
                Book: dataDeleted
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server ERROR"
        });
    }
};