const db = require('../db');

const UserModel = require('./user');
const PostModel = require('./post');
// const FollowModel = require('./follow');
const CommentsModel = require('./comments');

UserModel.hasMany(PostModel);
UserModel.hasMany(CommentsModel);

PostModel.belongsTo(UserModel);
PostModel.hasMany(CommentsModel);

CommentsModel.belongsTo(PostModel)



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
