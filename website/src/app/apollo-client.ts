import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client'

const httpLink = createHttpLink({
    uri: "http://localhost:3001",
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
        order
      }
    }`
  })

  return data.scales
}
export async function createScale(input: {
  username: string,
  goal: string,
  sliderValue?: number,
  chasingSuccessDescription?: string,
  avoidingFailureDescription?: string,
  order?: number
}){ 
  const { data } = await client.mutate({
    mutation: gql`
      mutation CreateScale($username: String!, $goal: String!, $sliderValue: Int, $chasingSuccessDescription: String, $avoidingFailureDescription: String, $order: Int){
        createScale(username: $username, goal: $goal, sliderValue: $sliderValue, chasingSuccessDescription: $chasingSuccessDescription, avoidingFailureDescription: $avoidingFailureDescription, order: $order) {
            id
            username
            goal
            sliderValue
            chasingSuccessDescription
            avoidingFailureDescription
            order
          }
      }`,
      variables: input
  })

  return data.createScale
}
export async function updateScale(input: {
  id: string,
  goal?: string,
  sliderValue?: number,
  chasingSuccessDescription?: string,
  avoidingFailureDescription?: string,
  order?: number
}){ 
  const { data } = await client.mutate({
    mutation: gql`
      mutation UpdateScale($id: String!, $goal: String, $sliderValue: Int, $chasingSuccessDescription: String, $avoidingFailureDescription: String, $order: Int){
          updateScale(id: $id, goal: $goal, sliderValue: $sliderValue, chasingSuccessDescription: $chasingSuccessDescription, avoidingFailureDescription: $avoidingFailureDescription, order: $order) {
              id
              goal
              sliderValue
              chasingSuccessDescription
              avoidingFailureDescription
              order
          }
      }`,
      variables: input
  })

  return data.updateScale
}