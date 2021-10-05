const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Response = require('../utils/response');

exports.protect = async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        // To separate Bearer nvrkjuvrk(and generated token)
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token) {
        return next(new Response('Not authorized to access this route', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if(!user) {
            return next(new Response("No user found with this id", 404));
        }

        req.user = user;
    } catch(error) {
        return next(new Response("Not authorized to access this token", 401));
    }
}