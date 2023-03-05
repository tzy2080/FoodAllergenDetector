// Model
const userAllergenModel = require('../models/user_allergen_model');
const userAllergen = userAllergenModel.userAllergen;
const allergenModel = require('../models/allergen_model');
const allergen = allergenModel.Allergen;

// In practice, comments like this are redundant: The variable name is self-explaining. Good choice of variable name by the way =)
// Get all allergens
const getAllergens = async (req, res) => {
    try {
        const userId = req.user;

        // Retrieve all allergens
        await userAllergen.find({userId: userId}, '_id allergenId allergenName')
            .then(allergens => res.json(allergens));
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

// Add new allergen
const addAllergen = async (req, res) => {
    try {
        const userId = req.user;
        const allergens = req.body.allergens;

        allergens.forEach(async item => {
            // Check if allergen already exists in the user allergen database
            await userAllergen.findOne({allergenId: item.allergenId})
                .then(async (record) => {
                    // If there is no similar allergen found
                    if (!record) {
                        // Check if the allergen is a valid type
                        await allergen.findOne({allergenId: item.allergenId})
                        .then((result) => {
                            // If there is such allergen proceed to insert
                            if (result) {
                                userAllergen.create({userId: userId, allergenId: item.allergenId, allergenName: item.allergenName})
                            }
                        })
                    }
                })
        });
        res.status(200).send('success');
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

// Delete allergen
const deleteAllergen = async (req, res) => {
    try {
        const userId = req.user;
        const _id = req.params.id;

        // Check if the allergen belongs to the user
        await userAllergen.findById(_id)
            .then(async allergen => {
                // If the allergen does not belong to the user send error
                if (String(allergen.userId) !== userId){
                    res.status(500).send();
                }
                // If the allergen belongs to the user then proceed to delete
                else {
                    await userAllergen.deleteOne({_id: _id});
                    res.status(200).send();
                }
            })

    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

// Get allergen list
const getAllergenList = async (req, res) => {
    try {
        await allergen.find({}, {allergenId: 1, allergenName: 1, _id: 0})
            .then((allergens) => {
                res.json(allergens);
            })
    } catch(error) {
        console.log(error);
        res.status(500).send();
    }
}

module.exports = { getAllergens, addAllergen,  deleteAllergen, getAllergenList }