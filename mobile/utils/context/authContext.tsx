import { jwtDecode } from "jwt-decode"
import { createContext, useEffect, useReducer } from "react"
import storage from "../Storage"

let initialState: any = {
  user: null
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

  useEffect(()=>{
    storage.load({ key: "token" }).then((token)=>{
      const decodedToken = jwtDecode(token)
      dispatch({ type: "LOGIN", payload: decodedToken})
    }).catch((e)=>{console.log("failed to load storage: "+e)})
  }, [])

  function login(userData: any){
    storage.save({key: "token", data: userData.token })
    .catch(()=>console.log("failed to SAVE token"))
    dispatch({ type: "LOGIN", payload: userData })
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
