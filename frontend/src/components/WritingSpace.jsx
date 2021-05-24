import React, { useState, useEffect } from 'react'

const WritingSpace = ({scaleID}) =>{
    const [explanation, setExplanation] = useState(null)
    const [futurePlan, setFuturePlan] = useState(null)

    useEffect(()=>{
        //!FETCHING TWICE
        fetchExplanationFuturePlan()
    }, [])

    const fetchExplanationFuturePlan = async () =>{
        //fetching the saved scales from the backend
        const response = await fetch('http://localhost:3001/scales/'+scaleID)
        const data = await response.json()
        if(data.explanation){
            setExplanation(data.explanation)
        }
        if(data.futurePlan){
            setFuturePlan(data.futurePlan)
        }
   }

    const handleWriteExplanation = async (value) =>{
        await fetch('http://localhost:3001/scales/explanation/'+scaleID,{
            method: 'PATCH',
            body: JSON.stringify({explanation: value}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        setExplanation(value)
    }

    const handleWriteFuturePlan = async (value) =>{
        await fetch('http://localhost:3001/scales/futureplan/'+scaleID,{
            method: 'PATCH',
            body: JSON.stringify({futurePlan: value}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        setFuturePlan(value)
    }


    return (
        <div className="scale__writing-space">
            <div>
                <label><h2>Explanation</h2></label>
                <textarea 
                    placeholder="Enter your comment here..."
                    defaultValue={explanation}
                    onKeyUp={(event)=>handleWriteExplanation(event.target.value)}
                />
            </div>
            <div>
                <label><h2>Future Plan</h2></label>
                <textarea 
                    placeholder="Enter your comment here..." 
                    defaultValue={futurePlan}
                    onKeyUp={(event)=>handleWriteFuturePlan(event.target.value)}
                />
            </div>
        </div>
        
    )
}

export default WritingSpace