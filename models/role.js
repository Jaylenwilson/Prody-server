const { DataTypes } = require("sequelize")
const db = require('../db');
const Role = db.define("role", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },

    rolename: {
        type: DataTypes.STRING,
        allowNull: false
    },


})

module.exports = Role