import React, { useState, useEffect } from 'react'

//SVG
import EditIcon from "./icons/EditIcon"


const ScaleTitle = scaleID => {
    const [value, setValue] = useState(null) //the title
    const [displayH1, setDisplayH1] = useState(false) //used to determine if you want to display value as h1 or input

    useEffect(()=>{
        //*componentDidMount
        //adding the saved scales from local storage to state
        const scaleTitle = JSON.parse(localStorage.getItem("scaleTitle-"+scaleID))
        if(scaleTitle){ //if you can't find the item on local storage
            setValue(scaleTitle)
            setDisplayH1(true)
        }

        //*componentWillUnmount
        return localStorage.removeItem("scaleTitle-"+scaleID) 
    }, [scaleID])

    const handleTitleChange = (event, value) =>{
        if(event.key === 'Enter'){//if you press the enter key
            setValue(value)
            setDisplayH1(true)
            localStorage.setItem("scaleTitle-"+scaleID, JSON.stringify(value))
        }
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
                onClick={()=>setDisplayH1(false)}
            />
        </>
    ) 
}
export default ScaleTitle
