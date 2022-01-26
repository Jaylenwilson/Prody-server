const router = require('express').Router();
const { models } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const { Op } = require("sequelize");

// POST #1 CREATE A USER
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body.users;
    try {
        await models.UserModel.create({
            username: username,
            email: email,
            password: bcrypt.hashSync(password, 10),
            role: role
        })
            .then(
                user => {
                    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                    res.status(201).json({
                        user: user,
                        message: 'user created',
                        sessionToken: `Bearer ${token}`
                    });
                }
            )
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: 'Username already in use'
            })
        } else {
            res.status(500).json({
                error: `Failed to register user ${err}`
            });
        };
    };
})


//POST #2 LOGIN
router.post('/login', async (req, res) => {
    const { username, email, password } = req.body.users;
    try {
        await models.UserModel.findOne({
            where: {
                username: username,
                email: email
            }
        })
            .then(
                user => {
                    if (user) {
                        bcrypt.compare(password, user.password, (err, matches) => {
                            if (matches) {
                                let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
                                res.json({
                                    user: user,
                                    message: 'logged in',
                                    sessionToken: `Bearer ${token}`
                                })
                            } else {
                                res.status(500).send({
                                    error: 'failed to login user'
                                })
                            }
                        })
                    } else {
                        res.status(502).send({
                            error: 'bad gateway'
                        })
                    }
                }
            )

    } catch (err) {
        res.status(501).send({
            error: 'server does not support'
        })
    }
})

// GET #1 GET ALL INFO
router.get('/userinfo', async (req, res) => {
    try {
        await models.UserModel.findAll({
            include: [
                {
                    model: models.PostModel,
                    include: [
                        {
                            model: models.CommentsModel
                        }
                    ]
                }
            ]
        })
            .then(
                userinfo => {
                    res.status(200).json({
                        message: "userinfo recieved",
                        userinfo: userinfo
                    })
                }
            )
    } catch (err) {
        res.status(500).json({
            message: `Could not retrive user info: ${errr}`
        })
    }
})

// router.get('/userinfo', async (req, res) => {
//     const {username, email, password, role} = req.body.users
//     try {

//     }
// })

module.exports = router;