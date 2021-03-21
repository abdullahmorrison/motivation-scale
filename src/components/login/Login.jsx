//Code copied from https://github.com/Sivanesh-S/react-google-authentication
import React from 'react';
import { useGoogleLogin } from 'react-google-login';

// refresh token
import { refreshTokenSetup } from './refreshToken';

//SVG
import GoogleIcon from "../icons/GoogleIcon";

const clientId = "212338543657-jov7gtn2u61p4bst88inr3v4sneda77t.apps.googleusercontent.com"

function LoginHooks() {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res); 
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <button onClick={signIn}>
      <GoogleIcon alt="google login"/>
      <span className="buttonText">Sign in with Google</span>
    </button>
  );
}

export default LoginHooks;