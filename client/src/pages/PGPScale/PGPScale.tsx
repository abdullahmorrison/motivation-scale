import { useState, useEffect } from 'react';

import Login from './components/Login';
import Scale from './components/Scale';
import ConfirmModal from './components/ConfirmModal';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const PGPScale = () => {
    const [scales, setScales] = useState<Array<{_id: string}>>([])
    const [username, setUsername] = useState<string>("")
    const [,setName] = useState<string>("Guest") //!DEFAULT "GUEST" MAY CAUSE ERRORS

    useEffect(()=>{
        const fetchScales = async () => {
            if(username){
                const response = await fetch('https://pgpscale.herokuapp.com/scales/'+username+'/username/')
                const data = await response.json()
                setScales(data.sort(function (a: {order: number}, b:{order: number}) {//sorting scales by the order attribute
                    return a.order - b.order;
                  }))
            }else{
                console.error("Error: NO USER when fetching scales")
            }
        }
        fetchScales()
    }, [username])

    const handleAddScale = () => { //saving new scale to state and local storage
        if(username){
            fetch('https://pgpscale.herokuapp.com/scales/', {
                method: 'POST',
                body: JSON.stringify({username: username, order: scales.length+1}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(
                (response) => response.json()
            ).then(
                data => {
                    setScales([...scales, data])
                }
            )
        }else{
            alert("Error: Login in order to use app")
        }
    }
    const handleDeleteScale = (scaleID: string) => {
        document.getElementById("myModal")!.style.display = "block"//display confirm modal

        //action if the delete button is clicked
        const deleteScale =()=> {//nested function created for adding and removing eventlistener
            if(username){
                fetch('https://pgpscale.herokuapp.com/scales/' + scaleID, {
                    method: 'DELETE',
                }).then(res => {
                    res.json()
                    setScales(scales.filter((s: {_id: string}) => s._id !== scaleID))
                })
            }else{
                alert("Error: Login in order to use app")
            }
            document.getElementById("myModal")!.style.display = "none";
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
        if(username){
            fetch('https://pgpscale.herokuapp.com/scales/' + scaleID +'/order', {
                method: 'PATCH',
                body: JSON.stringify({order: newOrder}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(res => {
                res.json()
            })
        }else{
            alert("Error: Login in order to use app")
        }
    }
    const handleResponseGoogleSuccess = async (response: any) => { //!Fix any
        console.log(response)
        fetch('https://pgpscale.herokuapp.com/users/googlelogin/', {
            method: 'POST',
            body: JSON.stringify({tokenId: response.tokenId}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(() => {
            setUsername(response.profileObj.email)
            setName(response.profileObj.givenName +" " + response.profileObj.familyName)
        })  
    }
    return (
        <>
            <Login onResponseGoogleSuccess={handleResponseGoogleSuccess} />
            <ConfirmModal message="Are you sure you would like to delete this scale?" confirmText="Delete"/>
            <div className='droppableArea'>{/**Element made to add style to the drag and drop context*/}
                <DragDropContext onDragEnd={(param: any)=>{//!FIX ANY
                    const srcI = param.source.index;
                    const destI = param.destination?.index;

                    const src = scales[srcI]
                    if(destI != null){ //making sure a item isn't dragged outside of draggable area (otherwise a destination wouldn't exist)
                        let removedSrc:any = scales.filter((_: any, index: any) => index !== srcI)
    
                        const left = removedSrc.slice(0, destI)
                        const right = removedSrc.slice(destI, removedSrc.length)
                        
                        let newScales:any = [...left, src, ...right]
                        
                        for(var i=0; i<newScales.length; i++){ //looping to find changes in a scale's order in the array
                            if(newScales[i]._id !== scales[i]._id){//only making api calls if a scale's order has changed
                                handleReorderScale(newScales[i]._id, i)
                            }
                        }

                        setScales(newScales)
                    }
                }}>
                    <Droppable droppableId="droppable-1">
                        {(provided: any, _: any) => ( //!FIX ANY
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {scales.map((scale: {_id: string}, i: number)=> (
                                    <Scale 
                                        index={i}
                                        key={scale._id}
                                        scaleID={scale._id}
                                        onDelete={handleDeleteScale} 
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <button className="new-scale" onClick={handleAddScale}>+</button>
        </>
    );
}
export default PGPScale;