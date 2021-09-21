import React, { useState } from 'react';

import DragDropIcon from '../../PGPScale/icons/dragDropIcon.svg'
import EditIcon from '../../PGPScale/icons/editIcon.svg'
import ExplanationIconOpened from '../../PGPScale/icons/explanationIconOpened.svg'
import ExplanationIconClosed from '../../PGPScale/icons/explanationIconClosed.svg'
import DeleteIcon from '../../PGPScale/icons/deleteIcon.svg'

const DemoScale = () => {
    const [writingSpaceVisible, setWritiingSpaceVisible] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("") //the title
    const [displayH1, setDisplayH1] = useState<boolean>(false) //used to determine if you want to display value as h1 or input

    return(
        <div className="scale">
            <div className="scale__header">
                <img src={DragDropIcon} alt="drag 'n' drop" />
                <div className="scale__header__container">
                { displayH1 === true 
                    ? <h1>{title}</h1>
                    :<input 
                        type="text" 
                        className="scale__header__container__input" 
                        defaultValue={title} 
                        placeholder="Name of Goal" 
                        onKeyDown={(event)=>{
                                if(event.key === 'Enter' && (event.target as HTMLInputElement).value !== ""){
                                    setTitle((event.target as HTMLInputElement).value)
                                    setDisplayH1(true)
                                }
                            }
                        }   
                    />
                }
                    <div className="scale__header__icon">
                        <img src={EditIcon} alt="Edit Icon" onClick={()=>setDisplayH1(false)}/>
                    </div>
                </div>
                <div className="scale__header__container">
                    <img className="scale__header__icon" 
                        src={writingSpaceVisible ? ExplanationIconOpened : ExplanationIconClosed} 
                        onClick={()=>setWritiingSpaceVisible(!writingSpaceVisible)}
                        alt="dropdown" 
                    />
                    <img className="scale__header__icon" src={DeleteIcon} alt="delete" />
                </div>
            </div>
            <div className="scale__slider">
                <input
                    type="range"
                    className="scale__slider__range"
                    min="0" max="100"
                />
                <div className="scale__slider__ticks">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <ul className="scale__slider__labels">
                    <li>Saving What You Can</li>
                    <li>Avoiding Failure</li>
                    <li>Stagnant</li>
                    <li>Chasing Success</li>
                    <li>Upgrading Your Goal</li>
                </ul>
            </div>
            <div className="scale__writing-space" style={writingSpaceVisible ? {display:"flex"} : {display:"none"}}>
                <div>
                    <label>What would be avoiding failure?</label>
                    <textarea 
                        placeholder="Enter your comment here..."
                    />
                </div>
                <div>
                    <label>What would be chasing success?</label>
                    <textarea 
                        placeholder="Enter your comment here..." 
                    />
                </div>
            </div>   
        </div>
    )
}
export default DemoScale