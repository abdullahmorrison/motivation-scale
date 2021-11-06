import ReactDOM from 'react-dom';
import Landing from './pages/Landing/Landing';
import PGPScale from './pages/PGPScale/PGPScale';
import NotFound from './pages/404Page/NotFound';
import InDevelopmentBanner from './pages/InDevelopmentBanner/InDevelopmentBanner'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(
    <Router>
        <InDevelopmentBanner/>
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/pgpscale" component={PGPScale}/>
            <Route exact path="*" component={NotFound} />
        </Switch>
    </Router>, 
document.getElementById('root'));