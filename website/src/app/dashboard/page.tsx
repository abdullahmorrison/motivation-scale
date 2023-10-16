"use client"
import { useState, useEffect } from 'react'
import { DroppableProvided, DropResult } from 'react-beautiful-dnd'
import dynamic from 'next/dynamic'
const DragDropContext = dynamic(() => import("react-beautiful-dnd").then((module) => module.DragDropContext));
const Droppable = dynamic(() => import("react-beautiful-dnd").then((module) => module.Droppable));

import Scale, { ScaleType } from './components/scale/Scale'
import ConfirmModal from './components/modal/Modal'
import EditScaleModal from './components/modal/Modal'
import { getScales, updateScale } from '@/app/apollo-client'

import styles from './page.module.scss'

export default function Dashboard(){
    const [scales, setScales] = useState<ScaleType[]>([])
    const [username, setUsername] = useState<string>("abdullahmorrison@gmail.com")
    const [,setName] = useState<string>("Guest") //!DEFAULT "GUEST" MAY CAUSE ERRORS
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
    const [editScaleData, setEditScaleData] = useState<ScaleType>()

    useEffect(() => {
        async function fetchData() {
            let data: ScaleType[] = await getScales()
            data.sort((a: ScaleType, b: ScaleType) => {
                if(a.order && b.order) return a.order - b.order
                else return 0
            })
            setScales(data)
        }
        fetchData()
    }, [])


    const handleAddScale = () => { //saving new scale to state and local storage
    }
    const handleDeleteScale = (id: string) => {
        setShowConfirmModal(true)
    }
    const handleDragAndDrop = (result: DropResult) => {
        if(!result.destination) return

        const srcI = result.source.index
        const destI = result.destination.index

        const src = scales[srcI]
        const removedSrc = scales.filter((_, index: number) => index !== srcI)

        const left = removedSrc.slice(0, destI)
        const right = removedSrc.slice(destI, removedSrc.length)

        let newScales = [...left, src, ...right]

        for(var i=0; i<newScales.length; i++) 
            if(newScales[i].id !== scales[i].id) 
                updateScale({id: newScales[i].id, order: i})
        setScales(newScales)
    }

    return (
        <>
            <ConfirmModal 
                title='Confirm Deletion'
                body={
                    <div>
                        <p>Are you sure you want to delete this scale?</p>
                    </div>
                }
                isVisible={showConfirmModal}
                buttons={[
                    {text: 'Delete', backgroundColor: 'red', onClick:()=> setShowConfirmModal(false)},
                    {text: 'Cancel', onClick:()=> setShowConfirmModal(false)}
                ]}
            /> 
            <EditScaleModal
                title='Edit Scale'
                body={
                    <div className={styles.editScaleModalBody}>
                        <fieldset>
                            <legend><h4>Goal</h4></legend>
                            <input type="text" defaultValue={editScaleData?.goal} />
                        </fieldset>
                        <fieldset>
                            <legend><h4>Avoiding Failure Description</h4></legend>
                            <textarea cols={30} rows={10}>{editScaleData?.avoidingFailureDescription}</textarea>
                        </fieldset> 
                        <fieldset>
                            <legend><h4>Chasing Sucess Description</h4></legend>
                            <textarea cols={30} rows={10}>{editScaleData?.chasingSuccessDescription}</textarea>
                        </fieldset>
                    </div>
                }
                isVisible={editScaleData !== undefined}
                buttons={[
                    {text: 'Update', backgroundColor: '#0bf800', onClick:()=>{}}
                ]}
            />
            <div className={styles.droppableArea}>{/**Element made to add style to the drag and drop context*/}
                <DragDropContext onDragEnd={handleDragAndDrop}>
                    <Droppable droppableId="1">
                        {(provided: DroppableProvided) => (
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