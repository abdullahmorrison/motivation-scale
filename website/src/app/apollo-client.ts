import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client'

const httpLink = createHttpLink({
    uri: "https://motivationscale.up.railway.app",
})
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export async function getScales() {
  const { data } = await client.query({
    query: gql`
        {
          scales {
            id
            username
            goal
            sliderValue
            chasingSuccessDescription
            avoidingFailureDescription
          }
        }`
  })

  return {
    props: {
      scales: data.scales,
    },
  }
}