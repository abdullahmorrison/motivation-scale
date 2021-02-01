import React, { Component } from 'react';

class scaleHeader extends Component {
    state = {
        title: null,
    }
    render() { 
        return ( 
            <div className="scale__header">
                <input type="text" className="scale__header__input" placeholder="Name of Goal" onkeydown="createTitle()" required/>
                <img src="images/editIcon.svg" alt=""/>
                <img src="images/explanationIcon-closed.svg" alt=""/>
                <img src="images/deleteIcon.svg" alt=""/>
            </div>
         );
    }
}
 
export default scaleHeader;