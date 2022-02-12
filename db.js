const { Sequelize } = require('sequelize');


// const db = new Sequelize(`postgres://postgres:562613@localhost:5432/prody`, {
//     dialect: 'postgres',
// });

// const sequelize = new Sequelize(process.env.DATABASE_NAME,
//     process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
//     host: process.env.DATABASE_HOST,
//     dialect: 'postgres',
// });

const sequelize = new Sequelize(`postgres://postgres:${process.env.DATABASE_PASSWORD}@localhost:5432/${process.env.DATABASE_NAME}`, {
    dialect: 'postgres',

    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

console.log(sequelize);
module.exports = sequelize;


