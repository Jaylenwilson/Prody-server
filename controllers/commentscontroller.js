const router = require('express').Router();
const { models } = require('../models');
let validateJWT = require('../middleware/validate-session');

//#4 POST CREATE COMMENT
router.post('/comment', validateJWT, async (req, res) => {
    const { content, postId } = req.body.comments

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
        res.status(403).json({
            error: `User does not have access: ${err}`
        })
    };
});

module.exports = router