import { gql } from "@apollo/client"

const ScaleQueries = {
  GET_SCALES: gql`
    query GetScales($userId: String!) {
      scales(userId: $userId) {
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
      $userId: String!
      $goal: String!
      $sliderValue: Int
      $chasingSuccessDescription: String
      $avoidingFailureDescription: String
    ) {
      createScale(
        userId: $userId
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
      $userId: String!
      $goal: String
      $sliderValue: Int
      $chasingSuccessDescription: String
      $avoidingFailureDescription: String
    ) {
      updateScale(
        id: $id
        userId: $userId
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
  `
}
export default ScaleQueries
