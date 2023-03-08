const axios  = require('axios');
const allergenModel = require('./models/allergen_model');
const allergen = allergenModel.Allergen;

// Update and retrieve allergen list
const getAllergens = async () => {
    await axios.get('https://world.openfoodfacts.org/allergens.json')
        .then(async (res) => {
            const allergens = res.data.tags;
            // Filter out allergens that are not in english or none
            const filteredAllergens = allergens.filter((allergen) => {
                return allergen.id.slice(0,2) === 'en' && allergen.name !== 'None' && allergen.name !== 'none-specified';
            })
            // Delete all records
            await allergen.deleteMany({})
                .then(() => {
                    // Insert filteredAllergens into database
                    filteredAllergens.forEach(async (allergenItem) => {
                        await allergen.create([{ allergenId: allergenItem.id , allergenName: allergenItem.name}]);
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        })
        .catch((error) => {
            console.log(error);
        })
}

module.exports = getAllergens;