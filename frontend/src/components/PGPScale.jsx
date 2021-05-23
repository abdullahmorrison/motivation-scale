import React, { useState, useEffect } from 'react';
import Scale from './Scale';
import GoogleLogin from 'react-google-login';


const PGPScale = () => {
    const [scales, setScales] = useState([])
    const [username, setUsername] = useState("")

    useEffect(() => {
    }, [])

    const fetchScales = async () => {
        if(username){
            const response = await fetch('http://localhost:3001/api/scales/username/'+username)
            const data = await response.json()
            setScales(data)
        }else{
            //alert("no user")
        }
    }
    useEffect(()=>{
        fetchScales()
    }, [username])

    const handleAddScale = () => { //saving new scale to state and local storage
        fetch('http://localhost:3001/api/scales', {
            method: 'POST',
            body: JSON.stringify({username: username}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => res.json())
            .then(fetchScales())//!PROBABLY INEFFICIENT 
    }
    const handleDeleteScale = scaleId => {
        //removing the scale from state and local storage by creating a new set of scales without the on we want to remove
        fetch('http://localhost:3001/api/scales/' + scaleId, {
            method: 'DELETE',
        }).then(res => res.json())
            .then(setScales(scales.filter(s => s._id !== scaleId)))
    }

    const responseGoogleSuccess = async (response) => {
        console.log(response)
        fetch('http://localhost:3001/api/googlelogin/', {
            method: 'POST',
            body: JSON.stringify({tokenId: response.tokenId}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(() => {
            setUsername(response.profileObj.email)
        })
    }

    const responseGoogleFailure = (response) => {
        alert(response.json());
    }

    return (
        <>
            <GoogleLogin
                clientId="212338543657-jov7gtn2u61p4bst88inr3v4sneda77t.apps.googleusercontent.com"
                buttonText="Continue with Google"
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleFailure}
                isSignedIn={true}
                cookiePolicy={'single_host_origin'}
            />
            {scales.map(scale => (
                <Scale key={scale._id} scaleID={scale._id} onDelete={handleDeleteScale} />
            ))}
            <button className="new-scale" onClick={handleAddScale}>+</button>
            <div className="description">
                <h1>What is this tool?</h1>
                <p>
                    This is a tool that helps you evaluate how you feel about the possibility of acheiving your goals.
                </p>
                <h1>Instructions</h1>
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
            </div>
        </>
    );
}
export default PGPScale;