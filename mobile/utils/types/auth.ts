export type AuthUser = {
  id: string
  email: string
  password: string
  token: string
}

export type AuthInput = {
  email: string
  password: string
}

export const emptyAuthInput = {
  email: "",
  password: ""
}
