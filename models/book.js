"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Book.belongsTo(models.Category, {
                as: "category_id",
                foreignKey: {
                    name: "categoryId"
                }
            });
            Book.belongsTo(models.User, {
                as: "user_id",
                foreignKey: {
                    name: "userId"
                }
            });
            Book.hasMany(models.Library, {
                as: "library"
            });
        }
    }
    Book.init({
        title: DataTypes.STRING,
        publication: DataTypes.STRING,
        categoryId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        pages: DataTypes.STRING,
        ISBN: DataTypes.STRING,
        aboutBook: DataTypes.TEXT,
        file: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: "Book"
    });
    return Book;
};