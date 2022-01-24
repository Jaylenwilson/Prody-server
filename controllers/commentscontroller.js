const router = require('express').Router();
const { models } = require('../models');
let validateJWT = require('../middleware/validate-session');

router.post('/comment', validateJWT, async (req, res) => {
    const { content, postId } = req.body.comment

    try {
        await models.CommentsModel.create({
            content: content,
            postId: postId,
            userId: req.user.id
        })
            .then(
                comment => {
                    res.status(201).json({
                        comment: comment,
                        message: "comment posted"
                    });
                }
            )
    } catch (err) {
        res.status(500).json({
            error: `Failed to create comment: ${err}`
        });
    };
});