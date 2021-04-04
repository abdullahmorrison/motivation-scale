import React, { useState, useEffect } from 'react'

const WritingSpace = scaleID =>{
    const [explanation, setExplanation] = useState(null)
    const [futurePlan, setFuturePlan] = useState(null)

    useEffect(()=>{
        //*componentDidMount
        const explanation = JSON.parse(localStorage.getItem("scaleExplanation-"+scaleID))
        const futurePlan = JSON.parse(localStorage.getItem("scaleFuturePlan-"+scaleID))
        if(explanation){ //if you can't find the item on local storage
            setExplanation(explanation)
        }
        if(futurePlan){ //if you can't find the item on local storage
            setFuturePlan(futurePlan)
        }
    }, [scaleID])

    const handleWriteExplanation = (value) =>{
        setExplanation(value)
        localStorage.setItem("scaleExplanation-"+scaleID, JSON.stringify(value))
    }

    const handleWriteFuturePlan= (value) =>{
        setFuturePlan(value)
        localStorage.setItem("scaleFuturePlan-"+scaleID, JSON.stringify(value))
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