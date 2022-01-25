//components
import Carousel from 'react-multi-carousel';
import SlideShowItem from './pgpSlideShowComponents/slideShowItem';

//packages
import 'react-multi-carousel/lib/styles.css';

//css
import styles from './pgpSlideShow.module.css'

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
    imgSrc: "",
    imgAltText: "",
    mainText: "",
    example: ""
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