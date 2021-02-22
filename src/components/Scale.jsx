import React, { Component } from 'react';
import ScaleTitle from './ScaleTitle';
import ScaleSlider from './ScaleSlider';
import WritingSpace  from "./WritingSpace";

//SVG
import ExplanationIconClosed from "./icons/ExplanationIconClosed";
import DeleteIcon from "./icons/DeleteIcon";

export default class Scale extends Component {
    state = {
        writingSpaceVisible: false
    }
    handleWritingSpace = () =>{ //displays writing space visble or removes it
        this.setState({writingSpaceVisible: !this.state.writingSpaceVisible})
    }

    render() {
        return (
            <div className="scale">
                <div className="scale__header">
                    <ScaleTitle />
                    <ExplanationIconClosed alt="Explanation Button (Closed)" onClick={this.handleWritingSpace}/>
                    <DeleteIcon alt="Delete Button"  onClick={()=>this.props.onDelete(this.props.scale.id)}/> 
                </div>
                <ScaleSlider />
                {
                    this.state.writingSpaceVisible === true ? <WritingSpace/>: null
                }
            </div>
        )
    }
}
