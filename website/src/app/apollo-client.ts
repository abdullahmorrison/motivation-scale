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
export async function updateScaleSlider(input: { id: string, sliderValue: number }) {
  const { data } = await client.mutate({
    mutation: gql
    `mutation UpdateScale($id: String!, $sliderValue: Int){
      updateScale(id: $id, sliderValue: $sliderValue) {
        goal
        sliderValue
      }
    }`
    , variables: input
  })
                          
  return {
    props: {
      updateScale: data.updateScale,
    }
  }
}