require('express');
require('mongoose');//connect to db

const Scale = require('../models/scale.js');

//***********************GET**************************//
exports.getScales = async (req, res) => { 
    try {
        const scales = await Scale.find();
        res.status(200).json(scales);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
exports.getScaleById = async (req, res) => { 
    try {
        const scaleByID = await Scale.findById(req.params.id);
        res.status(200).json(scaleByID);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
exports.getScalesByUsername = async (req, res) => { 
    try {
        const scale_by_username = await Scale.find({username: req.params.username});
        res.status(200).json(scale_by_username);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//***********************CREATE************************//
exports.createScale = async (req, res) => { 
    const scale = new Scale({
        username: req.body.username,
        title: "",
        avoidingFailureDescription: "",
        chasingSuccessDescription: "",
        order: req.body.order
    })
    try {
        const savedScale = await scale.save();
        res.status(201).json(savedScale);
    } catch (error) {
        res.status(409).json({ message: error.message });
    } 
}

//***********************UPDATE************************//
exports.updateScaleTitle = async (req, res) => { 
    try{
        const updatedScale = await Scale.updateOne(
            {_id: req.params.id},
            {$set: {title: req.body.title}}
        )
        res.json(updatedScale)
    }catch(err){
        res.json({message: err})
    }
}
exports.updateScaleSliderValue = async (req, res) => { 
    try{
        const updatedScale = await Scale.updateOne(
            {_id: req.params.id},
            {$set: {sliderValue: req.body.sliderValue}}
        )
        res.json(updatedScale)
    }catch(err){
        res.json({message: err})
    }
}
exports.updateScaleAvoidingFailureDescription = async (req, res) => { 
    try{
        const updatedScale = await Scale.updateOne(
            {_id: req.params.id},
            {$set: {avoidingFailureDescription: req.body.avoidingFailureDescription}}
        )
        res.json(updatedScale)
    }catch(err){
        res.json({message: err})
    }
}
exports.updateScaleChasingSuccessDescription = async (req, res) => { 
    try{
        const updatedScale = await Scale.updateOne(
            {_id: req.params.id},
            {$set: {chasingSuccessDescription: req.body.chasingSuccessDescription}}
        )
        res.json(updatedScale)
    }catch(err){
        res.json({message: err})
    }
}
exports.updateScaleOrder = async (req, res) => { 
    try{
        const updatedScale = await Scale.updateOne(
            {_id: req.params.id},
            {$set: {order: req.body.order}}
        )
        res.json(updatedScale)
    }catch(err){
        res.json({message: err})
    }
}
//***********************DELETE************************//
exports.deleteScaleById = async (req, res) => { 
    try{
        const removedScale = await Scale.deleteOne({_id: req.params.id})
        res.json(removedScale)
    }catch(err){
        res.json({message: err})
    }
}