import { GraphQLError } from "graphql"
import { ApolloServerErrorCode } from '@apollo/server/errors';

interface ErrorType {
  defaultMessage: string,
  code: string,
  status: number
}
interface ErrorList{
  ALREADY_EXISTS: ErrorType,
  AUTHENTICATION_FAILED: ErrorType,
  BAD_USER_INPUT: ErrorType,
  INTERNAL_SERVER_ERROR: ErrorType,
  FORBIDDEN: ErrorType,
  NOT_FOUND: ErrorType
}

export const ERROR_LIST: ErrorList = {
  ALREADY_EXISTS:{
    defaultMessage: 'Item already exists',
    code: 'ALREADY_EXISTS',
    status: 400
  },
  AUTHENTICATION_FAILED:{
    defaultMessage: 'Authentication failed',
    code: 'AUTHENTICATION_FAILED',
    status: 401
  },
  BAD_USER_INPUT: {
    defaultMessage: "Bad user input",
    code: ApolloServerErrorCode.BAD_USER_INPUT,
    status: 400
  },
  INTERNAL_SERVER_ERROR:{
    defaultMessage: "Server failed action",
    code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
    status: 500
  },
  FORBIDDEN:{
    defaultMessage: 'Unauthorized action',
    code: 'FORBIDDEN',
    status: 400
  },
  NOT_FOUND:{
    defaultMessage: 'Data not found',
    code: 'NOT_FOUND',
    status: 404
  }
}

export default (error: ErrorType, customErrorMessage?: string) =>{
  throw new GraphQLError(customErrorMessage || error.defaultMessage, {
    extensions: {
      code: error.code,
      status: error.status
    }
  })
}
