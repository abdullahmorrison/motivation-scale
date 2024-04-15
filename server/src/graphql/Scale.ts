import { ApolloError } from "apollo-server-errors";
import { objectType, extendType, nonNull, stringArg, intArg } from "nexus"
import { ScaleModel } from "../models/scale"

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

export const GetScales = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("scales", {
            type: "Scale",
            resolve() {
                return ScaleModel.find({})
            }
        })
    }
})

export const CreateScale = extendType({
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
                const scale = new ScaleModel(args)

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
                const scale = await ScaleModel.findById(args.id)
                if(scale.userId != args.userId)
                  throw new ApolloError("Unauthorized scale update", "UNAUTHORIZED_USER")

                const { id, ...updatedScale } = args

                const response = await ScaleModel.findByIdAndUpdate(args.id, updatedScale, {new: true})
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
                const scale = await ScaleModel.findById(args.id)
                if(scale.userId != args.userId)
                  throw new ApolloError("Unauthorized scale delete", "UNAUTHORIZED_USER")

                const response = await ScaleModel.findByIdAndDelete(args.id)
                return response
            }
        })
    }
})

