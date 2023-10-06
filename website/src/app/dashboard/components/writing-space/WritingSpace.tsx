import React, { useState, useEffect } from 'react'
import styles from 'writingSpace.module.scss'

interface WritingSpaceProps{
    id: string,
    isVisible: boolean
    avoidingFailureDescription: string
    chasingSuccessDescription: string
}
const WritingSpace: React.FC<WritingSpaceProps> = (props: WritingSpaceProps) =>{
    const [avoidingFailureDescription, setAvoidingFailureDescription] = useState<string>()
    const [chasingSuccessDescription, setChasingSuccessDescription] = useState<string>()

    useEffect(()=>{
    }, [])

    const handleWriteExplanation = async (value: string) =>{
    }
    const handleWriteFuturePlan = async (value: string) =>{
    }

    return (
        <div className="scale__writing-space" style={props.isVisible ? {display:"flex"} : {display:"none"}}>
            <div>
                <label>What would be avoiding failure?</label>
                <textarea 
                    placeholder="Enter your comment here..."
                    defaultValue={props.avoidingFailureDescription}
                    onKeyUp={(event)=>handleWriteExplanation((event.target as HTMLTextAreaElement).value)}
                />
            </div>
            <div>
                <label>What would be chasing success?</label>
                <textarea 
                    placeholder="Enter your comment here..." 
                    defaultValue={props.chasingSuccessDescription}
                    onKeyUp={(event)=>handleWriteFuturePlan((event.target as HTMLTextAreaElement).value)}
                />
            </div>
        </div>   
    )
}

export default WritingSpace