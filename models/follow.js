// const { DataTypes } = require("sequelize");
// const db = require('../db');

// const Follows = db.define("follows", {
//     id: {
//         type: DataTypes.UUID,
//         primaryKey: true,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//     },

//     follow: {
//         followeduser: DataTypes.STRING,
//         allowNull: false,
//         following: true
//     },

//     unfollow: {
//         userfollowed: DataTypes.STRING,
//         allowNull: false,
//         following: false
//     }
// })