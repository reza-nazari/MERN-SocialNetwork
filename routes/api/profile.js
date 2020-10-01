const express = require('express');
const router = express.Router();
const config = require('config');
const request = require('request');

const auth = require('../../middlware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const {check, validationResult} = require('express-validator');
const {json} = require('express');

//@route  => GET api/profile/me
//@desc   => Get current profile
//@access => private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id,
        }).populate('user', 'name avatar', User);

        if (!profile) {
            return res
                .status(401)
                .json({msg: 'There is no profile fot this user'});
        }

        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

//@route  => POST api/profile
//@desc   => create or update user profile
//@access => private
router.post(
    '/',
    [
        auth,
        [
            check('status', 'status is requiered').not().isEmpty(),
            check('skills', 'Skills is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
        }
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin,
        } = req.body;

        //build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills
                .split(',')
                .map((skill) => skill.trim());
        }

        //build social object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (facebook) profileFields.social.facebook = facebook;
        if (twitter) profileFields.social.twitter = twitter;
        if (instagram) profileFields.social.instagram = instagram;
        if (linkedin) profileFields.social.linkedin = linkedin;

        try {
            let profile = await Profile.findOne({user: req.user.id});

            if (profile) {
                //update
                profile = await Profile.findOneAndUpdate(
                    {
                        user: req.user.id,
                    },
                    {
                        $set: profileFields,
                    },
                    {
                        new: true,
                    },
                );

                return res.json(profile);
            }

            //create
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        } catch (error) {
            res.status(500).send('Server error');
        }
    },
);

//@route  => GET api/profile
//@desc   => Get All profiles
//@access => public
router.get('/', async (req, res) => {
    try {
        const profile = await Profile.find().populate(
            'user',
            'name avatar',
            User,
        );

        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

//@route  => GET api/profile/user/:user_id
//@desc   => Get Profile by userId
//@access => public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id,
        }).populate('user', 'name avatar', User);

        if (!profile) {
            return res.status(400).json({msg: 'Profile not found'});
        }

        res.json(profile);
    } catch (error) {
        console.log(error);
        if (error.kind == 'objectId') {
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.status(500).send('Server error');
    }
});

//@route  => Delete api/profile
//@desc   => Delete user & profile
//@access => private
router.delete('/', auth, async (req, res) => {
    try {
        //Remove user posts

        //Remove profile
        await Profile.findOneAndRemove({user: req.user.id});

        //Remove user
        await User.findOneAndRemove({_id: req.user.id});

        res.json({msg: 'user deleted'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

//@route  => Put api/profile/experience
//@desc   => Add experience
//@access => private
router.put(
    '/experience',
    [
        auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('company', 'Company is required').not().isEmpty(),
            check('from', 'From date is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(401).json({errors: errors.array()});
        }

        const {
            title,
            company,
            location,
            from,
            to,
            currnet,
            description,
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            currnet,
            description,
        };

        try {
            const profile = await Profile.findOne({user: req.user.id});

            profile.experience.unshift(newExp);

            await profile.save();

            res.send(profile);
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
    },
);

//@route  => Delete api/profile/experience/:exp_id
//@desc   => Delete experience
//@access => private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});

        const removeIndex = profile.experience
            .map((item) => item.id)
            .indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

//@route  => Put api/profile/education
//@desc   => Add education
//@access => private
router.put(
    '/education',
    [
        auth,
        [
            check('school', 'School is required').not().isEmpty(),
            check('degree', 'Degree is required').not().isEmpty(),
            check('fieldofstudy', 'fieldofstudy is required').not().isEmpty(),
            check('from', 'From date is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(401).json({errors: errors.array()});
        }

        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            currnet,
            description,
        } = req.body;

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            currnet,
            description,
        };

        try {
            const profile = await Profile.findOne({user: req.user.id});
            profile.education.unshift(newEdu);

            await profile.save();

            res.send(profile);
        } catch (error) {
            console.log(error);

            // res.status(500).send('Server error');
            res.status(500).send(error);
        }
    },
);

//@route  => Delete api/profile/education/:edu_id
//@desc   => Delete education
//@access => private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});

        const removeIndex = profile.education
            .map((item) => item.id)
            .indexOf(req.params.exp_id);

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

//@route  => Delete api/profile/education/:edu_id
//@desc   => Delete education
//@access => private
router.get('/github/:user_name', async (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${
                req.params.user_name
            }/repos?per_page=5&sort=created:asc&client_id=${config.get(
                'githybClientId',
            )}&client_secret=${config.get('githubClientSecret')}`,
            method: 'GET',
            headers: {'user-agent': 'node.js'},
        };

        console.log(options.uri);

        request(options, (error, response, body) => {
            if (error) console.log(error);
            console.log(response)
            if (response.statusCode !== 200) {
                return res.status(401).json({msg: 'No github profile found'});
            }

            res.json(JSON.parse(body));
        });
    } catch (error) {}
});

module.exports = router;
