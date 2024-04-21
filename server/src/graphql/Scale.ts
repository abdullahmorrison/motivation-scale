import { objectType, extendType, nonNull, stringArg, intArg } from "nexus"
import { ScaleModel } from "../models/scale"
import { UserModel } from "../models/user";
import throwCustomError, { ERROR_LIST } from '../utils/error-handler.helper'

export const Scale = objectType({
    name: "Scale",
    definition(t) {
        t.nonNull.id("id");
        t.nonNull.string("userId");
        t.nonNull.string("goal");
        t.nonNull.int("sliderValue");
        t.nullable.string("chasingSuccessDescription");
        t.nullable.string("avoidingFailureDescription");
    },
})

export const GetScalesOfUser = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("scales", {
            type: "Scale",
            description: "Get scales of a user",
            args: {
              userId: nonNull(stringArg())
            },
            resolve: async (_, args) => {
                await UserModel.findById(args.userId) //check user exists
                  .catch(()=> {throwCustomError(ERROR_LIST.NOT_FOUND, "User with that id does not exist")})

                return ScaleModel.find({userId: args.userId})
            }
        })
    }
})

export const CreateScaleForUser = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createScale", {
            type: "Scale",
            description: "Create a new scale", 
            args: {
                userId: nonNull(stringArg()),
                goal: nonNull(stringArg()),
                sliderValue: intArg(),
                chasingSuccessDescription: stringArg(),
                avoidingFailureDescription: stringArg(),
            },
            resolve: async (_, args) => {
                await UserModel.findById(args.userId) //check user exists
                  .catch(()=> {throwCustomError(ERROR_LIST.NOT_FOUND, "User with that id does not exist")})

                const scale: any = new ScaleModel(args)

                const response = await scale.save()
                return response
            }
        })
    }
})

export const UpdateScale = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("updateScale", {
            type: "Scale",
            description: "Update a scale",
            args: {
                id: nonNull(stringArg()),
                userId: nonNull(stringArg()),
                goal: stringArg(),
                sliderValue: intArg(),
                chasingSuccessDescription: stringArg(),
                avoidingFailureDescription: stringArg(),
            },
            resolve: async (_, args) => {
                await UserModel.findById(args.userId) //check user exists
                  .catch(()=> throwCustomError(ERROR_LIST.NOT_FOUND, "User with that id does not exist"))
                const scale = await ScaleModel.findById(args.id) //check scale exists
                  .catch(()=> throwCustomError(ERROR_LIST.NOT_FOUND, "Scale with that id does not exist"))
                if(scale.userId != args.userId)
                  throwCustomError(ERROR_LIST.FORBIDDEN, "Unauthorized scale update")

                const { id, ...updatedScale } = args

                const response = await ScaleModel.findByIdAndUpdate(id, updatedScale, {new: true})
                return response
            }
        })
    }
})

export const DeleteScaleById = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("deleteScale", {
            type: "Scale",
            description: "Delete a scale",
            args: {
                id: nonNull(stringArg()),
                userId: nonNull(stringArg())
            },
            resolve: async (_, args) => {
                await UserModel.findById(args.userId) //check user exists
                  .catch(()=> throwCustomError(ERROR_LIST.NOT_FOUND, "User with that id does not exist"))
                const scale = await ScaleModel.findById(args.id) //check scale exists
                  .catch(()=> throwCustomError(ERROR_LIST.NOT_FOUND, "Scale with that id does not exist"))
                if(scale.userId != args.userId)
                  throwCustomError(ERROR_LIST.FORBIDDEN, "Unauthorized scale delete")

                const response = await ScaleModel.findByIdAndDelete(args.id)
                return response
            }
        })
    }
})

