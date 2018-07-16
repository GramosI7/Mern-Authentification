const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : "";
    data.company = !isEmpty(data.company) ? data.company : "";
    data.from = !isEmpty(data.from) ? data.from : "";
    data.company = !isEmpty(data.company) ? data.company : "";

    
    if(validator.isEmpty(data.title)) {
        errors.title = "Inserez une profession.";
    }
    if(validator.isEmpty(data.company)) {
        errors.company = "Inserez le nom de l'entreprise.";
    }
    if(validator.isEmpty(data.from)) {
        errors.from = "Inserez une date.";
    }
  

    return {
        errors,
        isValid: isEmpty(errors)
    }
}