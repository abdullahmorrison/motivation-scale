import { jwtDecode } from "jwt-decode"
import { createContext, useReducer } from "react"
import storage from "../Storage"

let initialState: any = {
  user: null
}
if (typeof localStorage !== 'undefined'){
  const token = localStorage.getItem("token")
  if(token){
    const decodedToken = jwtDecode(token)
    initialState.user = decodedToken
  }
}

export const AuthContext = createContext({
  user: null,
  login: (userData: any)=>{},
  logout: ()=>{}
})

function authReducer(state: any, action: any){
  switch(action.type){
    case "LOGIN":
      return {
        ...state,
        user: action.payload
      }
    case "LOGOUT":
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}

export default function AuthProvider({children}: any){
  const [state, dispatch] = useReducer(authReducer, initialState)

  function login(userData: any){
    storage.save({key: "token", data: userData.token })
    storage.save({key: "app-opened", data: true })
    dispatch({
      type: "LOGIN",
      payload: userData
    })
  }
  function logout(){
    storage.remove({key: "token"})
    dispatch({type: "LOGOUT"})
  }

  return (
    <AuthContext.Provider value={{user: state.user, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}
