import Image from 'next/image'
import React, { useState, useEffect } from 'react'

//styles & SVG
import styles from "./scaleGoal.module.scss"
import EditIcon from "../../../assets/icons/editIcon.svg"

interface ScaleGoalProps{
    id: string
    goal: string
}

const ScaleGoal = (props: ScaleGoalProps) => {
    const [title, setTitle] = useState<string>("") //the title
    const [displayH1, setDisplayH1] = useState<boolean>(false) //used to determine if you want to display value as h1 or input

    useEffect(()=>{
    }, [])

    const handleTitleChange = async (event: React.KeyboardEvent<HTMLInputElement>) =>{
        if(event.key === 'Enter' && (event.target as HTMLInputElement).value !== ""){//if you press the enter key
            //fetch
            
            setTitle((event.target as HTMLInputElement).value)
            setDisplayH1(true)
        }
    }

    return (
        <div className={styles.goalHeader}>
            { displayH1 === true 
                ? <h1>{title}</h1>
                :<input 
                    type="text" 
                    className={styles.goalInput}
                    defaultValue={props.goal} 
                    placeholder="Name of Goal" 
                    onKeyDown={(event)=>handleTitleChange(event)}   
                />
            }
            <div className={styles.goalHeaderIcon}>
                <Image
                    src={EditIcon} 
                    alt="Edit Button" 
                    onClick={()=>setDisplayH1(false)}
                />
            </div>
        </div>
    ) 
}
export default ScaleGoal
