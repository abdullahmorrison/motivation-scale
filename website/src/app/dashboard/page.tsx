"use client"
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '@context/authContext';
import { DroppableProvided,  DropResult } from 'react-beautiful-dnd'
import dynamic from 'next/dynamic'
const DragDropContext = dynamic(() => import("react-beautiful-dnd").then((module) => module.DragDropContext));
const Droppable = dynamic(() => import("react-beautiful-dnd").then((module) => module.Droppable));
import Image from 'next/image';

import Scale from './components/scale/Scale'
import Nav from '@components/nav/Nav';
import ScaleModal from './components/modal/Modal'
import Loading from '@app/loading/Loading';
import ErrorPopup from '@components/error-popup/ErrorPopup';

import styles from './page.module.scss'
import { useLazyQuery, useMutation } from '@apollo/client';
import ScaleQueries from '@queries/scales';
import { useRouter } from 'next/navigation';
import { REORDER_SCALES } from '@queries/scaleOrder';
import type { AddScale, EditScale, ScaleData } from '@custom-types/scale';
import routes from '@lib/routes';

export default function Dashboard(){
    const [scales, setScales] = useState<ScaleData[]>([])
    const { user }: any = useContext(AuthContext)
    const [scaleToMutate, setScaleToMutate] = useState<AddScale | EditScale | null>(null)

    const [getScales, {loading: getScalesLoading, error: getScalesError}]= useLazyQuery(ScaleQueries.GET_SCALES, {
      onCompleted(data){
        setScales(data.scales)
      }
    })
    const [addScale, {loading: addScaleLoading, error: addScaleError}] = useMutation(ScaleQueries.CREATE_SCALE, {
      onCompleted(data){
        const scale = data.createScale
        setScales(prev=>[...prev, scale])
        setScaleToMutate(null)
      }
    })
    const [editScale, {loading: editScaleLoading, error: editScaleError}] = useMutation(ScaleQueries.UPDATE_SCALE, {
      onCompleted(data){
        const scale = data.updateScale
        let i=0
        for(; i<scales.length; i++){
          if(scales.at(i)?.id == scale.id) break
        }
          
        setScales(scales.with(i, data.updateScale))
        setScaleToMutate(null)
      }
    })
    const [deleteScale, {loading: deleteScaleLoading, error: deleteScaleError}] = useMutation(ScaleQueries.DELETE_SCALE, {
      onCompleted(data){
        const deletedScale = data.deleteScale
        setScales(scales.filter((scale)=>scale.id!=deletedScale.id))
        setScaleToMutate(null)
      }
    })
    const [reorderScales, {error: reorderScaleError}] = useMutation(REORDER_SCALES)

    const router = useRouter()
    useEffect(() => {
      if(user==null) router.push(routes.login)
      else getScales({variables: { userId: user.id} })
    }, [user, getScales, router])

    const handleDragAndDrop = (result: DropResult) => {
        if(!result.destination) return

        const srcI = result.source.index
        const destI = result.destination.index

        const src = scales[srcI]
        let removedSrc = scales.filter((_, index: number) => index !== srcI)

        const left = removedSrc.slice(0, destI)
        const right = removedSrc.slice(destI, removedSrc.length)

        const oldScales = [...scales]
        const newScales = [...left, src, ...right]

        setScales(newScales)
        reorderScales({
          variables: {userId: user.id, scaleOrder: newScales.map(scale => scale.id)},
          onError: ()=> setScales(oldScales)
        })
    }

    const isError = getScalesError || addScaleError || editScaleError || deleteScaleError || reorderScaleError

    const isLoading = getScalesLoading || addScaleLoading || editScaleLoading || deleteScaleLoading
    if(isLoading) return <Loading/>

    return (
        <main className={styles.dashboard}>
            {isError && <ErrorPopup/>}
            {scaleToMutate?.type=="add"?
              <ScaleModal 
                type={scaleToMutate.type}
                onAdd={(scaleData)=> addScale({variables: { userId: user.id, ...scaleData}})}
                onClose={()=>setScaleToMutate(null)}
              /> : 
              scaleToMutate?.type=="edit" ?
              <ScaleModal 
                type={scaleToMutate.type}
                scale={scaleToMutate.scale}
                onEdit={(scaleData)=>editScale({variables: scaleData})}
                onDelete={(id)=>deleteScale({variables: {userId: user.id, id}})}
                onClose={()=>setScaleToMutate(null)}
              /> : null
            }
            <Nav/>
            <div className={styles.droppableArea}>{/**Element made to add style to the drag and drop context*/}
                <DragDropContext onDragEnd={handleDragAndDrop}>
                    <Droppable droppableId="1">
                        {(provided: DroppableProvided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {scales.map((scale: ScaleData, i: number)=> (
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
            <Image className={styles.arrow} src="/arrow.png" alt='Arrow' width={100} height={80}/>
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
