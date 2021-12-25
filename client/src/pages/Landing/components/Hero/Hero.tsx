import Nav from './Nav'
import CallToAction from './CallToAction'
import MotivationSource from './MotivationSource'
import ScaleAnimation from './ScaleAnimation'
const Hero = () =>{
    return(
        <>
            <Nav/>
            <div>
                <CallToAction/>
                <MotivationSource/>
            </div>
            <ScaleAnimation/>
        </>
    )
}
export default Hero