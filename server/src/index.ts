import { ApolloServer } from "apollo-server"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"

import { schema } from "./schema"
export const server = new ApolloServer({ 
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})

const port = process.env.PORT || 4000
server.listen({ port }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})