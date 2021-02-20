import React, { Component } from 'react';

//SVG
import EditIcon from "./icons/EditIcon";


export default class ScaleTitle extends Component {
    state = {
        title: <input type="text" className="scale__header__input" placeholder="Name of Goal" onKeyDown={(event)=>this.handleTitleChange(event, event.target.value)}/>
    };
    
    handleTitleChange = (event, value) =>{
        if(event.key === 'Enter'){//if you press the enter key
            if(value){
                this.setState({title: <h1>{value}</h1>})
            }else{
                console.warn("ERROR: Title value doesn't exist")
            }
        }
    }
    handleEditTitle = () =>{
        this.setState({title: <input type="text" className="scale__header__input" placeholder="Name of Goal" onKeyDown={(event)=>this.handleTitleChange(event, event.target.value)}/>})
    }
    render() {
        return (
            <>
                {this.state.title}
                <EditIcon alt="Edit Button" onClick={this.handleEditTitle}/>
            </>
        )
    }
}
