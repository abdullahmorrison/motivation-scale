import React, { Component } from 'react';

export default class ScaleSlider extends Component {
    state = {
        sliderValue: 50
    }
    
    componentDidMount() {//adding the saved scales from local storage to state
        const sliderValue = JSON.parse(localStorage.getItem("sliderValue-"+this.props.scaleID))
        if(sliderValue){ //if you can't find the item on local storage
            this.setState({
                sliderValue
            })
        }
    }
    changeSliderValue = (value) =>{
        this.setState({sliderValue: value})
        localStorage.setItem("sliderValue-"+this.props.scaleID, JSON.stringify(value))
    }
    componentWillUnmount(){
        localStorage.removeItem("sliderValue-"+this.props.scaleID)
    }

    render() {
        return (
            <div className="scale__slider">
                <input
                    type="range"
                    className="scale__slider__range"
                    min="0" max="100" 
                    defaultValue = {this.state.sliderValue}
                    onChange = {(event) => this.changeSliderValue(event.target.value)}
                />
                <div className="scale__slider__ticks">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <ul className="scale__slider__labels">
                    <li>Saving What You Can</li>
                    <li>Avoiding Failure</li>
                    <li>Stagnant</li>
                    <li>Chasing Success</li>
                    <li>Upgrading Your Goal</li>
                </ul>
            </div>
        )
    }
}
