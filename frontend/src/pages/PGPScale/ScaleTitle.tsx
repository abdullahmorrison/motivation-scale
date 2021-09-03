import React, { useState, useEffect } from 'react'

//SVG
import EditIcon from "./icons/editIcon.svg"

interface Props{
    scaleID: string
}

const ScaleTitle: React.FC<Props> = ({scaleID}) => {
    const [title, setTitle] = useState<string>("") //the title
    const [displayH1, setDisplayH1] = useState<boolean>(false) //used to determine if you want to display value as h1 or input

    useEffect(()=>{
        const fetchTitle = async () =>{
            //fetching the saved scales from the backend
           const response = await fetch('/scales/'+scaleID)
           const data = await response.json()
           if(data.title){
               setDisplayH1(true)
               setTitle(data.title)
           }
        }
        fetchTitle()
    }, [scaleID])

    const handleTitleChange = async (event: React.KeyboardEvent<HTMLInputElement>) =>{
        if(event.key === 'Enter' && (event.target as HTMLInputElement).value !== ""){//if you press the enter key
            await fetch('/scales/'+scaleID+'/title',{
                method: 'PATCH',
                body: JSON.stringify({title: (event.target as HTMLInputElement).value}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            setTitle((event.target as HTMLInputElement).value)
            setDisplayH1(true)
        }
    }

    return (
        <div className="scale__header__container">
            { displayH1 === true 
                ? <h1>{title}</h1>
                :<input 
                    type="text" 
                    className="scale__header__container__input" 
                    defaultValue={title} 
                    placeholder="Name of Goal" 
                    onKeyDown={(event)=>handleTitleChange(event)}   
                />
            }
            <div className="scale__header__icon">
                <img
                    src={EditIcon} 
                    alt="Edit Button" 
                    onClick={()=>setDisplayH1(false)}
                />
            </div>
        </div>
    ) 
}
export default ScaleTitle
