const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : "";
    data.from = !isEmpty(data.from) ? data.from : "";

    
    if(validator.isEmpty(data.school)) {
        errors.school = "Inserez une ecole.";
    }
    if(validator.isEmpty(data.from)) {
        errors.from = "Inserez une date.";
    }
  

    return {
        errors,
        isValid: isEmpty(errors)
    }
}