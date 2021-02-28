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

    render() {
        return (
            <div className="scale">
                <div className="scale__header">
                    <ScaleTitle 
                        scaleTitle={this.props.scale.title}
                        scaleDisplayH1={this.props.scale.displayH1}
                        onTitleChange={this.props.onTitleChange}
                        onEditTitle={this.props.onEditTitle}
                    />
                    <ExplanationIconClosed alt="Explanation Button (Closed)" onClick={this.handleWritingSpace}/>
                    <DeleteIcon alt="Delete Button"  onClick={()=>this.props.onDelete(this.props.scale.id)}/> 
                </div>
                <ScaleSlider 
                    sliderValue={this.props.scale.sliderValue}
                    onSliderValueUpdate={this.props.onSliderValueUpdate}//props passed up to parent twice     
                />
                {
                    this.state.writingSpaceVisible === true   
                        ? <WritingSpace 
                            explanation={this.props.scale.explanation} 
                            futurePlan={this.props.scale.futurePlan}
                            onEditTextArea={this.props.onEditTextArea}
                        />
                        : null
                }
            </div>
        )
    }
}
