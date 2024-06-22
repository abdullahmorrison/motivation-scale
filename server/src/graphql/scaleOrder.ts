import { objectType, extendType, nonNull, stringArg, list } from "nexus"
import { ScaleModel } from "../models/scale";
import { ScaleOrderModel } from "../models/scaleOrder";
import { UserModel } from "../models/user";
import throwCustomError, { ERROR_LIST } from '../utils/error-handler.helper'

export const ScaleOrder = objectType({
    name: "ScaleOrder",
    definition(t) {
        t.nonNull.string("userId");
        t.nullable.list.string("scaleOrder")
    },
})

export const reorderScales = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("reorderScales", {
            type: "ScaleOrder",
            description: "Reorder a scale",
            args: {
                scaleOrder: nonNull(list(stringArg()))
            },
            resolve: async (_, args, ctx) => {
                await UserModel.findById(ctx.id) //check user exists
                  .catch(()=> throwCustomError(ERROR_LIST.NOT_FOUND, "User with that id does not exist"))
                const scales = await ScaleModel.find({userId: ctx.id}) //check scale exists
                  .catch(()=> throwCustomError(ERROR_LIST.NOT_FOUND, "Scales with that user id does not exist"))

                for(let scale of scales){
                  if(!args.scaleOrder.includes(scale.id))
                    throwCustomError(ERROR_LIST.FORBIDDEN, "Unauthorized scale reorder")
                }

                return await ScaleOrderModel.findOneAndUpdate(
                    { userId: ctx.id },
                    { $set: { scaleOrder: args.scaleOrder} },
                    { new: true }
                )
            }
        })
    }
})
