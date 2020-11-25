const { User, Library, Book } = require("./../../models");

exports.getLibrary = async(req, res) => {
    try {
        const { id } = req.params;
        const library = await Library.findAll({
            include: [{
                    model: Book,
                    as: "book",
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
                },
                {
                    model: User,
                    as: "user",
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"]
                    }
                }
            ],
            attributes: {
                exclude: ["BookId", "UserId", "createdAt", "updatedAt"]
            }
        });

        res.send({
            message: "Data Succsesfully Loaded",
            data: {
                library
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.detailBookmark = async(req, res) => {
    try {
        const { bookId, userId } = req.params;
        const detail = await Library.findOne({
            where: {
                bookId,
                userId
            },
            include: [{
                    model: Book,
                    as: "book",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                },
                {
                    model: User,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }
            ],
            attributes: {
                exclude: ["BookId", "UserId", "createdAt", "updatedAt"]
            }
        });

        res.send({
            message: `Bookmark with id ${bookId}`,
            data: {
                library: detail
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.addLibrary = async(req, res) => {
    try {
        const { bookId, userId } = req.body;
        const addBookmarks = await Library.create({
            bookId,
            userId
        });

        res.send({
            message: "Data Succsesfully Created",
            data: {
                library: {
                    bookId,
                    userId
                }
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.removeBookmark = async(req, res) => {
    try {
        const { bookId, userId } = req.params;
        await Library.destroy({
            where: {
                bookId,
                userId
            }
        });
        res.send({
            message: `Bookmark removed`,
            data: {
                library: `Library with user id ${userId} & literature id ${bookId} removed`
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server ERROR"
        });
    }
};