import React, { useState, useEffect } from 'react'

const WritingSpace = ({scaleID}) =>{
    const [avoidingFailureDescription, setAvoidingFailureDescription] = useState(null)
    const [chasingSuccessDescription, setChasingSuccessDescription] = useState(null)

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
        //!FETCHING TWICE
        fetchExplanationFuturePlan()
    }, [])

    

    const handleWriteExplanation = async (value) =>{
        await fetch('/scales/'+scaleID+'/avoidingFailureDescription',{
            method: 'PATCH',
            body: JSON.stringify({avoidingFailureDescription: value}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        setAvoidingFailureDescription(value)
    }

    const handleWriteFuturePlan = async (value) =>{
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
        <div className="scale__writing-space">
            <div>
                <label>What would be avoiding failure?</label>
                <textarea 
                    placeholder="Enter your comment here..."
                    defaultValue={avoidingFailureDescription}
                    onKeyUp={(event)=>handleWriteExplanation(event.target.value)}
                />
            </div>
            <div>
                <label>What would be chasing success?</label>
                <textarea 
                    placeholder="Enter your comment here..." 
                    defaultValue={chasingSuccessDescription}
                    onKeyUp={(event)=>handleWriteFuturePlan(event.target.value)}
                />
            </div>
        </div>
        
    )
}

export default WritingSpace