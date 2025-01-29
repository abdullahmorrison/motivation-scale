import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import express from 'express'
import { connect, set } from 'mongoose'
import { schema } from './schema'
import bodyParser from 'body-parser'
import 'dotenv/config'
import cors from 'cors'
import jwt from "jsonwebtoken"
import throwCustomError, { ERROR_LIST } from './utils/error-handler.helper'

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

const server = new ApolloServer({
  schema,
  express: app,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: ({ req }: any) => {
    const token = req.headers.authorization
    if(!token) return null

    const JWT_SECRET: string = process.env.JWT_SECRET //JWT_SECRET not set up, throw error
      || throwCustomError(ERROR_LIST.INTERNAL_SERVER_ERROR, "Failed to set JWT secret")

    const response: any = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET)
    if(response.message) throwCustomError(ERROR_LIST.AUTHENTICATION_FAILED, response.message)

    return response
  },
} as any)

const port = process.env.PORT || 3002
connect(process.env.DB_CONNECTION as string, { useNewUrlParser: true, useUnifiedTopology: true, dbName: process.env.DB_NAME })
    .then(()=>{server.listen(port, ()=>console.log(`Server started on port ${port}`))})
    
set('useFindAndModify', false)
