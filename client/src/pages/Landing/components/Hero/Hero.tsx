import Nav from './Nav'
import CallToAction from './CallToAction'
import MotivationSource from './MotivationSource.svg'
import ScaleAnimation from './ScaleAnimation'

const Hero = () =>{
    return(
        <>
            <Nav/>
            <div>
                <CallToAction/>
                <img src={MotivationSource} alt="Motivation Source" />
            </div>
            <ScaleAnimation/>
        </>
    )
}
export default Hero