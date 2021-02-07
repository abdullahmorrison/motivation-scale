import React, { Component } from 'react';

//SVG
import EditIcon from "./icons/EditIcon";

export default class ScaleTitle extends Component {
    render() {
        return (
            <>
                <input type="text" className="scale__header__input" placeholder="Name of Goal" required/>
                <EditIcon alt="Edit Button" />
            </>
        )
    }
}
