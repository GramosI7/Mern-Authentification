const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

// Models Profil and User
const Profil = require("../models/Profil");
const User = require("../models/User");
const validateProfilInput = require("../validation/profil");
const validateExperienceInput = require("../validation/experience");
const validateEducationInput = require("../validation/education");

const profilRouter = express.Router();

// Get /profil/test for test
profilRouter.get("/test", (req, res) => {
    res.json({msg: "Profil Woooorrkkss"});
});


// Get /profil/
// des: recuperer l'user connecté
profilRouter.get("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    const errors = {};
    Profil.findOne({ user: req.user.id })
        .populate("users", ["name", "avatar"])
        .then(profil => {
            if(!profil) {
                errors.noprofil = "Aucun profil pour cet utilisateur";
                return res.status(404).json(errors)
            }
            res.json(profil);
        })
        .catch(err => res.status(404).json(err));
});

// get profil/all
// recuperer tous les profil du site
profilRouter.get("/all", (req, res) => {
    Profil.find()
        .populate("users", ["name", "avatar"])
        .then(profil => {
            if(!profil) {
                errors.noprofil = "Aucune utilisateur trouvé"
                res.status(404).json(errors);
            }
            res.json(profil)
        })
        .catch(err => res.status(404).json(err))
})

// get profil/all
// recuperer tous les profil du site
profilRouter.get("/all", (req, res) => {
    Profil.find()
        .populate("users", ["name", "avatar"])
        .then(profil => {
            if(!profil) {
                errors.noprofil = "Aucune utilisateur trouvé"
                res.status(404).json(errors);
            }
            res.json(profil)
        })
        .catch(err => res.status(404).json({profil : "Aucun profil trouvé"}))
})



// get /profil/handle/:handle
// des: Recupération du profil par pseudo
profilRouter.get("/handle/:handle", (req, res) => {
    const errors = {};
    
    Profil.findOne({ handle : req.params.handle })
        .populate("users", ["name", "avatar"])
        .then(profil => {
            if(!profil) {
                errors.noprofil = "Aucun profil trouvé.";
                res.status(404).json(errors);
            }
            res.json(profil);
        })
        .catch(err => res.status(404).json(err));
})

// get /profil/user/:user_id
// des: Recupération du profil par id
profilRouter.get("/user/:user_id", (req, res) => {
    const errors = {};
    
    Profil.findOne({ user : req.params.user_id })
        .populate("users", ["name", "avatar"])
        .then(profil => {
            if(!profil) {
                errors.noprofil = "Aucun profil trouvé.";
                res.status(404).json(errors);
            }
            res.json(profil);
        })
        .catch(err => res.status(404).json({profil : "Aucun profil trouvé pour cette utilisateur."}));
})


// Get /profil/
// des: Creation ou edit du profil de l'user connecté
profilRouter.post("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    const { errors, isValid } = validateProfilInput(req.body);

    //Check validation
    if(!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors)
    }

    // recuperation des champs de texte
    const profilFields = {};

    profilFields.user = req.user.id;
    if(req.body.handle) profilFields.handle = req.body.handle;
    if(req.body.company) profilFields.company = req.body.company;
    if(req.body.website) profilFields.website = req.body.website;
    if(req.body.location) profilFields.location = req.body.location;
    if(req.body.bio) profilFields.bio = req.body.bio;
    if(req.body.githubusername) profilFields.githubusername = req.body.githubusername;
    if(req.body.status) profilFields.status = req.body.status;
    // Skills // On split la string 
    if(typeof req.body.skills !== "undefined") {
        profilFields.skills = req.body.skills.split(",");
    }

    // Social
    profilFields.social = {}
    if(req.body.youtube) profilFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profilFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profilFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profilFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profilFields.social.instagram = req.body.instagram;

    Profil.findOne({ user : req.user.id })
        .then(profil => {
            if(profil) {
                // Update profil
                Profil.findOneAndUpdate({ user: req.user.id }, { $set: profilFields }, { new: true })
                    .then(profil => res.json(profil))
            } else {
                // Create profil
                // Check if handle exists
                Profil.findOne({ handle : profilFields.handle })
                    .then(profil => {
                        if(profil) {
                            errors.handle = "that handle already exists";
                            res.status(400).json(errors);
                        }
                        // Save Profil
                        new Profil(profilFields).save()
                            .then(profil => {
                                res.json(profil)
                            })
                    })

            }
        })
});

// Get Post /profil/experience
// desc Ajouter son experience
profilRouter.post("/experience", passport.authenticate("jwt", {session: false}), (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    //Check validation
    if(!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors)
    }
    Profil.findOne({ user: req.user.id })
        .then(profil => {
            const newExp = {
                title : req.body.title,
                company : req.body.company,
                location : req.body.location,
                from : req.body.from,
                to : req.body.to,
                current : req.body.current,
                description : req.body.description
            }

            // Add to exp array
            profil.experience.unshift(newExp);

            profil.save()
                .then(profil => {
                    res.json(profil)
                })
        })
})



// Get Post /profil/education
// desc Ajouter son parcours scolaire
profilRouter.post("/education", passport.authenticate("jwt", {session: false}), (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    //Check validation
    if(!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors)
    }
    Profil.findOne({ user: req.user.id })
        .then(profil => {
            const newEdu = {
                school : req.body.school,
                location : req.body.location,
                from : req.body.from,
                to : req.body.to,
                current : req.body.current,
                description : req.body.description
            }

            // Add to exp array
            profil.education.unshift(newEdu);

            profil.save()
                .then(profil => {
                    res.json(profil)
                })
        })
})

// Get Delete /profil/experience/:exp_id
// desc Delete experience du profil
profilRouter.delete("/experience/:exp_id", passport.authenticate("jwt", {session: false}), (req, res) => {
    
    Profil.findOne({ user: req.user.id })
        .then(profil => {
            // Recuperer l'index
            const removeIndex = profil.experience
                .map(item => item.id)
                .indexOf(req.params.exp_id);

            // Splice out of array
            profil.experience.splice(removeIndex, 1);

            // Save
            profil.save()
                .then(profil => {
                    res.json(profil)
                })
                .catch(err => res.status(404).json(err))
        })
})


// Get Delete /profil/education/:edu_id
// desc Delete education du profil
profilRouter.delete("/education/:edu_id", passport.authenticate("jwt", {session: false}), (req, res) => {
    
    Profil.findOne({ user: req.user.id })
        .then(profil => {
            // Recuperer l'index
            const removeIndex = profil.education
                .map(item => item.id)
                .indexOf(req.params.edu_id);

            // Splice out of array
            profil.education.splice(removeIndex, 1);

            // Save
            profil.save()
                .then(profil => {
                    res.json(profil)
                })
                .catch(err => res.status(404).json(err))
        })
})

// Get Delete /profil/profil
// desc Delete user et profil
profilRouter.delete("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    Profil.findOneAndRemove({ user : req.user.id })
        .then(() => {
            User.findOneAndRemove({ _id : req.user.id })
                .then(() => res.json({ success: true }))
        })
})



module.exports = profilRouter;