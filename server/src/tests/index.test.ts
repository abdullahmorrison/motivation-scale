import { ApolloServer } from 'apollo-server';
import { disconnect } from 'mongoose';
import { schema } from "../schema"
import { app } from "../server"
import { REGISTER_USER, LOGIN_USER } from "./queries/user"
import {ERROR_LIST} from '../utils/error-handler.helper';


describe("Login/Register", ()=>{
  let testServer: ApolloServer

  beforeAll(async ()=>{
    testServer = new ApolloServer({
      schema,
      express: app
    } as any)
  })
  afterAll(async ()=>{
    await testServer.stop()
    await disconnect()
  })

  const email = "test@gmail.com"
  const password = "test"

  it("Registers a new user", async ()=>{
    const response = await testServer.executeOperation({
      query: REGISTER_USER,
      variables: {email, password}
    })
    expect(response.errors).toBe(undefined)
    expect(response.data?.registerUser.email).toBe(email)
  })
  //missing: Register: reject user already exists
  
  it("Register: reject invalid email", async ()=>{
    const invalidEmails = ["invalidemail", "invalidemail@2", "invalidemail.com", "invalid@email."]

    for(let invalidEmail of invalidEmails){
      let response = await testServer.executeOperation({
        query: REGISTER_USER,
        variables: {email: invalidEmail, password}
      })
      expect(response.errors?.at(0)?.extensions?.code).toBe(ERROR_LIST.BAD_USER_INPUT.code)
    }
  })

  it("Login a user", async ()=>{
    const response = await testServer.executeOperation({
      query: LOGIN_USER,
      variables: { email, password},
    })
    expect(response.data?.loginUser.email).toBe(email)
  })
  it("Login: rejects nonexistant email", async ()=>{
    let nonexistantEmail = "nonexistantemail@email.com"

    const response = await testServer.executeOperation({
      query: LOGIN_USER,
      variables: { email: nonexistantEmail, password},
    })
    expect(response.errors?.at(0)?.extensions?.code).toBe(ERROR_LIST.AUTHENTICATION_FAILED.code)
  })
  it("Login: rejects incorrect password", async ()=>{
    const response = await testServer.executeOperation({
      query: LOGIN_USER,
      variables: { email, password: "incorrectpassword"},
    })
    expect(response.errors?.at(0)?.extensions?.code).toBe(ERROR_LIST.AUTHENTICATION_FAILED.code)
  })
})

