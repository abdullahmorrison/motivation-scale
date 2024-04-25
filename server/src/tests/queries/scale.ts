const ScaleQueries = {
  GET_SCALES:`
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
  CREATE_SCALE:`
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
  UPDATE_SCALE:`
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
