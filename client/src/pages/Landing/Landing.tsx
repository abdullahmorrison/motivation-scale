import Nav from './components/Nav'
import Hero from './components/Hero/Hero'

import './landing.module.css'

// import { useHistory } from 'react-router-dom';

const Landing = () => {
    // const history = useHistory(); //for react router

    return (
        <body>
            <Nav/>
           <Hero/> 
        </body>
    )
}
export default Landing