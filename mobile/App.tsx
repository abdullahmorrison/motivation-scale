import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client"
import RootComponent from "./RootComponent"
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './Auth/Login';
import SignupScreen from './Auth/Signup';
import SplashScreen from "./SplashScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    const httpLink = createHttpLink({
        uri: "https://motivationscale.up.railway.app",
    })
    const client = new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache()
    })

    return (
      <NavigationContainer>
        <ApolloProvider client={client}>
          <Stack.Navigator>
            <Stack.Screen name="Splash Screen" component={SplashScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Dashboard" component={RootComponent} />
          </Stack.Navigator>
        </ApolloProvider>
      </NavigationContainer>
    )
}
