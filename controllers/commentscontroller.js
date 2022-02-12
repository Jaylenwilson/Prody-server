const router = require('express').Router();
const { models } = require('../models');
let validateJWT = require('../middleware/validate-session');

//#4 POST CREATE COMMENT
router.post('/comment', validateJWT, async (req, res) => {
    const { content, postId } = req.body.comments
    console.log(req.body)
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

// DELETE #2 DELETE A SPECIFIC COMMENT
router.delete('/delete/:userId/:postId/:id', validateJWT, async (req, res) => {
    const commentId = req.params.id
    const userId = req.params.userId
    const postId = req.params.postId

    try {
        const result = await models.CommentsModel.destroy({
            where: {
                id: commentId,
                userId: userId,
                postId: postId
            },
        });
        res.status(200).json({
            message: `comment has been deleted: ${result} `,

        })
    } catch (err) {
        res.status(500).json({
            message: `could not delete post ${err}`
        })
    }
})



// UPDATE #2 UPDATE A SPECIFIC COMMENT
router.put('/edit/:userId/:postId/:id', validateJWT, async (req, res) => {
    const { content } = req.body.comments;
    const commentId = req.params.id;
    const userId = req.params.userId;
    const postId = req.params.postId
    try {

        const updatedComment = await models.CommentsModel.update({
            content: content
        },
            {
                where: {
                    id: commentId,
                    postId: postId,
                    userId: userId
                }
            }
        )
        res.status(200).json({
            message: "post updated",
            updatedComment: updatedComment
        });
    } catch (err) {
        res.status(500).json({ error: err });
    };
});

//VIEW A USERS SPECIFIC POST
router.get('/mypost', validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const query = {
            where: {
                userId: id,
            }
        };
        const postList = await models.PostModel.findAll(query);
        res.status(200).json(postList);
    } catch (error) {
        res.status(500).json({
            message: `Game could not be found: ${error}`
        })
    }
})

module.exports = router