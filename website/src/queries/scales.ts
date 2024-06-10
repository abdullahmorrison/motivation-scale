import { gql } from "@apollo/client"

const ScaleQueries = {
  GET_SCALES: gql`
    query GetScales{
      scales{
        id
        userId
        goal
        sliderValue
        chasingSuccessDescription
        avoidingFailureDescription
      }
    }
  `,
  CREATE_SCALE: gql`
    mutation CreateScale(
      $goal: String!
      $sliderValue: Int
      $chasingSuccessDescription: String
      $avoidingFailureDescription: String
    ) {
      createScale(
        goal: $goal
        sliderValue: $sliderValue
        chasingSuccessDescription: $chasingSuccessDescription
        avoidingFailureDescription: $avoidingFailureDescription
      ) {
        id
        userId
        goal
        sliderValue
        chasingSuccessDescription
        avoidingFailureDescription
      }
    }
  `,
  UPDATE_SCALE: gql`
    mutation UpdateScale(
      $id: String!
      $goal: String
      $sliderValue: Int
      $chasingSuccessDescription: String
      $avoidingFailureDescription: String
    ) {
      updateScale(
        id: $id
        goal: $goal
        sliderValue: $sliderValue
        chasingSuccessDescription: $chasingSuccessDescription
        avoidingFailureDescription: $avoidingFailureDescription
      ) {
        id
        goal
        userId
        sliderValue
        chasingSuccessDescription
        avoidingFailureDescription
      }
    }
  `,
  DELETE_SCALE: gql`
    mutation DeleteScale(
      $id: String!
    ){
      deleteScale(
        id: $id
      ){
        id
        userId
      }
    }
  `
}
export default ScaleQueries
