import React, { useState, useEffect } from 'react';
import ScaleTitle from './ScaleTitle';
import ScaleSlider from './ScaleSlider';
import WritingSpace  from "./WritingSpace";

//SVG
import ExplanationIconClosed from "./icons/ExplanationIconClosed";
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
                <ExplanationIconClosed alt="Explanation Button (Closed)" onClick={handleWritingSpace}/>
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
