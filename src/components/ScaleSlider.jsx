import React, { Component } from 'react';

export default class ScaleSlider extends Component {
    render() {
        return (
            <div className="scale__slider">
                <input
                    type="range"
                    className="scale__slider__range"
                    min="0" max="100" 
                    defaultValue = {this.props.sliderValue}
                    onChange = {this.props.onSliderValueUpdate}
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
