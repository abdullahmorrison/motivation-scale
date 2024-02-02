import { objectType, nonNull, stringArg } from "nexus"
import { UserModel } from "../models/user"
import { ApolloError } from "apollo-server-errors"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const User = objectType({
    name: "User",
    definition(t) {
        t.nonNull.id("id");
        t.nonNull.string("username");
        t.nonNull.string("email");
        t.nonNull.string("password");
        t.nonNull.string("token");
    }
})

export const GetUsers = objectType({
    name: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("users", {
            type: "User",
            description: "Get all users",
            resolve() {
                return UserModel.find({}).sort({createdAt: -1})
            }
        });
    }
})

export const RegisterUser = objectType({
    name: "Mutation",
    definition(t) {
        t.nonNull.field("createUser", {
            type: "User",
            description: "Create a new user", 
            args: {
                username: nonNull(stringArg()),
                email: nonNull(stringArg()),
                password: nonNull(stringArg())
            },
            resolve: async (_, args) => {
                const oldUser =  await UserModel.findOne({email: args.email})
                if(oldUser) throw new ApolloError("User already exists", "USER_ALREADY_EXISTS")

                const encryptedPassword = await bcrypt.hash(args.password, 10)

                const newUser = new UserModel(args)
                newUser.password = encryptedPassword

                const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
                newUser.token = token

                const response = await newUser.save()
                return {
                    id: response._id,
                    ...newUser.toObject()
                }
            }
        })
    }
})
