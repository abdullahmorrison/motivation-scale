import { ApolloServer } from 'apollo-server';
import { UserModel } from '../models/user';
import { ScaleModel } from '../models/scale';
import { ScaleOrderModel } from '../models/scaleOrder';
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
    await ScaleModel.deleteMany({userId: testUser.id})
    await ScaleOrderModel.deleteMany({userId: testUser.id})
    await UserModel.findByIdAndRemove(testUser.id)

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
    // createScale also appends the new id to the user's ScaleOrder. Deleting
    // only the scale leaves a dangling id there, and GET_SCALES maps its
    // results through that order — yielding null in a non-null list.
    await ScaleOrderModel.deleteMany({userId: testUser.id})
  })
  // The three "nonexistant userId" tests passed a userId variable the schema
  // no longer declares, so they never exercised a missing user at all. They
  // can't be restored as written: UserModel.findById resolves to null for a
  // missing document instead of rejecting, so the .catch in Scale.ts (lines
  // 70, 117, 145) never runs and NOT_FOUND is unreachable. Restore these once
  // the resolvers check for a null user.
  it.todo("Reject creating a scale when the authenticated user no longer exists")
  it.todo("Rejects getting scales when the authenticated user no longer exists")
  it.todo("Rejects updating a scale when the authenticated user no longer exists")


  it("Retrieves all scales from user with userId", async ()=>{
    const numScales = await ScaleModel.find({userId: testScale.userId}).count()

    const response = await testServer.executeOperation({
      query: ScaleQueries.GET_SCALES
    })
    const scales = response.data?.scales

    expect(response.errors).toBe(undefined)
    expect(scales.length).toBe(numScales)
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
  it("Rejects updating a scale for a nonexistant scaleId", async ()=>{
    const response = await testServer.executeOperation({
      query: ScaleQueries.UPDATE_SCALE,
      variables: {...testScaleData, id: "fakeScaleId"}
    })
    expect(response.errors?.at(0)?.extensions?.code).toBe(ERROR_LIST.NOT_FOUND.code)
  })
})

