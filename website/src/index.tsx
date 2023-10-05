import ReactDOM from 'react-dom';
import Landing from './pages/Landing/Landing';
import PGPScale from './pages/PGPScale/PGPScale';
import NotFound from './pages/404Page/NotFound';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import '.index.css'

const httpLink = createHttpLink({
    uri: "https://motivationscale.up.railway.app",
})
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <Switch>
                <Route exact path="/" component={Landing}/>
                <Route exact path="/pgpscale" component={PGPScale}/>
                <Route exact path="*" component={NotFound} />
            </Switch>
        </Router>
    </ApolloProvider>, 
document.getElementById('root'));