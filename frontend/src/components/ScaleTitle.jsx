import React, { useState, useEffect } from 'react'

//SVG
import EditIcon from "./icons/EditIcon"


const ScaleTitle = ({scaleID}) => {
    const [value, setValue] = useState(null) //the title
    const [displayH1, setDisplayH1] = useState(false) //used to determine if you want to display value as h1 or input

    useEffect(()=>{
        //fetching the saved scales from the backend
        //!FETCHING TWICE
        fetch('http://localhost:3001/api/scales')
            .then(res => res.json())
            .then(scales =>  {
                    //looping through each object to find the id that corresponds the componenet's parent id
                    for (var i=0; i < scales.length; i++){
                        //adding the title to the state if it exists
                        if (scales[i].id === scaleID && scales[i].title){
                            setValue(scales[i].title)
                            setDisplayH1(true)
                        }
                    }
                }
            )
        // return localStorage.removeItem("scaleTitle-"+scaleID) 
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
