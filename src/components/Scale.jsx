import React, { Component } from 'react';
import ScaleTitle from './ScaleTitle';
import ScaleSlider from './ScaleSlider';
import WritingSpace  from "./WritingSpace";

export default class Scale extends Component {
    render() {
        return (
            <div className="scale">
                <div className="scale__header">
                    <ScaleTitle />
                    <img src={"./componenet-icons/explanationIcon-closed.svg"} alt="Explanation Button"/>
                    <img src={"./componenet-icons/deleteIcon.svg"} alt="Delete Button"/> 
                </div>
                <ScaleSlider />
                <WritingSpace />
            </div>
        )
    }
}
