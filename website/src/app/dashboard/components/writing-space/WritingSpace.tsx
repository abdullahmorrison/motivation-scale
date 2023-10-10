import React, { useState, useEffect } from 'react'
import styles from './writingSpace.module.scss'
import { updateScale } from '@/app/apollo-client'

interface WritingSpaceProps{
    id: string,
    isVisible: boolean
    avoidingFailureDescription: string
    chasingSuccessDescription: string
}
const WritingSpace: React.FC<WritingSpaceProps> = (props: WritingSpaceProps) =>{
    return (
        <div className={styles.writingSpace} style={props.isVisible ? {display:"flex"} : {display:"none"}}>
            <div>
                <label>What would be avoiding failure?</label>
                <textarea 
                    placeholder="Enter your comment here..."
                    defaultValue={props.avoidingFailureDescription}
                    onKeyUp={(event)=>updateScale({id: props.id, avoidingFailureDescription: (event.target as HTMLTextAreaElement).value})}
                />
            </div>
            <div>
                <label>What would be chasing success?</label>
                <textarea 
                    placeholder="Enter your comment here..." 
                    defaultValue={props.chasingSuccessDescription}
                    onKeyUp={(event)=>updateScale({id: props.id, chasingSuccessDescription: (event.target as HTMLTextAreaElement).value})}
                />
            </div>
        </div>   
    )
}

export default WritingSpace