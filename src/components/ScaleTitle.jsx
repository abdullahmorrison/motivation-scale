import React, { Component } from 'react';

import EditIcon from "./icons/EditIcon";


export default class ScaleTitle extends Component {
    render() {
        return (
            <>
                { this.props.scaleDisplayH1 === true 
                    ? <h1>{this.props.scaleTitle}</h1>
                    :<input 
                        type="text" 
                        className="scale__header__input" 
                        defaultValue={this.props.scaleTitle} 
                        placeholder="Name of Goal" 
                        onKeyDown={this.props.onTitleChange}   
                    />
                }
                <EditIcon 
                    alt="Edit Button" 
                    onClick={this.props.onEditTitle}
                />
            </>
        )
    }
}
