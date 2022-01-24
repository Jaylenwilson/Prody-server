const router = require('express').Router();
const { models } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const { Op } = require("sequelize");

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

module.exports = router;