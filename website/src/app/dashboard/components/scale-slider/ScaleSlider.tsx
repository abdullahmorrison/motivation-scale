import styles from './scaleSlider.module.scss'
import { updateScaleSlider } from '@/app/apollo-client';

interface ScaleSliderProps{
    id: string
    sliderValue: number
}
const ScaleSlider = (props: ScaleSliderProps) => {
    return (
        <div className={styles.slider}>
            <input
                type="range"
                className={styles.sliderRange}
                min="0" max="100" 
                defaultValue = {props.sliderValue}
                onMouseUp={(event) => updateScaleSlider({ id: props.id, sliderValue: parseInt(event.currentTarget.value)})}
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
