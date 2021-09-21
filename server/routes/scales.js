const express = require('express');
const router = express.Router();

const { 
    getScales, getScaleById, getScalesByUsername, createScale, updateScaleTitle,
    updateScaleSliderValue, updateScaleAvoidingFailureDescription, updateScaleChasingSuccessDescription,
    updateScaleOrder, deleteScaleById
} = require('../../controllers/scales.js.js.js');


router.get('/', getScales);
router.get('/:id', getScaleById);
router.get('/:username/username', getScalesByUsername);

router.post('/', createScale);

router.patch('/:id/title', updateScaleTitle);
router.patch('/:id/slidervalue', updateScaleSliderValue);
router.patch('/:id/avoidingFailureDescription', updateScaleAvoidingFailureDescription);
router.patch('/:id/chasingSuccessDescription', updateScaleChasingSuccessDescription);
router.patch('/:id/order', updateScaleOrder);

router.delete('/:id', deleteScaleById);

module.exports = router;