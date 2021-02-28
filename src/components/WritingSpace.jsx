import React, { Component } from 'react'

export default class WritingSpace extends Component {
    render() {
        return (
            <div className="scale__writing-space">
                <div>
                    <label><h2>Explanation</h2></label>
                    <textarea 
                        className="scale__writing-space__Explanation"
                        placeholder="Enter your comment here..." 
                        defaultValue={this.props.explanation}
                        onKeyPress={this.props.onEditTextArea}
                    />
                </div>
                <div>
                    <label><h2>Future Plan</h2></label>
                    <textarea 
                        className="scale__writing-space__future-plan"
                        placeholder="Enter your comment here..." 
                        defaultValue={this.props.futurePlan}
                        onKeyPress={this.props.onEditTextArea}
                    />
                </div>
            </div>
            
        )
    }
}
