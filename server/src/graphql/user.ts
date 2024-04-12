import { objectType, nonNull, stringArg, extendType } from "nexus"
import { UserModel } from "../models/user"
import { ApolloError } from "apollo-server-errors"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import "dotenv/config"

export const User = objectType({
    name: "User",
    definition(t) {
        t.nonNull.id("id");
        t.nonNull.string("email");
        t.nonNull.string("password");
        t.nonNull.string("token");
    }
})

export const GetUsers = extendType({
    type: "Query",
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

const isEmailValid = (email: String): boolean =>{
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) != null
}
export const RegisterUser = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("registerUser", {
            type: "User",
            description: "Register a new user", 
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg())
            },
            resolve: async (_, args) => {
                const oldUser =  await UserModel.findOne({email: args.email})
                if(oldUser) throw new ApolloError("User already exists", "USER_ALREADY_EXISTS")

                if(!isEmailValid(args.email)) throw new ApolloError("Invalid Email", "INVALID_EMAIL")

                const encryptedPassword = await bcrypt.hash(args.password, 10)

                const JWT_SECRET = process.env.JWT_SECRET
                if(!JWT_SECRET) throw new ApolloError("JWT_SECRET envronment variable not set!", "JWT_SECRET_UNDEFINED")

                const newUser = new UserModel({
                  ...args,
                  password: encryptedPassword
                })

                const token = jwt.sign({id: newUser._id, email: args.email}, JWT_SECRET)

                if(token==undefined){ throw new ApolloError("TOKEN CREATION FAILED: "+token, "TOKEN_CREATION_FAILED") }

                (newUser as any).token = token

                const response = await newUser.save()
                return response
            }
        })
    }
})

export const LoginUser = extendType({
  type: "Mutation",
  definition(t){
    t.nonNull.field("loginUser",{
      type: "User",
      description: "Login a user",
      args:{
        email: nonNull(stringArg()),
        password: nonNull(stringArg())
      },
      resolve: async (_, args) =>{
        const user = await UserModel.findOne({email: args.email})

        if(!user) throw new ApolloError("User does not exist", "USER_DOES_NOT_EXIST")
        else if(!bcrypt.compare(args.password, user.password))
          throw new ApolloError("Incorrect password", "INCORRECT_PASSWORD")

        const JWT_SECRET = process.env.JWT_SECRET
        if(!JWT_SECRET) throw new ApolloError("JWT_SECRET envronment variable not set!", "JWT_SECRET_UNDEFINED")

        const token = jwt.sign({id: user._id, email: args.email}, JWT_SECRET)
        user.token = token

        return user
      }
    })
  }
})
