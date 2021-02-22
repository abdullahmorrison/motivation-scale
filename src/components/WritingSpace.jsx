import React, { Component } from 'react'

export default class WritingSpace extends Component {
    render() {
        return (
            <div className="scale__writing-space">
                <div>
                    <label><h2>Explanation</h2></label>
                    <textarea 
                        defaultValue="Enter your comment here..." 
                        onFocus={
                            (event)=>{
                                event.target.value='';
                                event.target.style.color='black';
                            }
                        }
                    />
                </div>
                <div>
                    <label><h2>Future Plan</h2></label>
                    <textarea 
                        defaultValue="Enter your comment here..." 
                        onFocus={
                            (event)=>{
                                event.target.value='';
                                event.target.style.color='black';
                            }
                        }
                    />
                </div>
            </div>
            
        )
    }
}
