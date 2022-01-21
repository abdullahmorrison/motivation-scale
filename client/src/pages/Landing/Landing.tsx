import Nav from './components/Nav'
import Hero from './components/Hero'
import PGPSlideshow from './components/PGPSlideshow'
import PGPExplanation from './components/PGPExplanation'
import PGPDemo from './components/PGPDemo'
import Footer from './components/Footer'

import './landing.module.css'

// import { useHistory } from 'react-router-dom';

const Landing = () => {
    // const history = useHistory(); //for react router

    return (
        <body>
            <Nav/>
            <Hero/> 
            <PGPSlideshow/>
            <PGPExplanation/>
            <PGPDemo/>
            <Footer/>
        </body>
    )
}
export default Landing