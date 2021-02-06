import React, { Component } from 'react'

export default class WritingSpace extends Component {
    render() {
        return (
            <div className="scale__writing-space">
                <div>
                    <label>Explanation</label>
                    <input type="textarea"/>
                </div>
                <div>
                    <label>Future Plan</label>
                    <input type="textarea"/>
                </div>
            </div>
        )
    }
}
