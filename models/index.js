const db = require('../db');

const UserModel = require('./user');
const PostModel = require('./post');
const CommentsModel = require('./comments');
// const UserRoleModel = require('./userrole');
const RoleModel = require('./role')
// const FollowModel = require('./follow');


// UserRoleModel.belongsToMany(UserModel);
// UserRoleModel.belongsToMany(RoleModel)

//This joins the User table and role table into one 
/////////////////////////////////////////////////////////
UserModel.belongsToMany(RoleModel, {
    through: "user_roles",
    as: "users",
    foreignKey: "userId"
});

RoleModel.belongsToMany(UserModel, {
    through: "user_roles",
    as: "roles",
    foreignKey: "roleId"
});
////////////////////////////////////////////////////
UserModel.hasMany(PostModel);
UserModel.hasMany(CommentsModel);

PostModel.belongsTo(UserModel);
PostModel.hasMany(CommentsModel, {
    onDelete: 'CASCADE',
});

CommentsModel.belongsTo(PostModel);
CommentsModel.belongsTo(UserModel);


module.exports = {
    dbConnection: db,
    models: {
        UserModel,
        PostModel,
        CommentsModel,
        // FollowModel
    }
};

// module.exports = { UserModel, PostModel, CommentsModel }

console.log(`dbconnection: ${db}`)
