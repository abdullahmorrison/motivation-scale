import React, { useState } from 'react';
import ScaleTitle from './ScaleTitle';
import ScaleSlider from './ScaleSlider';
import WritingSpace  from "./WritingSpace";

//SVG
import ExplanationIconClosed from "./icons/ExplanationIconClosed";
import ExplanationIconOpened from "./icons/ExplanationIconOpened";
import DeleteIcon from "./icons/DeleteIcon";
import DragDropIcon from './icons/DragDropIcon';

interface Props{
    scaleID: string
    onDelete: (scaleID: string) => void 
}

const Scale: React.FC<Props> = ({scaleID, onDelete}) => {
    const [writingSpaceVisible, setWritiingSpaceVisible] = useState<boolean>(false)

    const handleWritingSpace = () =>{ //makes writing space visble or removes it
        setWritiingSpaceVisible(!writingSpaceVisible)
    }

    return (
        <div className="scale">
            <div className="scale__header">
                <DragDropIcon style={{cursor: 'not-allowed'}} alt="Drag and Drop Tool"/> 
                <ScaleTitle scaleID={scaleID}/>
                <div className="scale__header__container">
                    {
                        writingSpaceVisible !== true 
                            ? <ExplanationIconClosed alt="Explanation Button (Closed)" onClick={handleWritingSpace}/>
                            : <ExplanationIconOpened alt="Explanation Button (Opened)" onClick={handleWritingSpace}/>
                    }
                    <DeleteIcon alt="Delete Button" onClick={()=>onDelete(scaleID)}/>
               </div>
            </div>
            <ScaleSlider scaleID={scaleID}/>
            <WritingSpace scaleID={scaleID} visible={writingSpaceVisible}/>
        </div>
    )
}
export default Scale
