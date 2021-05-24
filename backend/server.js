const express = require('express');
const mongoose = require('mongoose');//connect to db

const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

//cors = cross-origin resource sharing
const cors = require('cors');
app.use(cors({origin: 'http://localhost:3000'}))

require('dotenv/config')//security (dotenv)


const scaleRoutes = require('./routes/scales.js');
app.use('/scales', scaleRoutes);

const userRoutes = require('./routes/users.js');
app.use('/users', userRoutes);


const port = process.env.PORT || 3001;
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{app.listen(port, ()=>console.log(`Server started on port ${port}`))})
    .catch((error)=> console.log(error.message))
    
mongoose.set('useFindAndModify', false)