import { useState, useEffect } from 'react';
import styles from './scaleSlider.module.scss'

interface ScaleSliderProps{
    id: string
    sliderValue: number
}

const ScaleSlider = (props: ScaleSliderProps) => {
    const [sliderValue, setSliderValue] = useState<number>(50)
    
    useEffect(()=>{
    }, [])

    const changeSliderValue = async (value: number) =>{
        setSliderValue(value)
    }

    return (
        <div className="scale__slider">
            <input
                type="range"
                className="scale__slider__range"
                min="0" max="100" 
                defaultValue = {props.sliderValue}
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
