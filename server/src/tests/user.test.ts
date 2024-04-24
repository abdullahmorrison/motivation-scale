import { ApolloServer } from 'apollo-server';
import { UserModel } from "../models/user"
import { schema } from "../schema"
import express from "express"
import { connect, disconnect } from 'mongoose';
import UserQueries  from "./queries/user"
import { ERROR_LIST } from '../utils/error-handler.helper';

describe("Login/Register", ()=>{
  let testServer: ApolloServer

  const user = {
    email: "test@gmail.com",
    password: "test"
  }

  beforeAll(async ()=>{
    const app = express()

    testServer = new ApolloServer({
      schema,
      express: app
    } as any)

    const port = process.env.PORT || 3003;
    connect(process.env.DB_CONNECTION as string, { useNewUrlParser: true, useUnifiedTopology: true, dbName: process.env.DB_NAME })
        .then(()=>{app.listen(port, ()=>console.log(`User test server started on port ${port}`))})

    // make sure we are only making queries to the test database
    const env = process.env.DB_NAME
    if(env===undefined || env!=="test")
      throw new Error(`environment variable (${env}) not set to test`)

    // make sure the test user does not already exits (already registered)
    const response = await UserModel.find({email: user.email}).catch()
    if(response.length>0) await UserModel.findByIdAndDelete(response.at(0)._id) //remove from db if exists
  })
  afterAll(async ()=>{
    await testServer.stop()
    disconnect()
  })

  it("Registers a new user", async ()=>{
    const response = await testServer.executeOperation({
      query: UserQueries.REGISTER_USER,
      variables: user
    })
    expect(response.errors).toBe(undefined)
    expect(response.data?.registerUser.email).toBe(user.email)
  })
  it("Register: reject already existing user email", async ()=>{
    const alreadyExistingUser = {
      email: "existingemail@gmail.com",
      password: "test"
    }
    const response = await testServer.executeOperation({
      query: UserQueries.REGISTER_USER,
      variables: { email: alreadyExistingUser.email, password: alreadyExistingUser.password}
    })
    expect(response.errors?.at(0)?.extensions?.code).toBe(ERROR_LIST.ALREADY_EXISTS.code)
  })
  it("Register: reject invalid email", async ()=>{
    const invalidEmails = ["invalidemail", "invalidemail@2", "invalidemail.com", "invalid@email."]

    for(let invalidEmail of invalidEmails){
      let response = await testServer.executeOperation({
        query: UserQueries.REGISTER_USER,
        variables: {email: invalidEmail, password: user.password}
      })
      expect(response.errors?.at(0)?.extensions?.code).toBe(ERROR_LIST.BAD_USER_INPUT.code)
    }
  })

  it("Login a user", async ()=>{
    const response = await testServer.executeOperation({
      query: UserQueries.LOGIN_USER,
      variables: user
    })
    expect(response.data?.loginUser.email).toBe(user.email)
  })
  it("Login: rejects nonexistant email", async ()=>{
    let nonexistantEmail = "nonexistantemail@email.com"

    const response = await testServer.executeOperation({
      query: UserQueries.LOGIN_USER,
      variables: { email: nonexistantEmail, password: user.password},
    })
    expect(response.errors?.at(0)?.extensions?.code).toBe(ERROR_LIST.AUTHENTICATION_FAILED.code)
  })
  it("Login: rejects incorrect password", async ()=>{
    const response = await testServer.executeOperation({
      query: UserQueries.LOGIN_USER,
      variables: { email: user.email, password: "incorrectpassword"},
    })
    expect(response.errors?.at(0)?.extensions?.code).toBe(ERROR_LIST.AUTHENTICATION_FAILED.code)
  })
})
