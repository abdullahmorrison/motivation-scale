import { ApolloServer } from 'apollo-server';
import { UserModel } from '../models/user';
import { ScaleModel } from '../models/scale';
import { schema } from "../schema"
import { connect, disconnect } from 'mongoose';
import  ScaleQueries from "./queries/scale"
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
    // Apollo defaults context to {} when none is given. {} is truthy, so the
    // `if(!ctx)` guard in the resolvers passes and they run with ctx.id
    // undefined — silently operating on a user that does not exist.
    testServer = new ApolloServer({
      schema,
      context: ()=> ({ id: testUser.id })
    } as any)

    // Awaited: the model calls below used to race this, relying on mongoose
    // command buffering. No express listener either — executeOperation runs
    // in-process, and the listener was never closed, so jest hung on it.
    await connect(process.env.DB_CONNECTION as string, { useNewUrlParser: true, useUnifiedTopology: true, dbName: process.env.DB_NAME })

    testUser = await new UserModel({
      email: "scaleTestEmail@gmail.com",
      password: "unencryptedScaleTestPassword",
      token: "scaleNonJWTTestToken"
    }).save().catch((err: unknown)=>console.log("Failed to create test user: "+err))

    // No userId: the mutation stopped accepting it when auth moved to the JWT,
    // so GraphQL discards it. The resolver stamps ctx.id on the scale instead.
    testScaleData = {
      goal: "Test Scale",
      sliderValue: 60,
      chasingSuccessDescription: "test chasing success description",
      avoidingFailureDescription: "test avoiding failure description",
    }

    testScale = await new ScaleModel({...testScaleData, userId: testUser.id}).save()
      .catch((err: unknown)=>console.log("Failed to create test scale: "+err))
  })
  afterAll(async ()=>{
    await ScaleModel.findByIdAndRemove(testScale.id)
      .catch((err: unknown)=>console.log("Failed to delete test scale: "+err))
    await UserModel.findByIdAndRemove(testUser.id)
      .catch((err: unknown)=>console.log("Failed to delete test user: "+err))

    await testServer.stop()
    await disconnect()
  })

  it("Create a scale for user with userId", async ()=>{
    const response = await testServer.executeOperation({
      query: ScaleQueries.CREATE_SCALE,
      variables: testScaleData
    })
    const scaleObj = response.data?.createScale

    // Before comparing: compareScales returns false for undefined input, so a
    // failed operation would otherwise surface as "scales didn't match"
    // instead of the actual GraphQL error.
    expect(response.errors).toBe(undefined)
    expect(compareScales({...testScaleData, userId: testUser.id}, scaleObj)).toBeTruthy()

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
      query: ScaleQueries.GET_SCALES
    })
    const scales = response.data?.scales

    expect(response.errors).toBe(undefined)
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
    // Not ScaleModel.create(testScale): that clones the existing document
    // including its _id, so the insert collides with the scale it copied.
    const newScale = await ScaleModel.create({...testScaleData, userId: testUser.id})
    
    const expectedUpdatedScale = {
      id: newScale.id,
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

    expect(response.errors).toBe(undefined)
    expect(compareScales({...expectedUpdatedScale, userId: testUser.id}, updatedScale)).toBeTruthy()

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

