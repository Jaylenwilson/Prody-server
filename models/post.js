const { DataTypes } = require("sequelize");
const db = require("../db");

const Posts = db.define("posts", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },

    category: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Posts