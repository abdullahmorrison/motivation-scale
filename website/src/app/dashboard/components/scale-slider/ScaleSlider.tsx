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
        <div className={styles.slider}>
            <input
                type="range"
                className={styles.sliderRange}
                min="0" max="100" 
                defaultValue = {props.sliderValue}
                onChange = {(event) => changeSliderValue(+(event.target as HTMLInputElement).value)}
            />
            <div className={styles.sliderRangeTicks}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <ul className={styles.sliderRangeTickLabels}>
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
