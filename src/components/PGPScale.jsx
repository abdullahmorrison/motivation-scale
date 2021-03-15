import React, { useState, useEffect } from 'react';
import Scale from './Scale';

//packages
import { v4 as uuidv4 } from 'uuid';

const PGPScale = () => {
    const [scales, setScales] = useState([])

    useEffect(()=>{
        //*componentDidMount
        //adding the saved scales from local storage to state
        const scales = JSON.parse(localStorage.getItem("scales"))
        if(scales !== null){ //if you can't find the item on local storage
            setScales(scales)
        }
    }, [])

    const handleAddScale = () =>{ //saving new scale to state and local storage
        const localScales = [...scales, {id: uuidv4()}];
        setScales(localScales)
        localStorage.setItem("scales", JSON.stringify(localScales))
    }
    const handleDeleteScale = scaleId =>{
        //removing the scale from state and local storage by creating a new set of scales without the on we want to remove
        const localScales = scales.filter(s => s.id !== scaleId)
        setScales(localScales)
        localStorage.setItem("scales", JSON.stringify(localScales))
    }
    
    return ( 
        <>
            {scales.map(scale =>(
                <Scale key={scale.id} scaleID={scale.id} onDelete={handleDeleteScale}/>
            ))}
            <button className="new-scale" onClick={handleAddScale}>+</button>
            <div className="description">
            <h1>What is this tool?</h1>
            <p>
                This is a tool that helps you evaluate how you feel about the possibility of acheiving your goals.
            </p>
            <h1>Instructions</h1>
            <p>
                <ul>
                <li>
                    Press the orange button to create a new scale.
                </li>
                <li>
                    Write the name of the goal you want to achieve.
                </li>
                <li>
                    Move the scale in the direction that you feel is correct for how you feel about the possibility of acheiving your goal
                </li>
                </ul>
            </p>
            </div>
        </>
    );   
}
export default PGPScale;