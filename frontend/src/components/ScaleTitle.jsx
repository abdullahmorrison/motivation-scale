import React, { useState, useEffect } from 'react'

//SVG
import EditIcon from "./icons/EditIcon"


const ScaleTitle = ({scaleID}) => {
    const [value, setValue] = useState(null) //the title
    const [displayH1, setDisplayH1] = useState(false) //used to determine if you want to display value as h1 or input

    useEffect(()=>{
        fetchTitle()
    }, [])

    const fetchTitle = async () =>{
         //fetching the saved scales from the backend
        const response = await fetch('http://localhost:3001/api/scales/'+scaleID)
        const data = await response.json()
        if(data.title){
            setDisplayH1(true)
            setValue(data.title)
        }
    }

    const handleTitleChange = async (event, value) =>{
        if(event.key === 'Enter' && value !== ""){//if you press the enter key
            await fetch('http://localhost:3001/api/scales/'+scaleID,{
                method: 'PATCH',
                body: JSON.stringify({title: value}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            setValue(value)
            setDisplayH1(true)
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
