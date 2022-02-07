const { DataTypes } = require("sequelize");
const db = require("../db");

const Posts = db.define("posts", {
    //primary key
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
    },

    link: {
        type: DataTypes.STRING,
        allowNull: true
    }
    // foreign key to reference comments tabel
});

module.exports = Posts