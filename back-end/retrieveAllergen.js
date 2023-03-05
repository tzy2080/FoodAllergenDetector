const axios  = require('axios');
const allergenModel = require('./models/allergen_model');
const allergen = allergenModel.Allergen;

// Update and retrieve allergen list
const getAllergens = async () => {
    // In practice, hard-coding values like the url below is a bad idea as it requires the effort of a PR to change
    // It's more flexible to change values like these as environment variables and safer too since they can be encrypted
    // Consider this package to manage env vars: https://docs.npmjs.com/cli/v6/using-npm/config/
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
                    // I'll forgive console.log in a personal project
                    // In practice, logs should be handled by a proper package. They'd also define the main log types: info, debug, error
                    // Ex packages: pino, winston
                    console.log('Allergen list updated');
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