const express = require('express');
const app = express();
//connect to db
const mongoose = require('mongoose');
//security (dotenv)
require('dotenv/config')

//cors = cross-origin resource sharing
const cors = require('cors');
app.use(cors({origin: 'http://localhost:3000'}))

app.get('/api/scales', (req, res)=>{
    const scales = [
        {
            id: 1,
            title: 'Coding the PGP Scale',
            sliderValue: 60,
            explanation: "Making great progress",
            futurePlan: "Continue working hard :)"
        },
        {id: 2}
    ];
    res.json(scales);
})

const port = process.env.PORT || 3001;
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{app.listen(port, ()=>console.log(`Server started on port ${port}`))})
    .catch((error)=> console.log(error.message))
    
mongoose.set('useFindAndModify', false)