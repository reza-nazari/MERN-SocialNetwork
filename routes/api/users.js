const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

const User = require('../../models/User');

//@route  => POST api/users
//@desc   => Register user
//@access => public
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please use valid emial').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters',
        ).isLength({min: 6}),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {name, email, password} = req.body;

        try {
            //if user exist
            let user = await User.findOne({email});
            if (user) {
                return res
                    .status(400)
                    .json({errors: {msg: 'User is already exist'}});
            }

            //Get gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm',
            });

            user = new User({
                name,
                email,
                password,
                avatar,
            });

            //encrypt password
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            //return jsonwebtoken
            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                config.get('jwtToken'),
                {expiresIn: 36000},
                (err, token) => {
                    if (err) throw err;
                    res.json({token});
                },
            );
        } catch (error) {
            console.log(error);
            res.status(500).json({errors: {msg: 'Server error'}});
        }
    },
);

module.exports = router;
