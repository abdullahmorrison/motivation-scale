import React, { useState, useEffect } from 'react';
import Scale from './Scale';
import {GoogleLogin} from 'react-google-login';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const PGPScale = () => {
    const [scales, setScales] = useState<Array<{_id: string}>>([])
    const [username, setUsername] = useState<string>("")
    const [name, setName] = useState<string>("Guest") //!DEFAULT "GUEST" MAY CAUSE ERRORS

    useEffect(()=>{
        const fetchScales = async () => {
            if(username){
                const response = await fetch('/scales/'+username+'/username/')
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
            fetch('/scales/', {
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
        if(username){
            //removing the scale from state and local storage by creating a new set of scales without the on we want to remove
            fetch('/scales/' + scaleID, {
                method: 'DELETE',
            }).then(res => {
                res.json()
                setScales(scales.filter((s: {_id: string}) => s._id !== scaleID))
            })
        }else{
            alert("Error: Login in order to use app")
        }
    }
    const handleReorderScale = (scaleID: string, newOrder: number) => {
        if(username){
            fetch('/scales/' + scaleID +'/order', {
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
    const responseGoogleSuccess = async (response: any) => { //!Fix any
        console.log(response)
        fetch('/users/googlelogin/', {
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
            <h3>logged in as {name}</h3>
            <GoogleLogin
                clientId="212338543657-jov7gtn2u61p4bst88inr3v4sneda77t.apps.googleusercontent.com"
                buttonText="Continue with Google"
                onSuccess={(res)=>responseGoogleSuccess(res)}
                isSignedIn={true}
                cookiePolicy={'single_host_origin'}
            />
            <div style={{width: 955, margin: 'auto'}}>{/**Element made to add style to the drag and drop context*/}
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
            <div className="description">
                <h1>What is this tool?</h1>
                <p>
                    This is a tool that helps you evaluate how you feel about the possibility of acheiving your goals.
                </p>
                <h1>Why is this useful?</h1>
                <p>Your emotion influence your actions. The best way to control your emotions is to understand them. This tools helps you understand tham and makes it easier to pursue your goals</p>
                <h1>Instructions</h1>
                <ul>
                    <li>
                        Login with google (the only form of login is with google for security purposes)
                    </li>
                    <li>
                        Press the grey button to create a new scale.
                    </li>
                    <li>
                        Write the name of the goal you want to achieve.
                    </li>
                    <li>
                        Pursue your goal and every so often, check on how you are feeling about the possibility you acheiving that goal
                    </li>
                    <li>
                        Move the scale slider in the direction that you feel is correct for how you feel about the possibility of acheiving your goal
                    </li>
                </ul>
            </div>
        </>
    );
}
export default PGPScale;