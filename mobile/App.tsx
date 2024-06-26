<<<<<<< Updated upstream
import { AppRegistry } from "react-native"
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client"
import RootComponent from "./RootComponent"
=======
import { AppRegistry } from 'react-native'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client"
import RootComponent from "./RootComponent"
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LoginScreen from './Auth/Login'
import SignupScreen from './Auth/Signup'
import SplashScreen from "./SplashScreen"
import { setContext } from "@apollo/client/link/context"
import storage from './Storage'

const httpLink = createHttpLink({
  uri: "http://localhost:3001/",
})
>>>>>>> Stashed changes

//sending auth token with every server reqest
const authLink = setContext((_, { headers })=>{
  const token = storage.load({key: "token"})

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const Stack = createNativeStackNavigator()
export default function App() {
    return (
        <ApolloProvider client={client}>
            <RootComponent />
        </ApolloProvider>
    )
}
AppRegistry.registerComponent('MotivationScale', () => App)
