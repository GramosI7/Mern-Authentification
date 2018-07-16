const express = require("express");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const passport = require("passport");
const keys = require("../config/keys");
const User = require("../models/User");

// Load Input Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");


const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    res.json({
        msg: "User works"
    })
});

// Register user
// localhost://users/register   
userRouter.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                errors.email = "L'email existe deja"
                return res.status(400).json({
                    email: "L'email existe deja !"
                })
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: "200", // size
                    r: "pg", // Rating
                    d: "mm" // Default
                })

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                });

                // HAsh Password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.log(err);
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
});

// Login user
// localhost://users/login
userRouter.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({
            email: email
        })
        .then(user => {
            // Check the user
            if (!user) {
                errors.email = "Utilisateur non trouvé"
                return res.status(404).json({
                    email: "L'email n'existe pas !"
                })
            }

            // Check password 
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User Match
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        } // Creation du JWT Payload
                        //Sign Token
                        jwt.sign(payload, keys.secretOrKey, {
                            expiresIn: 3600
                        }, (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                        });
                    } else { 
                        errors.name = "Password incorrect";
                        return res.status(400).json({
                            password: "Password incorrect"
                        })
                    }
                })
        });
});

// Get users/current
// Return Current User
userRouter.get("/current", passport.authenticate("jwt", {session : false}), (req, res) => {
    res.json({
        id : req.user.id,
        name : req.user.name,
        email : req.user.email
    });
})


module.exports = userRouter;