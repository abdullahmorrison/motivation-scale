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
import { screens } from './screens'
import AuthProvider from './context/authContext'
import UserAccount from './UserAccount'
import { GestureHandlerRootView } from "react-native-gesture-handler"
import variables from './styles.variables'

const httpLink = createHttpLink({
  uri: process.env.EXPO_PUBLIC_SERVER_URL,
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthProvider>
          <ApolloProvider client={client}>
            <Stack.Navigator screenOptions={{headerShown: false, navigationBarColor: variables.background}}>
              <Stack.Screen name={screens.SplashScreen} component={SplashScreen} />
              <Stack.Screen name={screens.Signup} component={SignupScreen} />
              <Stack.Screen name={screens.Login} component={LoginScreen} />
              <Stack.Screen name={screens.Dashboard} component={RootComponent} />
              <Stack.Screen name={screens.MutateScale} component={MutateScale} />
              <Stack.Screen name={screens.UserAccount} component={UserAccount} />
            </Stack.Navigator>
          </ApolloProvider>
        </AuthProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
    )
}
AppRegistry.registerComponent('MotivationScale', () => App)
