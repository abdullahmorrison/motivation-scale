import React, { useState, useEffect } from 'react';
import ScaleTitle from './ScaleTitle';
import ScaleSlider from './ScaleSlider';
import WritingSpace  from "./WritingSpace";

//SVG
import ExplanationIconClosed from "./icons/ExplanationIconClosed";
import DeleteIcon from "./icons/DeleteIcon";

const Scale = props => {
    const [writingSpaceVisible, setWritiingSpaceVisible] = useState(false)

    const handleWritingSpace = () =>{ //makes writing space visble or removes it
        setWritiingSpaceVisible(!writingSpaceVisible)
    }

    useEffect(()=>{
        return ()=>{
            //removing explanation and future plan data
            localStorage.removeItem("scaleExplanation-"+props.scaleID)
            localStorage.removeItem("scaleFuturePlan-"+props.scaleID)
        }
    })
    
    return (
        <div className="scale">
            <div className="scale__header">
                <ScaleTitle scaleID={props.scaleID}/>
                <ExplanationIconClosed alt="Explanation Button (Closed)" onClick={handleWritingSpace}/>
                <DeleteIcon alt="Delete Button"  onClick={()=>props.onDelete(props.scaleID)}/> 
            </div>
            <ScaleSlider scaleID={props.scaleID}/>
            {
                writingSpaceVisible === true ? <WritingSpace scaleID={props.scaleID}/>: null
            }
        </div>
    )
}
export default Scale
