"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Book, {
                as: "book"
            });
            User.hasMany(models.Library, {
                as: "library"
            });
        }
    }
    User.init({
        fullName: DataTypes.STRING,
        email: DataTypes.STRING,
        gender: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        avatar: DataTypes.STRING,
        bookmark: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: "User"
    });
    return User;
};