  
//Code copied from https://github.com/Sivanesh-S/react-google-authentication
import React from 'react';
import { useGoogleLogout } from 'react-google-login';

//SVG
import GoogleIcon from "../icons/GoogleIcon";

const clientId = "212338543657-jov7gtn2u61p4bst88inr3v4sneda77t.apps.googleusercontent.com"

function LogoutHooks() {
  const onLogoutSuccess = (res) => {
    console.log('Logged out Success');
    alert('Logged out Successfully ✌');
  };

  const onFailure = () => {
    console.log('Handle failure cases');
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <button onClick={signOut}>
      <GoogleIcon alt="google login"/>
      <span className="buttonText">Sign out</span>
    </button>
  );
}

export default LogoutHooks;