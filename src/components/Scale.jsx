import React, { Component } from 'react';
import ScaleTitle from './ScaleTitle';
import ScaleSlider from './ScaleSlider';
import WritingSpace  from "./WritingSpace";

//SVG
import ExplanationIconClosed from "./icons/ExplanationIconClosed";
import DeleteIcon from "./icons/DeleteIcon";

export default class Scale extends Component {

    render() {
        return (
            <div className="scale">
                <div className="scale__header">
                    <ScaleTitle />
                    <ExplanationIconClosed alt="Explanation Button (Closed)"/>
                    <DeleteIcon alt="Delete Button"  onClick={()=>this.props.onDelete(this.props.scale.id)}/> 
                </div>
                <ScaleSlider />
                <WritingSpace />
            </div>
        )
    }
}
