import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from "@apollo/client/link/context"

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
})

//sending auth token with every server reqest
const authLink = setContext((_, { headers })=>{
  const token = localStorage.getItem("token")

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
