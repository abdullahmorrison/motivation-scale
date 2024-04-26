import { ApolloServer } from 'apollo-server';
import { UserModel } from '../models/user';
import { ScaleModel } from '../models/scale';
import { schema } from "../schema"
import { connect, disconnect } from 'mongoose';
import  ScaleQueries from "./queries/scale"
import express from "express"
import { ERROR_LIST } from '../utils/error-handler.helper';

type ScaleProps = {
  userId: string,
  goal: string,
  sliderValue: number,
  chasingSuccessDescription: string,
  avoidingFailureDescription: string

}

const compareScales = (scale1: ScaleProps, scale2: ScaleProps & Object): boolean =>{
  if(scale1==undefined || scale2==undefined) return false
  return (
    scale1.userId == scale2.userId
    && scale1.goal == scale2.goal
    && scale1.chasingSuccessDescription == scale2.chasingSuccessDescription
    && scale1.avoidingFailureDescription == scale2.avoidingFailureDescription
  )
}

describe("Scale", ()=>{
  let testServer: ApolloServer

  let testUser: any
  let testScale: any
  let testScaleData: any 

  beforeAll(async ()=>{
    const app = express()
    testServer = new ApolloServer({
      schema,
      express: app
    } as any)

    const port = process.env.PORT || 3002;
    connect(process.env.DB_CONNECTION as string, { useNewUrlParser: true, useUnifiedTopology: true, dbName: process.env.DB_NAME })
      .then(()=>{app.listen(port, ()=>console.log(`Scale test server started on port ${port}`))})

    testUser = await new UserModel({
      email: "scaleTestEmail@gmail.com",
      password: "unencryptedScaleTestPassword",
      token: "scaleNonJWTTestToken"
    }).save().catch((err: unknown)=>console.log("Failed to create test user: "+err))

    testScaleData = {
      userId: testUser?.id,
      goal: "Test Scale",
      sliderValue: 60,
      chasingSuccessDescription: "test chasing success description",
      avoidingFailureDescription: "test avoiding failure description",
    }

    testScale = await new ScaleModel(testScaleData).save()
      .catch((err: unknown)=>console.log("Failed to create test scale: "+err))
  })
  afterAll(async ()=>{
    await ScaleModel.findByIdAndRemove(testScale.id)
      .catch((err: unknown)=>console.log("Failed to delete test scale: "+err))
    await UserModel.findByIdAndRemove(testUser.id)
      .catch((err: unknown)=>console.log("Failed to delete test user: "+err))

    disconnect()
  })

  it("Create a scale for user with userId", async ()=>{
    const response = await testServer.executeOperation({
      query: ScaleQueries.CREATE_SCALE,
      variables: testScaleData
    })
    const scaleObj = response.data?.createScale

    expect(compareScales(testScaleData, scaleObj)).toBeTruthy()

    await ScaleModel.findByIdAndRemove(scaleObj.id)
      .catch(()=>console.log("Create scale test cleanup error: Failed to delete test scale."))
  })
  it("Reject creating scale for nonexistant userID", async ()=>{
    const fakeUserId = "fAk3us3R1d" 
    const response = await testServer.executeOperation({
      query: ScaleQueries.CREATE_SCALE,
      variables: { ...testScaleData, userId: fakeUserId }
    })
    expect(response.errors?.at(0)?.extensions?.code).toBe(ERROR_LIST.NOT_FOUND.code)
  })


  it("Retrieves all scales from user with userId", async ()=>{
    const numScales = await ScaleModel.find({userId: testScale.userId}).count()

    const response = await testServer.executeOperation({
      query: ScaleQueries.GET_SCALES,
      variables: {userId: testScale.userId}
    })
    const scales = response.data?.scales
    expect(scales.length).toBe(numScales)
  })

  it("Rejects getting scales of a nonexistant userId", async ()=>{
    const response = await testServer.executeOperation({
      query: ScaleQueries.GET_SCALES,
      variables: {userId: "fakeUserId"}
    })
    expect(response.errors?.at(0)?.extensions?.code).toBe(ERROR_LIST.NOT_FOUND.code)
  })

  it("Update a scale for user with userId", async ()=>{
    const newScale = await ScaleModel.create(testScale)
    
    const expectedUpdatedScale = {
      id: newScale.id,
      userId: testScale.userId,
      goal: "Updated Scale",
      sliderValue: 2,
      chasingSuccessDescription: "Updated chasing success description",
      avoidingFailureDescription: "Updated avoiding failure description"

    }
    const response = await testServer.executeOperation({
      query: ScaleQueries.UPDATE_SCALE,
      variables: expectedUpdatedScale
    })
    const updatedScale = response.data?.updateScale
    expect(compareScales(expectedUpdatedScale, updatedScale)).toBeTruthy()

    await ScaleModel.findByIdAndRemove(newScale.id)
      .catch(()=>console.log("Create scale test cleanup error: Failed to delete test scale."))
  })
  it("Rejects updating a scale for a nonexistant userId", async ()=>{
    const response = await testServer.executeOperation({
      query: ScaleQueries.UPDATE_SCALE,
      variables: {...testScaleData, id: testScale.id, userId: "fakeUserId"} 
    })
    expect(response.errors?.at(0)?.extensions?.code).toBe(ERROR_LIST.NOT_FOUND.code)
  })

  it("Rejects updating a scale for a nonexistant scaleId", async ()=>{
    const response = await testServer.executeOperation({
      query: ScaleQueries.UPDATE_SCALE,
      variables: {...testScaleData, id: "fakeScaleId"}
    })
    expect(response.errors?.at(0)?.extensions?.code).toBe(ERROR_LIST.NOT_FOUND.code)
  })
})

