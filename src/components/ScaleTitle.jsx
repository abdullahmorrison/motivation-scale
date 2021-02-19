import React, { Component } from 'react';

//SVG
import EditIcon from "./icons/EditIcon";


export default class ScaleTitle extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: <input type="text" className="scale__header__input" placeholder="Name of Goal" onKeyDown={(event)=>this.handleTitleChange(event, event.target.value)} required/>
        };
    }
    handleTitleChange = (event, value) =>{
        if(event.key === 'Enter'){//if you press the enter key
            if(value){
                this.setState({title: <h1>{value}</h1>})
            }else{
                this.setState({title: <h1>ERROR</h1>})
            }
        }
    }
    handleEditTitle = () =>{
        this.setState({title: <input type="text" className="scale__header__input" placeholder="Name of Goal" onKeyDown={(event)=>this.handleTitleChange(event, event.target.value)} required/>})
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
