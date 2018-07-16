const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : "";

    if(!validator.isLength(data.text, {min: 10, max : 300})) {
        errors.text = "Votre texte doit contenir entre 10 et 300 caracteres."
    }
    
    if(!validator.isEmail(data.text)) {
        errors.text = "Inserez du texte.";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}