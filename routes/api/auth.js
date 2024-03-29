const express = require('express');
const router = express.Router();
const auth = require('../../middlware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

//@route  => GET api/auth
//@desc   => Get user
//@access => public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select(
            '-password',
        );
        res.json(user);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' })
    }
});

//@route  => POST api/auth
//@desc   => Authenticated and get token
//@access => public
router.post(
    '/',
    [
        check('email', 'Please use valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }
            //return jsonwebtoken
            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                config.get('jwtToken'),
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ data: { token } });
                },
            );
        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: { msg: 'Server error' } });
        }
    },
);

module.exports = router;
