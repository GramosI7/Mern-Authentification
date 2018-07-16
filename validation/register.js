const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Taille du nom
    if(!validator.isLength(data.name, { min : 2, max : 30 })){
        errors.name = "Votre nom doit contenir entre 2 et 30 caracteres.";
    }
    // remplir le nom
    if(validator.isEmpty(data.name)) {
        errors.name = "Un nom est requis.";
    }
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
    //remplir mot de passe n°2
    if(validator.isEmpty(data.password2)) {
        errors.password = "Un mot de passe est requis.";
    }
    // Taille du mot de passe
    if(!validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password2 = "Votre mot de passe doit contenir plus de 6 caracteres.";
    }
    // COnfirmartion du mot de passe 1 et 2
    if(!validator.equals(data.password, data.password2)) {
        errors.password2 = "Vos mot de passe de sont pas identiques.";
    }



    return {
        errors,
        isValid: isEmpty(errors)
    }
}