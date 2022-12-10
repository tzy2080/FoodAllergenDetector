// Model
const userAllergenModel = require('../models/user_allergen_model');
const userAllergen = userAllergenModel.userAllergen;
const allergenModel = require('../models/allergen_model');
const allergen = allergenModel.Allergen;

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
        const allergenId = req.body.allergenId;
        const allergenName = req.body.allergenName;

        // Add new allergen
        const newAllergen = new userAllergen({
            userId,
            allergenId,
            allergenName
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