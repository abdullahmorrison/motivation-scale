import { objectType, nonNull, stringArg } from "nexus"
import { UserModel } from "../../models/user"

export const User = objectType({
    name: "User",
    definition(t) {
        t.nonNull.id("id");
        t.nonNull.string("username");
    }
})

export const UserQuery = objectType({
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

export const UserMutation = objectType({
    name: "Mutation",
    definition(t) {
        t.nonNull.field("createUser", {
            type: "User",
            description: "Create a new user", 
            args: {
                username: nonNull(stringArg()),
            },
            resolve: async (_, args) => {
                const user = new UserModel(args)

                const response = await user.save()
                return {
                    id: response._id,
                    ...user.toObject()
                }
            }
        })
    }
})
