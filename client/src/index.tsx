import ReactDOM from 'react-dom';
import Landing from './pages/Landing/Landing';
import PGPScale from './pages/PGPScale/PGPScale';
import {BrowserRouter as Router, Route} from 'react-router-dom';

ReactDOM.render(
    <Router>
        <Route path="/" exact component={Landing}/>
        <Route path="/pgpscale" component={PGPScale}/>
    </Router>, 
document.getElementById('root'));