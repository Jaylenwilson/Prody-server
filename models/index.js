const db = require('../db');

const UserModel = require('./user');
const PostModel = require('./post');
const FollowModel = require('./follow');
const CommentsModel = require('./comments');




module.exports = {
    dbConnection: db,
    models: {
        UserModel,
        PostModel,
        CommentsModel,
        FollowModel
    }
};