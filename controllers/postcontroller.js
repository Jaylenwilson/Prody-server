const router = require('express').Router();
const { models } = require('../models');
let validateJWT = require('../middleware/validate-session');

// POST #3 CREATE POST
router.post('/post', validateJWT, async (req, res) => {
    const { category, description, image } = req.body.posts
    try {
        await models.PostModel.create({
            category: category,
            description: description,
            image: image,
            // foreign key from usermodel
            userId: req.user.id
        })
            .then(
                post => {
                    res.status(201).json({
                        post: post,
                        message: 'post created'
                    })
                }
            )
    } catch (err) {
        res.status(500).json({
            message: `Failed to create post ${err}`
        });
    };
});


// router.get('/postinfo', async (req, res) => {
//     try {
//         await models.PostModel.findAll({
//             include: [
//                 {
//                     model: models.CommentsModel
//                 }

//             ]
//         })
//             .then(
//                 posts => {
//                     res.status(200).json({
//                         posts: posts
//                     })
//                 }
//             )
//     } catch (err) {
//         res.status(500).json({
//             error: `Failed to retrieve posts: ${err}`
//         })
//     }
// })


//DELETE #1 DELETE A USERS SPECIFIC POST
router.delete('/delete/:userId/:id', validateJWT, async (req, res) => {
    const postId = req.params.id
    const userId = req.params.userId

    try {
        const result = await models.PostModel.destroy({
            where: {
                id: postId,
                userId: userId
            },
        });
        res.status(200).json({
            message: `post has been deleted: ${result} `,

        })
    } catch (err) {
        res.status(500).json({
            message: `could not delete post ${err}`
        })
    }
})



// UPDATE #1 UPDATE A SPECIFIC POST
router.put('/edit/:userId/:id', validateJWT, async (req, res) => {
    const { category, description, image } = req.body.posts;
    const postId = req.params.id;
    const userId = req.params.userId;
    try {

        const updatedPosts = await models.PostModel.update({
            category: category,
            description: description,
            image: image
        },
            {
                where: {
                    id: postId,
                    userId: userId
                }
            }
        )
        res.status(200).json({
            message: "post updated",
            updatedPosts: updatedPosts
        })
    } catch (err) {
        res.status(500).json({ error: err });
    }
})



module.exports = router;