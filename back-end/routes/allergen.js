const router = require('express').Router();

// Authentication middleware
const auth = require('../middleware/auth');

// Controller
const controller = require('../controllers/allergen');

// Get all allergens
router.get('/', auth, controller.getAllergens);

// Add new allergen
router.post('/add', auth, controller.addAllergen);

// Delete allergen
router.delete('/delete/:id', auth, controller.deleteAllergen);

// Get allergen list
router.get('/allergens', auth, controller.getAllergenList);

module.exports = router;