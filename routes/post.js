const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../models/Post")
const postRouter = express.Router();

// Validation
const validatePostInput = require("../validation/post");

postRouter.get('/test', (req, res) => {
    res.json({ msg: "post works"})
});

// POST /post/
// des: Create post
postRouter.post("/", passport.authenticate("jwt", {session: false}), (req,res) => {
    const {errors, isValid} = validatePostInput;

    if(!isValid) {
        //si err, envoie err400
        return res.status(400).json(errors);
    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.name,
        user: req.body.id
    });

    newPost.save()
        .then(post => {
            res.json(post)
        })
})

module.exports = postRouter;