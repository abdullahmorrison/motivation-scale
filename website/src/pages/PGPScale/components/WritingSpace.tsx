import React, { useState, useEffect } from 'react'

interface Props{
    scaleID: string,
    visible: boolean
}

const WritingSpace: React.FC<Props> = ({scaleID, visible}) =>{
    const [avoidingFailureDescription, setAvoidingFailureDescription] = useState<string>()
    const [chasingSuccessDescription, setChasingSuccessDescription] = useState<string>()

    useEffect(()=>{
    }, [scaleID])

    const handleWriteExplanation = async (value: string) =>{
    }
    const handleWriteFuturePlan = async (value: string) =>{
    }

    return (
        <div className="scale__writing-space" style={visible ? {display:"flex"} : {display:"none"}}>
            <div>
                <label>What would be avoiding failure?</label>
                <textarea 
                    placeholder="Enter your comment here..."
                    defaultValue={avoidingFailureDescription}
                    onKeyUp={(event)=>handleWriteExplanation((event.target as HTMLTextAreaElement).value)}
                />
            </div>
            <div>
                <label>What would be chasing success?</label>
                <textarea 
                    placeholder="Enter your comment here..." 
                    defaultValue={chasingSuccessDescription}
                    onKeyUp={(event)=>handleWriteFuturePlan((event.target as HTMLTextAreaElement).value)}
                />
            </div>
        </div>   
    )
}

export default WritingSpace