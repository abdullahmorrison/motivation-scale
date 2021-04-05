import React, { useState, useEffect } from 'react'

const WritingSpace = ({scaleID}) =>{
    const [explanation, setExplanation] = useState(null)
    const [futurePlan, setFuturePlan] = useState(null)

    useEffect(()=>{
        //!FETCHING TWICE
        fetch('http://localhost:3001/api/scales')
        .then(res => res.json())
        .then(scales =>  {
                //looping through each object to find the id that corresponds the componenet's parent id
                for (var i=0; i < scales.length; i++){
                    //adding the explanation and future plan to the state if it exists
                    if (scales[i].id === scaleID){
                        if(scales[i].explanation){
                            setExplanation(scales[i].explanation)
                        }
                        if(scales[i].futurePlan){
                            setFuturePlan(scales[i].futurePlan)
                        }
                    }
                }
            }
        )
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