const express = require('express');
const router = express.Router();

const { 
    getScales, getScaleById, getScalesByUsername, createScale, updateScaleTitle,
    updateScaleSliderValue, updateScaleAvoidingFailureDescription, updateScaleChasingSuccessDescription,
    deleteScaleById
} = require('../controllers/scales.js');


router.get('/', getScales);
router.get('/:id', getScaleById);
router.get('/:username/username', getScalesByUsername);

router.post('/', createScale);

router.patch('/:id/title', updateScaleTitle);
router.patch('/:id/slidervalue', updateScaleSliderValue);
router.patch('/:id/avoidingFailureDescription', updateScaleAvoidingFailureDescription);
router.patch('/:id/chasingSuccessDescription', updateScaleChasingSuccessDescription);

router.delete('/:id', deleteScaleById);

module.exports = router;