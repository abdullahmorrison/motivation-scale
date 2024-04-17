import { GraphQLError } from "graphql";
import { objectType, extendType, nonNull, stringArg, intArg } from "nexus"
import { ScaleModel } from "../models/scale"
import { UserModel } from "../models/user";

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
                const user = await UserModel.findById(args.userId)
                if(!user){
                  throw new GraphQLError("User with that user id does not exist", {
                    extensions: {
                      code: "FORBIDDEN"
                    }
                  })
                }

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
                const user = await UserModel.findById(args.userId)
                if(!user){
                  throw new GraphQLError("User with that user id does not exist", {
                    extensions: {
                      code: "FORBIDDEN"
                    }
                  })
                }

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
                const user = await UserModel.findById(args.userId)
                if(!user){
                  throw new GraphQLError("User with that user id does not exist", {
                    extensions: {
                      code: "DATA_NOT_FOUND"
                    }
                  })
                }

                const scale = await ScaleModel.findById(args.id).catch((err: Error)=> console.log(err))
                if(scale==undefined){
                  throw new GraphQLError("Scale with that id does not exist", {
                    extensions: {
                      code: "DATA_NOT_FOUND"
                    }
                  })
                }else if(scale.userId != args.userId){
                  throw new GraphQLError("Unauthorized scale mutation", {
                    extensions: {
                      code: "FORBIDDEN"
                    }
                  })
                }

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
                const user = await UserModel.findById(args.userId)
                if(!user){
                  throw new GraphQLError("User with that user id does not exist", {
                    extensions: {
                      code: "DATA_NOT_FOUND"
                    }
                  })
                }

                const scale = await ScaleModel.findById(args.id).catch((err: Error)=> console.log(err))
                if(scale==undefined){
                  throw new GraphQLError("Scale with that id does not exist", {
                    extensions: {
                      code: "DATA_NOT_FOUND"
                    }
                  })
                }else if(scale.userId != args.userId){
                  throw new GraphQLError("Unauthorized scale mutation", {
                    extensions: {
                      code: "FORBIDDEN"
                    }
                  })
                }

                const response = await ScaleModel.findByIdAndDelete(args.id)
                return response
            }
        })
    }
})

