import React, { useState } from 'react';

//Components
import ScaleTitle from './ScaleTitle';
import ScaleSlider from './ScaleSlider';
import WritingSpace  from "./WritingSpace";

//third party libraries
import { Draggable } from 'react-beautiful-dnd';

//SVG
import ExplanationIconClosed from "./icons/ExplanationIconClosed";
import ExplanationIconOpened from "./icons/ExplanationIconOpened";
import DeleteIcon from "./icons/DeleteIcon";
import DragDropIcon from './icons/DragDropIcon';

interface Props{
    scaleID: string
    index: number
    onDelete: (scaleID: string) => void 
}

const Scale: React.FC<Props> = ({scaleID, index, onDelete}) => {
    const [writingSpaceVisible, setWritiingSpaceVisible] = useState<boolean>(false)

    const handleWritingSpace = () =>{ //makes writing space visble or removes it
        setWritiingSpaceVisible(!writingSpaceVisible)
    }

    return (
        <Draggable key={scaleID} draggableId={"draggable-"+scaleID} index={index}>
            {(provided: any, snapshot: any) => (//!FIX ANY
                <div className="scale" ref={provided.innerRef} {...provided.draggableProps} style={{ ...provided.draggableProps.style, boxShadow: snapshot.isDragging? "0 5px 5px #0000007e": null}}>
                    <div className="scale__header">
                        <div {...provided.dragHandleProps}>
                            <DragDropIcon alt="Drag and Drop Tool"/> 
                        </div>
                        <ScaleTitle scaleID={scaleID}/>
                        <div className="scale__header__container">
                            <div className="scale__header__icon">
                                {
                                    writingSpaceVisible !== true 
                                        ? <ExplanationIconClosed alt="Explanation Button (Closed)" onClick={handleWritingSpace}/>
                                        : <ExplanationIconOpened alt="Explanation Button (Opened)" onClick={handleWritingSpace}/>
                                }
                            </div>
                            <div className="scale__header__icon">
                                <DeleteIcon alt="Delete Button" onClick={()=>onDelete(scaleID)}/>
                            </div>
                        </div>
                    </div>
                    <ScaleSlider scaleID={scaleID}/>
                    <WritingSpace scaleID={scaleID} visible={writingSpaceVisible}/>
                </div>
            )}
         </Draggable>
    )
}
export default Scale
