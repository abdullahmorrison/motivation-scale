import React, { useState, useEffect } from 'react';
import ScaleTitle from './ScaleTitle';
import ScaleSlider from './ScaleSlider';
import WritingSpace  from "./WritingSpace";

//SVG
import ExplanationIconClosed from "./icons/ExplanationIconClosed";
import ExplanationIconOpened from "./icons/ExplanationIconOpened";
import DeleteIcon from "./icons/DeleteIcon";

const Scale = ({scaleID, onDelete}) => {
    const [writingSpaceVisible, setWritiingSpaceVisible] = useState(false)

    const handleWritingSpace = () =>{ //makes writing space visble or removes it
        setWritiingSpaceVisible(!writingSpaceVisible)
    }

    return (
        <div className="scale">
            <div className="scale__header">
                <ScaleTitle scaleID={scaleID}/>
                {
                    writingSpaceVisible !== true 
                        ? <ExplanationIconClosed alt="Explanation Button (Closed)" onClick={handleWritingSpace}/>
                        : <ExplanationIconOpened alt="Explanation Button (Opened)" onClick={handleWritingSpace}/>
                }
               <DeleteIcon alt="Delete Button" onClick={()=>onDelete(scaleID)}/> 
            </div>
            <ScaleSlider scaleID={scaleID}/>
            {
                writingSpaceVisible === true ? <WritingSpace scaleID={scaleID}/>: null
            }
        </div>
    )
}
export default Scale
