const { User, Category, Book } = require("./../../models");
const { Op } = require("sequelize");

const joi = require("@hapi/joi");

exports.searchBook = async(req, res) => {
    try {
        const { title } = req.params;
        const search = await Book.findAll({
            where: {
                status: "Approved",
                title: {
                    [Op.like]: title + "%"
                }
            }
        });

        res.send({
            message: "Data Succsesfully Loaded",
            data: {
                search
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server error"
        });
    }
};

exports.searchBookDate = async(req, res) => {
    let title = req.query.title;
    let public_year = req.query.public_year;
    try {
        if (public_year) {
            const book = await Book.findAll({
                include: [{
                    model: User,
                    as: "user_id",
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"]
                    }
                }],
                attributes: {
                    exclude: ["UserId", "createdAt", "updatedAt"]
                },
                where: {
                    status: "Approved",
                    title: {
                        [Op.like]: title + "%"
                    },
                    publication_date: {
                        [Op.gte]: public_year
                    }
                },
                order: [
                    ["publication_date", "DESC"]
                ]
            });
            res.send({
                message: `title like ${title} in ${public_year} was found`,
                book
            });
        } else {
            const book = await Book.findAll({
                include: [{
                    model: User,
                    as: "user_id",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }],
                attributes: {
                    exclude: ["UserId", "createdAt", "updatedAt"]
                },
                where: {
                    status: "Approved",
                    title: {
                        [Op.like]: title + "%"
                    }
                }
            });
            res.send({
                message: `${title} title found`,
                book
            });
        }
    } catch (err) {
        showError(err);
    }
};

exports.getBooks = async(req, res) => {
    try {
        // console.log("Ini adalah ID user yang login ", req.user);

        // const status = req.body.status;

        const books = await Book.findAll({
            where: {
                status: "Approved"
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
        const book = await Book.findOne({
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
                book
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
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send({
                error: {
                    message: error.details[0].message
                }
            });
        }

        const checkISBN = await Literature.findOne({
            where: {
                ISBN
            }
        });

        if (checkISBN) {
            return res.status(400).send({
                message: "ISBN already exists"
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
                createBook
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
        const [edit] = await Book.update(req.body, {
            where: {
                id
            }
        });

        if (!edit)
            return res.status(404).send({
                message: "Book not found!"
            });

        const data = await Book.findOne({
            where: {
                id
            },
            include: {
                model: User,
                as: "user_id",
                attributes: { exclude: ["password", "createdAt", "updatedAt"] }
            },

            attributes: {
                exclude: ["createdAt", "updatedAt", "categoryId", "userId"]
            }
        });

        res.send({
            status: "success",
            message: `Book updated successfully`,
            data
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "error",
            message: "Internal Server Error",
            code: 500
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