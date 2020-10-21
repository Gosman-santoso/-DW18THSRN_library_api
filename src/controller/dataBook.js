const { User, Category, Book } = require("./../../models");

const joi = require("@hapi/joi");

exports.getBooks = async(req, res) => {
    try {
        // console.log("Ini adalah ID user yang login ", req.user);

        // const status = req.body.status;

        const books = await Book.findAll({
            where: {
                status : "Approved"
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
            message: "Data Succsesfully Loaded",
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

exports.getAdmBooks = async(req, res) => {
    try {
        // console.log("Ini adalah ID user yang login ", req.user);

        const status = req.body.status;

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
            message: "Data Succsesfully Loaded",
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
            message: `Book with id ${id} found`,
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
        // const createBook = await Book.create(req.body);
        // res.send({
        //     message: "Data succsesfully created",
        //     data: {
        //         Book: createBook
        //     }
        // });

        const {
            title,
            publication,
            categoryId,
            userId,
            pages,
            ISBN,
            aboutBook,
            file,
            thumbnail,
            status
        } = req.body;

        const schema = joi.object({
            title: joi
                .string()
                .min(3)
                .required(),
            publication: joi
                .string()
                .min(5)
                .required(),
            categoryId: joi
                .number()
                .min(1)
                .required(),
            userId: joi.string(),
            pages: joi
                .number()
                .min(1)
                .required(),
            ISBN: joi
                .number()
                .min(8)
                .required(),
            aboutBook: joi
                .string()
                .min(10)
                .required(),
            file: joi
                .string()
                .min(5)
                .required(),
            thumbnail: joi
                .string()
                .min(5)
                .required()
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send({
                error: {
                    message: error.details[0].message
                }
            });
        }

        const createBook = await Book.create({
            title,
            publication,
            categoryId,
            userId,
            pages,
            ISBN,
            aboutBook,
            file,
            thumbnail,
            status
        });
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
                    "thumbnail",
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
            message: `Data with id ${id} has been deleted`,
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