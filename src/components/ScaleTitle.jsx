import React, { useState, useEffect } from 'react'

//SVG
import EditIcon from "./icons/EditIcon"


const ScaleTitle = props => {
    const [value, setValue] = useState(null) //the title
    const [displayH1, setDisplayH1] = useState(false) //used to determine if you want to display value as h1 or input

    useEffect(()=>{
        //*componentDidMount
        //adding the saved scales from local storage to state
        const scaleTitle = JSON.parse(localStorage.getItem("scaleTitle-"+props.scaleID))
        if(scaleTitle){ //if you can't find the item on local storage
            setValue(scaleTitle)
            setDisplayH1(true)
        }

        //*componentWillUnmount
        return localStorage.removeItem("scaleTitle-"+props.scaleID) 
    }, [props.scaleID])

    const handleTitleChange = (event, value) =>{
        if(event.key === 'Enter'){//if you press the enter key
            setValue(value)
            setDisplayH1(true)
            localStorage.setItem("scaleTitle-"+props.scaleID, JSON.stringify(value))
        }
    }
    const handleEditTitle = () =>{
        setDisplayH1(false)
    }

    return (
        <>
            { displayH1 === true 
                ? <h1>{value}</h1>
                :<input 
                    type="text" 
                    className="scale__header__input" 
                    defaultValue={value} 
                    placeholder="Name of Goal" 
                    onKeyDown={(event)=>handleTitleChange(event, event.target.value)}   
                />
            }
            <EditIcon 
                alt="Edit Button" 
                onClick={handleEditTitle}
            />
        </>
    ) 
}
export default ScaleTitle
