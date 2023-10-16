import { useState } from 'react';

//Components
import ScaleGoal from '../scale-goal/ScaleGoal';
import ScaleSlider from '../scale-slider/ScaleSlider';
import WritingSpace  from "../writing-space/WritingSpace";

//third party libraries
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

//Styles & SVG
import styles from './scale.module.scss'
import Image from 'next/image';
import ExplanationIconClosed from '../../../assets/icons/explanationIconClosed.svg'
import ExplanationIconOpened from "../../../assets/icons/explanationIconOpened.svg";
import DeleteIcon from "../../../assets/icons/deleteIcon.svg";
import DragDropIcon from '../../../assets/icons/dragDropIcon.svg';

export interface ScaleType{
    id: string
    index: number
    order?: number
    goal: string
    sliderValue: number
    chasingSuccessDescription: string
    avoidingFailureDescription: string
    onEdit: (id: string) => void
    onDelete: (scaleID: string) => void 
}
const Scale = (props: ScaleType) => {
    const [writingSpaceVisible, setWritingSpaceVisible] = useState<boolean>(false)

    return (
        <Draggable key={props.id} draggableId={"draggable-"+props.id} index={props.index}>
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                <div className={styles.scale} ref={provided.innerRef} {...provided.draggableProps} style={{ ...provided.draggableProps.style, boxShadow: snapshot.isDragging? "0 5px 5px #0000007e": null}}>
                    <div className={styles.header}>
                        <div {...provided.dragHandleProps} className={styles.dragHandle}>
                            <Image src={DragDropIcon} alt="Drag and Drop Tool"/> 
                        </div>
                        <h2>{props.goal}</h2>
                        <div className={styles.headerIconContainer}>
                            <div className={styles.headerIcon}>
                                <Image 
                                    src={ExplanationIconClosed} 
                                    alt={"Explanation Button (Closed)"} 
                                    onClick={()=>props.onEdit(props.id)}
                                />
                            </div>
                            <div className={styles.headerIcon} onClick={()=>props.onDelete(props.id)}>
                                <Image src={DeleteIcon} alt="Delete Button"/>
                            </div>
                        </div>
                    </div>
                    <ScaleSlider id={props.id} sliderValue={props.sliderValue}/>
                    <WritingSpace 
                        id={props.id} 
                        isVisible={writingSpaceVisible}
                        avoidingFailureDescription={props.avoidingFailureDescription}
                        chasingSuccessDescription={props.chasingSuccessDescription}
                    />
                </div>
            )}
         </Draggable>
    )
}
export default Scale
