import React, { useState, useEffect } from 'react'

interface Props{
    scaleID: string,
    visible: boolean
}

const WritingSpace: React.FC<Props> = ({scaleID, visible}) =>{
    const [avoidingFailureDescription, setAvoidingFailureDescription] = useState<string>()
    const [chasingSuccessDescription, setChasingSuccessDescription] = useState<string>()

    useEffect(()=>{
        const fetchExplanationFuturePlan = async () =>{
            //fetching the saved scales from the backend
            const response = await fetch('/scales/'+scaleID)
            const data = await response.json()
            if(data.avoidingFailureDescription){
                setAvoidingFailureDescription(data.avoidingFailureDescription)
            }
            if(data.chasingSuccessDescription){
                setChasingSuccessDescription(data.chasingSuccessDescription)
            }
        }
        fetchExplanationFuturePlan()
    }, [scaleID])

    

    const handleWriteExplanation = async (value: string) =>{
        await fetch('/scales/'+scaleID+'/avoidingFailureDescription',{
            method: 'PATCH',
            body: JSON.stringify({avoidingFailureDescription: value}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        setAvoidingFailureDescription(value)
    }

    const handleWriteFuturePlan = async (value: string) =>{
        await fetch('/scales/'+scaleID+'/chasingSuccessDescription',{
            method: 'PATCH',
            body: JSON.stringify({chasingSuccessDescription: value}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        setChasingSuccessDescription(value)
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