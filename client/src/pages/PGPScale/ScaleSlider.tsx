import React, { useState, useEffect } from 'react';

interface Props{
    scaleID: string
}

const ScaleSlider: React.FC<Props> = ({scaleID}) => {
    const [sliderValue, setSliderValue] = useState<number>(50)
    
    useEffect(()=>{
        const fetchSliderValue = async () =>{
            //fetching the saved scales from the backend
           const response = await fetch('/scales/'+scaleID)
           const data = await response.json()
           if(data.sliderValue){
                setSliderValue(data.sliderValue)
           }
        }
        fetchSliderValue()
    }, [scaleID])

    const changeSliderValue = async (value: number) =>{
        await fetch('/scales/'+scaleID+'/slidervalue',{
            method: 'PATCH',
            body: JSON.stringify({sliderValue: value}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        setSliderValue(value)
    }

    return (
        <div className="scale__slider">
            <input
                type="range"
                className="scale__slider__range"
                min="0" max="100" 
                defaultValue = {sliderValue}
                onChange = {(event) => changeSliderValue(+(event.target as HTMLInputElement).value)}
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
