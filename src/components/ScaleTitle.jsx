import React, { Component } from 'react';

export default class ScaleTitle extends Component {
    render() {
        return (
            <>
                <input type="text" className="scale__header__input" placeholder="Name of Goal" required/>
                <img src={"./component-icons/editIcon.svg"} alt="Edit Button" />
            </>
        )
    }
}
