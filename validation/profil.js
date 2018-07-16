const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfilInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : "";
    data.status = !isEmpty(data.status) ? data.status : "";
    data.skills = !isEmpty(data.skills) ? data.skills : "";

    if(!validator.isLength(data.handle, {min: 2, max: 40})) {
        errors.handle = "Handle doit contenir entre 2 et 40 caracteres.";
    }
    if(validator.isEmpty(data.handle)) {
        errors.handle = "Profile handle es required.";
    }
    if(validator.isEmpty(data.status)) {
        errors.status = "Inserez un statut.";
    }

    if(validator.isEmpty(data.skills)) {
        errors.skills = "Inserez des compétences.";
    }

    if(!isEmpty(data.website)) {
        if(!validator.isURL(data.website)) {
            errors.website = "Adresse url non valide."
        }
    }

    if(!isEmpty(data.youtube)) {
        if(!validator.isURL(data.youtube)) {
            errors.youtube = "Adresse url non valide."
        }
    }

    if(!isEmpty(data.facebook)) {
        if(!validator.isURL(data.facebook)) {
            errors.facebook = "Adresse url non valide."
        }
    }

    if(!isEmpty(data.linkedin)) {
        if(!validator.isURL(data.linkedin)) {
            errors.linkedin = "Adresse url non valide."
        }
    }
    if(!isEmpty(data.instagram)) {
        if(!validator.isURL(data.instagram)) {
            errors.instagram = "Adresse url non valide."
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}