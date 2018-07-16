const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    
    // Adresse mail possible
    if(!validator.isEmail(data.email)) {
        errors.email = "L'email est invalide.";
    }
    //remplir adresse email
    if(validator.isEmpty(data.email)) {
        errors.email = "Inserez un email.";
    }
    // remplir le mot de passe
    if(validator.isEmpty(data.password)) {
        errors.password = "Un mot de passe est requis.";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}