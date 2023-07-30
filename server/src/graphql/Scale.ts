import { objectType, extendType, nonNull, stringArg, intArg, idArg } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen"

export const Scale = objectType({
    name: "Scale",
    definition(t) {
        t.nonNull.id("id");
        t.nonNull.string("goal");
        t.nonNull.int("sliderValue");
        t.nullable.string("chasingSuccessDescription");
        t.nullable.string("avoidingFailureDescription");
    },
})

let scales:  NexusGenObjects["Scale"][] = [
    {
        id: "1",
        goal: "I want to be a better person",
        sliderValue: 0,
        chasingSuccessDescription: "I want to be a better person",
        avoidingFailureDescription: "I don't want to be a bad person",
    },
    {
        id: "2",
        goal: "I want to be a better person",
        sliderValue: 0,
        chasingSuccessDescription: "I want to be a better person",
        avoidingFailureDescription: "I don't want to be a bad person",
    }
]

export const ScaleQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("scales", {
            type: "Scale",
            resolve(parent, args, context, info) {
                return scales;
            }
        });
    }
})

export const ScaleMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createScale", {
            type: "Scale",
            args: {
                id: nonNull(idArg()),
                goal: nonNull(stringArg()),
                sliderValue: nonNull(intArg()),
                chasingSuccessDescription: stringArg(),
                avoidingFailureDescription: stringArg(),
            },
            resolve(parent, args, context) {
                const scale = {
                    id: args.id,
                    goal: args.goal,
                    sliderValue: args.sliderValue? args.sliderValue : 50,
                    chasingSuccessDescription: args.chasingSuccessDescription,
                    avoidingFailureDescription: args.avoidingFailureDescription,
                }

                scales.push(scale)
                return scale
            }
        })
    }
})
