const jwt = require('jsonwebtoken');
const config = require('config');
const { json } = require('express');

module.exports = function (req, res, next) {
    //get token from header
    const token = req.header('x-auth-token');

    //check if not token
    if (!token) {
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

    //verify token
    try {
        const decode = jwt.decode(token, config.get('jwtToken'));

        req.user = decode.user;
        next();
    } catch (error) {
        res.status(500).json({msg: 'Token is not valid'})
    }
};
