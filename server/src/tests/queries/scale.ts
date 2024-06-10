const ScaleQueries = {
  GET_SCALES:`
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
  CREATE_SCALE:`
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
  UPDATE_SCALE:`
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
  `
}
export default ScaleQueries
