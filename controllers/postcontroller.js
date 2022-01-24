const router = require('express').Router();
const { models } = require('../models');
let validateJWT = require('../middleware/validate-session');

router.post('/post', validateJWT, async (req, res) => {
    const { category, description, image } = req.body.posts
    try {
        await models.PostModel.create({
            category: category,
            description: description,
            image: image,
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

module.exports = router;