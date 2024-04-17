import { GraphQLError } from "graphql"

interface ErrorType {
  defaultMessage: string,
  code: string,
  status: number
}

export const ERROR_LIST:{[key: string]: ErrorType} = {
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

export default (error:  ErrorType, customErrorMessage?: string) =>{
  throw new GraphQLError(customErrorMessage || error.defaultMessage, {
    extensions: {
      code: error.code,
      status: error.status
    }
  })
}
