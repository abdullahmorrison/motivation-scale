import React, { Component } from 'react'

export default class WritingSpace extends Component {
    state = {
        explanation: null,
        futurePlan: null
    }

    componentDidMount(){
        const explanation = JSON.parse(localStorage.getItem("scaleExplanation-"+this.props.scaleID))
        const futurePlan = JSON.parse(localStorage.getItem("scaleFuturePlan-"+this.props.scaleID))
        if(explanation){ //if you can't find the item on local storage
            this.setState({
                explanation
            })
        }
        if(futurePlan){ //if you can't find the item on local storage
            this.setState({
                futurePlan
            })
        }
    }

    handleWriteExplanation = (value) =>{
        this.setState({explanation: value})
        localStorage.setItem("scaleExplanation-"+this.props.scaleID, JSON.stringify(value))
    }

    handleWriteFuturePlan= (value) =>{
        this.setState({explanation: value})
        localStorage.setItem("scaleFuturePlan-"+this.props.scaleID, JSON.stringify(value))
    }

    render() {
        return (
            <div className="scale__writing-space">
                <div>
                    <label><h2>Explanation</h2></label>
                    <textarea 
                        placeholder="Enter your comment here..."
                        defaultValue={this.state.explanation}
                        onKeyUp={(event)=>this.handleWriteExplanation(event.target.value)}
                    />
                </div>
                <div>
                    <label><h2>Future Plan</h2></label>
                    <textarea 
                        placeholder="Enter your comment here..." 
                        defaultValue={this.state.futurePlan}
                        onKeyUp={(event)=>this.handleWriteFuturePlan(event.target.value)}
                    />
                </div>
            </div>
            
        )
    }
}
