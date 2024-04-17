import { objectType, nonNull, stringArg, extendType } from "nexus"
import { UserModel } from "../models/user"
import throwCustomError, { ERROR_LIST } from '../utils/error-handler.helper'
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
                if(oldUser) throwCustomError(ERROR_LIST.ALREADY_EXISTS, "User already exists")

                if(!isEmailValid(args.email)) throwCustomError(ERROR_LIST.BAD_USER_INPUT, "Invalid email")

                const encryptedPassword = await bcrypt.hash(args.password, 10)

                const JWT_SECRET: string = process.env.JWT_SECRET //JWT_SECRET not set up, throw error
                  || throwCustomError(ERROR_LIST.INTERNAL_SERVER_ERROR, "Failed to set JWT secret")

                const newUser: any = new UserModel({ //`any` used to allow adding token
                  ...args,
                  password: encryptedPassword
                })
                newUser.token = jwt.sign({id: newUser._id, email: args.email}, JWT_SECRET)

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

        if(!user) throwCustomError(ERROR_LIST.AUTHENTICATION_FAILED, `User with email: ${args.email}, does not exist`)
        else if(!bcrypt.compare(args.password, user.password))
          throwCustomError(ERROR_LIST.AUTHENTICATION_FAILED, "Incorrect password")

        const JWT_SECRET: string = process.env.JWT_SECRET //JWT_SECRET not set up, throw error
          || throwCustomError(ERROR_LIST.INTERNAL_SERVER_ERROR, "Failed to set JWT secret")

        user.token = jwt.sign({id: user._id, email: args.email}, JWT_SECRET)

        return user
      }
    })
  }
})
