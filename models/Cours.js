const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const coursSchema = new Schema({
    title: {type: String, required: true},
    author : {
        type: Schema.Types.String,
        ref: "users"
    },
    years: {type : Date, "default": Date.now},
    body: {type: String, required: true},
    img: {type: String}
})

module.exports = Cours = mongoose.model("cours", coursSchema);