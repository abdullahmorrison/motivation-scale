"use client"
import { useState, useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import Scale, { ScaleType } from './components/scale/Scale'
import ConfirmModal from './components/confirm-modal/ConfirmModal'
import { getScales } from '../apollo-client'

import styles from './page.module.scss'

export default function Dashboard(){
    const [scales, setScales] = useState<ScaleType[]>([])
    const [username, setUsername] = useState<string>("abdullahmorrison@gmail.com")
    const [,setName] = useState<string>("Guest") //!DEFAULT "GUEST" MAY CAUSE ERRORS

    useEffect(() => {
        async function fetchData() {
            let data = await getScales()
            setScales(data.props.scales)
        }
        fetchData()
    }, [])


    const handleAddScale = () => { //saving new scale to state and local storage
    }
    const handleDeleteScale = (id: string) => {
        document.getElementById("myModal")!.style.display = "block"//display confirm modal

        //action if the delete button is clicked
        const deleteScale =()=> {//nested function created for adding and removing eventlistener
            
            document.getElementById("myModal")!.style.display = "none"
        }
        document.getElementById("modal-footer-delete")!.addEventListener("click", deleteScale)

        //remove modal if you click the cancel button
        document.getElementById("modal-footer-cancel")!.addEventListener("click", function() {
            document.getElementById("modal-footer-delete")!.removeEventListener("click", deleteScale)
            document.getElementById("myModal")!.style.display = "none"
            document.getElementById("modal-footer-cancel")!.removeEventListener("click", deleteScale)
        })
    }
    const handleReorderScale = (scaleID: string, newOrder: number) => {
    }
    const handleDragAndDrop = (result: any) => {
        const srcI = result.source.index
        const destI = result.destination?.index

        const src = scales[srcI]
        if(destI != null){ //making sure a item isn't dragged outside of draggable area (otherwise a destination wouldn't exist)
            let removedSrc:any = scales.filter((_: any, index: any) => index !== srcI)

            const left = removedSrc.slice(0, destI)
            const right = removedSrc.slice(destI, removedSrc.length)
            
            let newScales:any = [...left, src, ...right]
            
            for(var i=0; i<newScales.length; i++) //looping to find changes in a scale's order in the array
                if(newScales[i]._id !== scales[i].id) //only making api calls if a scale's order has changed
                    handleReorderScale(newScales[i]._id, i)
            setScales(newScales)
        }
    }
    return (
        <>
            <ConfirmModal message="Are you sure you would like to delete this scale?" confirmText="Delete"/>
            <div className={styles.droppableArea}>{/**Element made to add style to the drag and drop context*/}
                <DragDropContext onDragEnd={handleDragAndDrop}>
                    <Droppable droppableId="droppable-1">
                        {(provided: any, _: any) => ( //!FIX ANY
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {scales.map((scale: ScaleType, i: number)=> (
                                    <Scale 
                                        index={i}
                                        key={scale.id}
                                        id={scale.id}
                                        goal={scale.goal}
                                        sliderValue={scale.sliderValue}
                                        chasingSuccessDescription={scale.chasingSuccessDescription}
                                        avoidingFailureDescription={scale.avoidingFailureDescription}
                                        onDelete={handleDeleteScale} 
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <button className={styles.newScale} onClick={handleAddScale}>+</button>
        </>
    )
}