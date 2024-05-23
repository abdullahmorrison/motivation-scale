import { useState } from 'react';
import parse from 'html-react-parser';
  
//Components
import ScaleSlider from '../scale-slider/ScaleSlider';

//third party libraries
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

//Styles & SVG
import styles from './scale.module.scss'
import Image from 'next/image';
import EditIcon from "../../../assets/icons/editIcon.svg"
import DragDropIcon from '../../../assets/icons/dragDropIcon.svg';

export interface ScaleType{
    id: string
    index: number
    goal: string
    sliderValue: number
    chasingSuccessDescription: string
    avoidingFailureDescription: string
    onEdit: (scaleID: string) => void 
}
const Scale = (props: ScaleType) => {
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
                            <Image src={DragDropIcon} alt="Drag and Drop Tool"/> 
                        </div>
                        <h2>{props.goal}</h2>
                        <div className={styles.headerIconContainer}>
                            <div className={styles.headerIcon} onClick={()=>props.onEdit(props.id)}>
                                <Image src={EditIcon} alt="Edit Button"/>
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
