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
    handleWritingSpace = () =>{ //makes writing space visble or removes it
        this.setState({writingSpaceVisible: !this.state.writingSpaceVisible})
    }

    componentWillUnmount(){
        localStorage.removeItem("scaleExplanation-"+this.props.scale.id)
        localStorage.removeItem("scaleFuturePlan-"+this.props.scale.id)
    }

    render() {
        return (
            <div className="scale">
                <div className="scale__header">
                    <ScaleTitle scaleID={this.props.scale.id}/>
                    <ExplanationIconClosed alt="Explanation Button (Closed)" onClick={this.handleWritingSpace}/>
                    <DeleteIcon alt="Delete Button"  onClick={()=>this.props.onDelete(this.props.scale.id)}/> 
                </div>
                <ScaleSlider scaleID={this.props.scale.id}/>
                {
                    this.state.writingSpaceVisible === true ? <WritingSpace scaleID={this.props.scale.id}/>: null
                }
            </div>
        )
    }
}
