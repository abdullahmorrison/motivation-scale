import React, { useState, useEffect } from 'react';

const ScaleSlider = props => {
    const [sliderValue, setSliderValue] = useState(50)
    
    useEffect(()=>{
        //*compoenentDidMount
        //adding the saved scales from local storage to state
        const sliderValue = JSON.parse(localStorage.getItem("sliderValue-"+props.scaleID))
        if(sliderValue){ //if you can't find the item on local storage
            setSliderValue(sliderValue)
        }
        //*componentWillUnmount
        return localStorage.removeItem("sliderValue-"+props.scaleID)
    },[props.scaleID])

    const changeSliderValue = (value) =>{
        setSliderValue(value)
        localStorage.setItem("sliderValue-"+props.scaleID, JSON.stringify(value))
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
