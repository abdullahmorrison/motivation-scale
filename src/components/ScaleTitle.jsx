import React, { Component } from 'react';

//SVG
import EditIcon from "./icons/EditIcon";


export default class ScaleTitle extends Component {
    state = {
        value: null, //the title
        displayH1: false //used to determine if you want to display value as h1 or input
    };
    
    handleTitleChange = (event, value) =>{
        if(event.key === 'Enter'){//if you press the enter key
            this.setState({value: value, displayH1: true})
        }
    }
    handleEditTitle = () =>{
        this.setState({displayH1: false})
    }
    render() {
        return (
            <>
                { this.state.displayH1 === true 
                    ? <h1>{this.state.value}</h1>
                    :<input 
                        type="text" 
                        className="scale__header__input" 
                        defaultValue={this.state.value} 
                        placeholder="Name of Goal" 
                        onKeyDown={(event)=>this.handleTitleChange(event, event.target.value)}   
                    />
                }
                <EditIcon 
                    alt="Edit Button" 
                    onClick={this.handleEditTitle}
                />
            </>
        )
    }
}
