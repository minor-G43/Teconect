const crypto = require('crypto');
const User = require("../models/User");
const Response = require('../utils/response');
const Mail = require('../utils/mail');

exports.register = async (req, res, next) => {
    console.log("request recieved");
    let {
        name,
        username,
        email,
        password,
        github,
        techsatck,
        tags
    } = req.body;

    try {
        tags = tags.toLocaleLowerCase();
        tags = tags.split(",");
        const user = await User.create({
            name,
            username,
            email,
            password,
            github,
            techsatck,
            tags
        });
        sendToken(user, 201, res);
        user.findOne({email : email}).
        console.log("register success");
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    if (!email || !password) {
        return next(new Response("Please enter email and password", 400));
    }

    try {
        const user = await User.findOne({
            email
        }).select("+password");
        if (!user) {
            return next(new Response("Email ID not found", 404));
        }

        const isMatch = await user.matchPasswords(password);

        if (!isMatch) {
            return next(new Response("Invalid Credentials", 401));
        }

        sendToken(user, 200, res);
    } catch (error) {
        res.status(500).json({
            success: true,
            error: error.message
        });
    }
};

exports.forgotpassword = async (req, res, next) => {
    const {
        email
    } = req.body;

    try {
        const user = await User.findOne({
            email
        });

        if (!user) {
            return next(new Response("Email could not be sent", 404));
        }
        const resetToken = user.getResetPasswordToken();
        await user.save();

        const resetUrl = `http://localhost:3000/password-reset/${resetToken}`;

        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;

        try {
            await Mail({
                to: user.email,
                subject: "Password Reset Request",
                text: message,
            });

            res.status(200).json({
                success: true,
                data: "Email Sent"
            });

        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();
            return next(new Response("Email could not be sent", 500));
        }

    } catch (error) {
        next(error);
    }

};

exports.resetpassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {
                $gt: Date.now()
            }
        })

        if (!user) {
            return next(new Response("Invalid Reset Token", 400))
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(201).json({
            success: true,
            data: "Password was Reset!"
        })
    } catch (error) {
        next(error);
    }
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    return token;
}