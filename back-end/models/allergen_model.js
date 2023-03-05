// Redundant comment
// Import packages
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const allergenSchema = new Schema({
    allergenId: {type: String, required: true},
    allergenName: {type: String, required: true}
})

const Allergen = mongoose.model('Allergen', allergenSchema);

module.exports = { Allergen };