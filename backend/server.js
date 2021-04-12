const express = require('express');
const app = express();
const mongoose = require('mongoose');//connect to db
const bodyParser = require('body-parser')
const Scale = require('./models/scale');
require('dotenv/config')//security (dotenv)

app.use(bodyParser.json({ limit: '30mb', extended: true }))

//cors = cross-origin resource sharing
const cors = require('cors');
app.use(cors({origin: 'http://localhost:3000'}))

app.get('/api/scales', async (req, res)=>{ //retrieving data
    try {
        const postMessages = await Scale.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

app.post('/api/scales', async (req, res)=>{ //adding data
    const scale = new Scale({
        title: req.body.title,
        sliderValue: req.body.sliderValue,
        explanation: req.body.explanation,
        futurePlan: req.body.futurePlan
    })
    try {
        const savedScale = await scale.save();
        res.status(201).json(savedScale);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
})

app.patch('/api/scales/:scaleID', async (req, res)=>{//updating data
    try{
        const updatedScale = await Scale.updateOne({_id: req.params.scaleID})
        res.json(updatedScale)
    }catch(err){
        res.json({message: err})
    }
})

app.delete('/api/scales/:scaleID', async (req, res)=>{//deleting data
    try{
        const removedScale = await Scale.deleteOne({_id: req.params.scaleID})
        res.json(removedScale)
    }catch(err){
        res.json({message: err})
    }
})

const port = process.env.PORT || 3001;
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{app.listen(port, ()=>console.log(`Server started on port ${port}`))})
    .catch((error)=> console.log(error.message))
    
mongoose.set('useFindAndModify', false)