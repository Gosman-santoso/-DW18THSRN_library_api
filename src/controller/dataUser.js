const { User, Book, Library } = require("./../../models");

exports.getUsers = async(req, res) => {
    try {
        const users = await User.findAll({
            include: [{
                    model: Book,
                    as: "book"
                },
                {
                    model: Library,
                    as: "library"
                }
            ],
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"]
            }
        });

        res.send({
            message: "User Succsesfully Loaded",
            data: { users }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.getDetailUser = async(req, res) => {
    try {
        const { id } = req.params;
        const detail = await User.findOne({
            where: {
                id
            },
            include: [{
                model: Book,
                as: "book"
            },
            {
                model: Library,
                as: "library",
                include: {
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
                }
            }
        ],
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"]
            }
        });

        res.send({
            message: `User with id ${id} found`,
            data: {
                User: detail
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.editUser = async(req, res) => {
    try {
        const { id } = req.params;
        const edit = await User.update(req.body, {
            where: {
                id
            }
        });

        res.send({
            message: "Data has been updated",
            data: {
                User: req.body
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.deleteUser = async(req, res) => {
    try {
        const { id } = req.params;
        const dataDelete = await User.findOne({
            where: {
                id
            },
            attributes: {
                exclude: [
                    "fullName",
                    "email",
                    "password",
                    "phone",
                    "address",
                    "avatar",
                    "createdAt",
                    "updatedAt"
                ]
            }
        });
        await User.destroy({
            where: {
                id
            }
        });
        res.send({
            message: "Data has been deleted",
            data: {
                User: dataDelete
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};


