import { gql } from "@apollo/client"

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!){
    loginUser(email: $email, password: $password){
      id
      email
      password
      token
    }
  }
`
export const REGISTER_USER = gql`
  mutation registerUser( $email: String! $password: String!) {
    registerUser( email: $email password: $password) {
      id
      email
      password
      token
    }
  }
`
