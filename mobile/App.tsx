import { AppRegistry } from "react-native"
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client"
import RootComponent from "./RootComponent"

export default function App() {
    const httpLink = createHttpLink({
        uri: "https://motivationscale.up.railway.app",
    })
    const client = new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache()
    })

    return (
        <ApolloProvider client={client}>
            <RootComponent />
        </ApolloProvider>
    )
}
