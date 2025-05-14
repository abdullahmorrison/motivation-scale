import { useState } from 'react';
import parse from 'html-react-parser';
  
//Components
import ScaleSlider from '../scale-slider/ScaleSlider';

//third party libraries
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

//Styles
import styles from './scale.module.scss'
import Image from 'next/image';
import type { ScaleData } from '@custom-types/scale';

type ScaleProps = ScaleData & {
    index: number
    onEdit: (scaleID: string) => void 
}
const Scale = (props: ScaleProps) => {
    const [isMetricsVisible, setMetricsVisible] = useState<boolean>(false)

    function renderText(htmlString: string | undefined){
      if(!htmlString) return ""
      return parse(""+htmlString.replaceAll("\n", " <br/> "))
    }

    return (
        <Draggable key={props.id} draggableId={"draggable-"+props.id} index={props.index}>
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                <div className={styles.scale} ref={provided.innerRef} {...provided.draggableProps} style={{ ...provided.draggableProps.style, boxShadow: snapshot.isDragging? "0 5px 5px #0000007e": undefined}}>
                    <div className={styles.header}>
                        <div {...provided.dragHandleProps} className={styles.dragHandle}>
                            <Image src="/icons/dragDropIcon.svg" alt="Drag and Drop Tool" width={25} height={25}/> 
                        </div>
                        <h2>{props.goal}</h2>
                        <div className={styles.headerIconContainer}>
                            <div className={styles.headerIcon} onClick={()=>props.onEdit(props.id)}>
                                <Image src="/icons/editIcon.svg" alt="Edit Button" width={20} height={20}/>
                            </div>
                        </div>
                    </div>
                    <ScaleSlider id={props.id} sliderValue={props.sliderValue}/>

                    <div className={styles.metrics} style={isMetricsVisible? {display:"flex"} : {display:"none"}}>
                        <div>
                            <h3>Chasing Success Metrics</h3>
                            <p>{renderText(props.chasingSuccessDescription)}</p>
                        </div>
                        <div>
                            <h3>Avoiding Failure Metrics</h3>
                            <p>{renderText(props.avoidingFailureDescription)}</p>
                        </div>
                    </div>

                    <div className={styles.dropdown} onClick={()=>setMetricsVisible(!isMetricsVisible)}>{isMetricsVisible ? "▲" : "▼"}</div>
                </div>
            )}
         </Draggable>
    )
}
export default Scale
