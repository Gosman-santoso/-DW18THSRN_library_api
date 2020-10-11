"use strict";
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("Books", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            publication: {
                type: Sequelize.STRING
            },
            categoryId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "Categories",
                    as: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "NO ACTION"
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    as: "id"
                }
            },
            pages: {
                type: Sequelize.STRING
            },
            ISBN: {
                type: Sequelize.STRING
            },
            aboutBook: {
                type: Sequelize.TEXT
            },
            file: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable("Books");
    }
};