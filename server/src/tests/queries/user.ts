const UserQueries = {
  REGISTER_USER: `
    mutation registerUser(
      $email: String!
      $password: String!
    ) {
      registerUser(
        email: $email
        password: $password
      ) {
        id
        email
        password
        token
      }
    }
  `,
  LOGIN_USER: `
    mutation loginUser($email: String!, $password: String!){
      loginUser(email: $email, password: $password){
        id
        email
        password
        token
      }
    }
  `
}
export default UserQueries
