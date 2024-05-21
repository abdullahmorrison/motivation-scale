import styles from './scaleSlider.module.scss'
import { useMutation } from '@apollo/client';
import ScaleQueries from '@/queries/scales';
import useStateDebounced from  '@/hooks/useStateDebounced'
import { useContext } from 'react';
import { AuthContext } from '@/context/authContext';

interface ScaleSliderProps{
    id: string
    sliderValue: number
}

const ScaleSlider = (props: ScaleSliderProps) => {
    const [_, debouncedSliderValue, setSliderValue] = useStateDebounced<number>(props.sliderValue, 500,
      ()=> editScale({variables: {userId: user.id, id: props.id, sliderValue: debouncedSliderValue}})
    )
    const { user }: any = useContext(AuthContext)

    const [editScale] = useMutation(ScaleQueries.UPDATE_SCALE)

    return (
        <div className={styles.slider}>
            <input
                type="range"
                className={styles.sliderRange}
                min="0" max="100" 
                defaultValue = {props.sliderValue}
                onChange= {(event) => setSliderValue(+(event.target as HTMLInputElement).value)}
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
