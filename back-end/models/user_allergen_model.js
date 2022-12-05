// Packages
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userAllergenSchema = new Schema({
    userId : {type: Schema.Types.ObjectId, required: true},
    allergen: {type: String, required: true}
});

const userAllergen = mongoose.model('UserAllergen', userAllergenSchema);

module.exports = { userAllergen };