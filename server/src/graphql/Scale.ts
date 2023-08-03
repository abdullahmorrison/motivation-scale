import { objectType, extendType, nonNull, stringArg, intArg } from "nexus"
import { ScaleModel } from "../models/scale"

export const Scale = objectType({
    name: "Scale",
    definition(t) {
        t.nonNull.id("id");
        t.nonNull.string("username");
        t.nonNull.string("goal");
        t.nonNull.int("sliderValue");
        t.nullable.string("chasingSuccessDescription");
        t.nullable.string("avoidingFailureDescription");
    },
})

export const ScaleQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("scales", {
            type: "Scale",
            resolve() {
                return ScaleModel.find({}).sort({createdAt: -1})
            }
        });
    }
})

export const CreateScale = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createScale", {
            type: "Scale",
            description: "Create a new scale", 
            args: {
                username: nonNull(stringArg()),
                goal: nonNull(stringArg()),
                sliderValue: nonNull(intArg()),
                chasingSuccessDescription: stringArg(),
                avoidingFailureDescription: stringArg(),
            },
            resolve: async (_, args) => {
                const scale = new ScaleModel(args)

                const response = await scale.save()
                return {
                    id: response._id,
                    ...scale.toObject()
                }
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
                username: stringArg(),
                goal: stringArg(),
                sliderValue: intArg(),
                chasingSuccessDescription: stringArg(),
                avoidingFailureDescription: stringArg(),
            },
            resolve: async (_, args) => {
                const { id, ...scale } = args

                const response = await ScaleModel.findByIdAndUpdate(args.id, scale, {new: true})
                return {
                    id: response._id,
                    ...response.toObject()
                }
            }
        })
    }
})
