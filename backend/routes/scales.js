const express = require('express');
const router = express.Router();

const { 
    getScales, getScaleById, getScalesByUsername, createScale, updateScaleTitle,
    updateScaleSliderValue, updateScaleExplanation, updateScaleFuturePlan,
    deleteScaleById
} = require('../controllers/scales.js');


router.get('/', getScales);
router.get('/:id', getScaleById);
router.get('/:username/username', getScalesByUsername);

router.post('/:id', createScale);

router.patch('/:id/title', updateScaleTitle);
router.patch('/:id/slidervalue', updateScaleSliderValue);
router.patch('/:id/explanation', updateScaleExplanation);
router.patch('/:id/futureplan', updateScaleFuturePlan);

router.delete('/:id', deleteScaleById);

module.exports = router;