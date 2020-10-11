const { User, Category, Book } = require("./../../models");

exports.getUsers = async(req, res) => {
    try {
        const users = await User.findAll();

        res.send({
            message: "Response Succses",
            data: { users }
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
                User: dataDeleted
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};