// Model
const userAllergenModel = require('../models/user_allergen_model');
const userAllergen = userAllergenModel.userAllergen;

// Get all allergens
const getAllergens = async (req, res) => {
    try {
        const userId = req.user;

        // Retrieve all allergens
        await userAllergen.find({userId: userId})
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
        const allergen = req.body.allergen;

        // Add new allergen
        const newAllergen = new userAllergen({
            userId,
            allergen
        });

        await newAllergen.save()
            .then(() => {
               res.status(200).send(); 
            });
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
                    console.log(error);
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

module.exports = { getAllergens, addAllergen,  deleteAllergen }