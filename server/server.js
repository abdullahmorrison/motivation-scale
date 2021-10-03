const express = require('express');
const mongoose = require('mongoose');//connect to db
const path = require('path')

const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

//cors = cross-origin resource sharing
const cors = require('cors');
var whitelist = ['http://localhost:3000', 'https://pgpscale.netlify.app']
app.use(cors({
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
        }
    }
))

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