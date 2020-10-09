const express = require('express');
const router = express.Router();

const {check, validationResult} = require('express-validator');
const auth = require('../../middlware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const {route} = require('./profile');

//@route  => Post api/post
//@desc   => Create a post
//@access => private
router.post(
    '/',
    [auth, [check('text', 'Text is required').not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(401).json({errors: errors.array()});
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            console.log(user);

            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
            });

            const post = await newPost.save();

            res.json(post);
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
    },
);

//@route  => Get api/post
//@desc   => Get all posts
//@access => private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({date: -1});

        res.send(posts);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

//@route  => Get api/post/:id
//@desc   => Get post by id
//@access => private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({msg: 'Post not found'});
        }

        res.send(post);
    } catch (error) {
        if (error.kind == 'objectId') {
            return res.status(404).json({msg: 'Post not found'});
        }
        console.log(error);
        res.status(500).send('Server error');
    }
});

//@route  => Delete api/post/:id
//@desc   => Delete post
//@access => private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({msg: 'Post not found'});
        }

        //check user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not Authorize'});
        }

        await post.remove();

        res.json({msg: 'Post deleted'});
    } catch (error) {
        if (error.kind == 'objectId') {
            return res.status(404).json({msg: 'Post not found'});
        }
        console.log(error);
        res.status(500).send('Server error');
    }
});

//@route  => Put api/post/likes/:id
//@desc   => like a post
//@access => private
router.put('/likes/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //check if post has been already liked
        if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
                .length > 0
        ) {
            return res.status(400).json({msg: 'Post already liked'});
        }

        post.likes.unshift({user: req.user.id});

        await post.save();

        res.json(post.likes);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

//@route  => Put api/post/unlikes/:id
//@desc   => unlike a post
//@access => private
router.put('/unlikes/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //check if post hasnt been already liked
        if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
                .length === 0
        ) {
            return res
                .status(400)
                .json({msg: 'Post has not been already liked'});
        }

        const removeIndex = post.likes
            .map((like) => like.user.toString())
            .indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
