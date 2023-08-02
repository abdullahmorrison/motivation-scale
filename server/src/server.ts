import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import express from 'express'
import { connect, set } from 'mongoose'
import { schema } from './schema'
import bodyParser from 'body-parser'

const app = express();

app.use(bodyParser.json({ limit: '30mb'}))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

const cors = require('cors');
var whitelist = ['http://localhost:3000', 'https://pgpscale.netlify.app']
app.use(cors({
    origin: function (origin: any, callback: any) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
        }
    }
))

require('dotenv/config')//security (dotenv)

const server = new ApolloServer({ 
    schema,
    express: app,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
} as any)

const port = process.env.PORT || 3001;
connect(process.env.DB_CONNECTION as string, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'myFirstDatabase'})
    .then(()=>{server.listen(port, ()=>console.log(`Server started on port ${port}`))})
    .catch((error)=> console.log(error.message))
    
set('useFindAndModify', false)