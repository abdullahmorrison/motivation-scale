import { AppRegistry } from 'react-native'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client"
import RootComponent from "./RootComponent"
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LoginScreen from './Auth/Login'
import SignupScreen from './Auth/Signup'
import SplashScreen from "./SplashScreen"
import MutateScale from './MutateScale'
import { setContext } from "@apollo/client/link/context"
import storage from './Storage'
import { SERVER_URL } from '@env'
import { screens } from './screens'
import AuthProvider from './context/authContext'

const httpLink = createHttpLink({
  uri: SERVER_URL,
})

//sending auth token with every server reqest
const authLink = setContext(async (_, { headers }) => {
  const token = await storage.load({ key: "token" })
  .catch(()=>null)//make token null if token not found in storage

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
      <NavigationContainer>
        <AuthProvider>
          <ApolloProvider client={client}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name={screens.SplashScreen} component={SplashScreen} />
              <Stack.Screen name={screens.Signup} component={SignupScreen} />
              <Stack.Screen name={screens.Login} component={LoginScreen} />
              <Stack.Screen name={screens.Dashboard} component={RootComponent} />
              <Stack.Screen name={screens.MutateScale} component={MutateScale} />
            </Stack.Navigator>
          </ApolloProvider>
        </AuthProvider>
      </NavigationContainer>
    )
}
AppRegistry.registerComponent('MotivationScale', () => App)
