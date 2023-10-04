import React, { useState } from 'react';

//Components
import ScaleGoal from './ScaleGoal';
import ScaleSlider from './ScaleSlider';
import WritingSpace  from "./WritingSpace";

//third party libraries
import { Draggable } from 'react-beautiful-dnd';

//SVG
import ExplanationIconClosed from "../icons/explanationIconClosed.svg";
import ExplanationIconOpened from "../icons/explanationIconOpened.svg";
import DeleteIcon from "../icons/deleteIcon.svg";
import DragDropIcon from '../icons/dragDropIcon.svg';

export interface ScaleType{
    id: string
    index: number
    goal: string
    sliderValue: number
    chasingSuccessDescription: string
    avoidingFailureDescription: string
    onDelete: (scaleID: string) => void 
}
const Scale = (props: ScaleType) => {
    const [writingSpaceVisible, setWritiingSpaceVisible] = useState<boolean>(false)

    const handleWritingSpace = () =>{ //makes writing space visble or removes it
        setWritiingSpaceVisible(!writingSpaceVisible)
    }

    return (
        <Draggable key={props.id} draggableId={"draggable-"+props.id} index={props.index}>
            {(provided: any, snapshot: any) => (//!FIX ANY
                <div className="scale" ref={provided.innerRef} {...provided.draggableProps} style={{ ...provided.draggableProps.style, boxShadow: snapshot.isDragging? "0 5px 5px #0000007e": null}}>
                    <div className="scale__header">
                        <div {...provided.dragHandleProps}>
                            <img src={DragDropIcon} alt="Drag and Drop Tool"/> 
                        </div>
                        <ScaleGoal id={props.id} goal={props.goal}/>
                        <div className="scale__header__container">
                            <div className="scale__header__icon">
                                {
                                    writingSpaceVisible !== true 
                                        ? <img src={ExplanationIconClosed} alt="Explanation Button (Closed)" onClick={handleWritingSpace}/>
                                        : <img src={ExplanationIconOpened} alt="Explanation Button (Opened)" onClick={handleWritingSpace}/>
                                }
                            </div>
                            <div className="scale__header__icon">
                                <img src={DeleteIcon} alt="Delete Button" onClick={()=>props.onDelete(props.id)}/>
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
