import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import express from 'express'
import { connect, set } from 'mongoose'
import { schema } from './schema'
import bodyParser from 'body-parser'
import 'dotenv/config'
import cors from 'cors'

const app = express();

app.use(bodyParser.json({ limit: '30mb'}))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

let whitelist = process.env.CLIENT_WHITELIST?.split(',')
app.use(cors({
    origin: function (origin: any, callback: any) {
        if (whitelist && whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
      }
    }
))

new ApolloServer({ 
  schema,
  express: app,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
} as any)

const port = process.env.PORT || 3001;
connect(process.env.DB_CONNECTION as string, { useNewUrlParser: true, useUnifiedTopology: true, dbName: process.env.DB_NAME })
    .then(()=>{app.listen(port, ()=>console.log(`Server started on port ${port}`))})
    .catch((error)=> console.log(error.message))
    
set('useFindAndModify', false)
