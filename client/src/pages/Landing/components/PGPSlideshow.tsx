//components
import Carousel from 'react-multi-carousel';
import SlideShowItem from './pgpSlideShowComponents/slideShowItem';

//packages
import 'react-multi-carousel/lib/styles.css';

//css
import styles from './pgpSlideShow.module.css'

//images
import motivationSourceMeasuring from './pgpSlideShowComponents/images/motivationSourceMeasuring.svg'
import crammingForExam from './pgpSlideShowComponents/images/crammingForExam.svg'
import jumpingForJoy from './pgpSlideShowComponents/images/jumpingForJoy.svg'

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1 
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1 
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1 
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1 
    }
}

const slideShowData = [
  {
    imgSrc: motivationSourceMeasuring,
    imgAltText: "Motivation Source Measuring",
    mainText: "Motivation can either come from a positive source or negative source.",
  },
  {
    imgSrc: crammingForExam,
    imgAltText: "Cramming for an Exam",
    mainText: "Motivation from a negative source comes from anxiety and a fear of failure.",
    example: "Example: Staying up over night to cram for an exam"
  },
  {
    imgSrc: jumpingForJoy,
    imgAltText: "Jumping for Joy",
    mainText: "Motivation from a positive source comes from an excitement to pursue sucess",
    example: "Example: Hitting a milestone with your goal that inspires you to work harder"
  }
]

const PGPSlideshow = () =>{
   return (
       <Carousel className={styles.carousel} containerClass="carousel-container" showDots responsive={responsive}>
         {slideShowData.map((slide)=>
            <SlideShowItem 
              imgSrc={slide.imgSrc} 
              imgAltText={slide.imgAltText}
              mainText={slide.mainText}
              example={slide.example}
            />
         )}
       </Carousel>
   ) 
}
export default PGPSlideshow