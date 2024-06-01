"use client"
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '@/context/authContext';
import { DroppableProvided,  DropResult } from 'react-beautiful-dnd'
import dynamic from 'next/dynamic'
const DragDropContext = dynamic(() => import("react-beautiful-dnd").then((module) => module.DragDropContext));
const Droppable = dynamic(() => import("react-beautiful-dnd").then((module) => module.Droppable));
import Image from 'next/image';
import Arrow from "../assets/arrow.png"

import Scale, { ScaleType } from './components/scale/Scale'
import Nav from '../nav/Nav';
import ScaleModal from './components/modal/Modal'

import styles from './page.module.scss'
import { useLazyQuery, useMutation } from '@apollo/client';
import ScaleQueries from '@/queries/scales';
import { useRouter } from 'next/navigation';

export default function Dashboard(){
    const [scales, setScales] = useState<ScaleType[]>([])
    const { user }: any = useContext(AuthContext)
    type ModalData = null | {
      type: "add" | "edit" | null,
      scale?: {
        id?: string,
        goal?: string,
        chasingSuccessDescription?: string,
        avoidingFailureDescription?: string
      }
    }
    const [scaleToMutate, setScaleToMutate] = useState<ModalData>(null)

    const [getScales]= useLazyQuery(ScaleQueries.GET_SCALES, {
      onCompleted(data){
        setScales(data.scales)
      }
    })
    const [addScale] = useMutation(ScaleQueries.CREATE_SCALE, {
      onCompleted(data){
        const scale = data.createScale
        setScales(prev=>[...prev, scale])
        setScaleToMutate(prev=>({...prev, type: null}))
      }
    })
    const [editScale] = useMutation(ScaleQueries.UPDATE_SCALE, {
      onCompleted(data){
        const scale = data.updateScale
        let i=0
        for(; i<scales.length; i++){
          if(scales.at(i)?.id == scale.id) break
        }
          
        setScales(scales.with(i, data.updateScale))
        setScaleToMutate(prev=>({...prev, type: null}))
      }
    })
    const [deleteScale] = useMutation(ScaleQueries.DELETE_SCALE, {
      onCompleted(data){
        const deletedScale = data.deleteScale
        setScales(scales.filter((scale)=>scale.id!=deletedScale.id))
        setScaleToMutate(prev=>({...prev, type: null}))
      }
    })

    const router = useRouter()
    useEffect(() => {
      if(user==null) router.push("/auth/login")
      else getScales({variables: { userId: user.id} })
    }, [user, getScales, router])

    const handleReorderScale = (scaleID: string, newOrder: number) => {
    }
    const handleDragAndDrop = (result: DropResult) => {
        if(!result.destination) return

        const srcI = result.source.index
        const destI = result.destination.index

        const src = scales[srcI]
        let removedSrc = scales.filter((_, index: number) => index !== srcI)

        const left = removedSrc.slice(0, destI)
        const right = removedSrc.slice(destI, removedSrc.length)

        let newScales = [...left, src, ...right]

        for(var i=0; i<newScales.length; i++) {
            if(newScales[i].id !== scales[i].id) {
                handleReorderScale(newScales[i].id, i)
            }
        }
        setScales(newScales)
    }

    return (
        <main className={styles.dashboard}>
            {scaleToMutate?.type!=null ?
              <ScaleModal 
                type={scaleToMutate?.type || null}
                scale={scaleToMutate?.scale}
                onEdit={(scaleData)=>editScale({variables: scaleData})}
                onAdd={(scaleData)=> addScale({variables: { userId: user.id, ...scaleData}})}
                onDelete={(scaleData)=>deleteScale({variables: {userId: user.id, id: scaleData.id}})}
                onClose={()=>setScaleToMutate(null)}
              /> : null
            }
            <Nav/>
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
                                        onEdit={()=>setScaleToMutate({type: "edit", scale})} 
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <div className={styles.arrow}></div>
            {scales.length==0 ?
            <>
            <span className={styles.starterInformation}>Have a goal you want to achieve? <br/> Click here to start tracking your motivation for it!</span> 
            <Image className={styles.arrow} src={Arrow} alt='Arrow'/>
            </>
            : undefined}
            <button 
              className={styles.newScale} 
              style={scales.length==0 ? {marginTop: "100px"} : undefined}  
              onClick={()=>setScaleToMutate({type: "add"})}
            >+</button>
        </main>
    )
}
