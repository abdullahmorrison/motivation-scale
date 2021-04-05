import React, { useState, useEffect } from 'react';

const ScaleSlider = ({scaleID}) => {
    const [sliderValue, setSliderValue] = useState(50)
    
    useEffect(()=>{
         //!FETCHING TWICE
         fetch('http://localhost:3001/api/scales')
         .then(res => res.json())
         .then(scales =>  {
                 //looping through each object to find the id that corresponds the componenet's parent id
                 for (var i=0; i < scales.length; i++){
                    //adding the slider value to the state if it exists
                    if (scales[i].id === scaleID && scales[i].sliderValue){
                        setSliderValue(scales[i].sliderValue)
                    }
                 }
             }
         )
        // return localStorage.removeItem("sliderValue-"+scaleID)
    },[scaleID])

    const changeSliderValue = (value) =>{
        setSliderValue(value)
        localStorage.setItem("sliderValue-"+scaleID, JSON.stringify(value))
    }

    return (
        <div className="scale__slider">
            <input
                type="range"
                className="scale__slider__range"
                min="0" max="100" 
                defaultValue = {sliderValue}
                onChange = {(event) => changeSliderValue(event.target.value)}
            />
            <div className="scale__slider__ticks">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <ul className="scale__slider__labels">
                <li>Saving What You Can</li>
                <li>Avoiding Failure</li>
                <li>Stagnant</li>
                <li>Chasing Success</li>
                <li>Upgrading Your Goal</li>
            </ul>
        </div>
    )
}
export default ScaleSlider
