import {GoogleLogin} from 'react-google-login';

interface Props{ 
    onResponseGoogleSuccess: (response: any) => Promise<void> 
}

const Login: React.FC<Props> = ({onResponseGoogleSuccess}) => {
    return (
         <GoogleLogin
           clientId="212338543657-jov7gtn2u61p4bst88inr3v4sneda77t.apps.googleusercontent.com"
            buttonText="Continue with Google"
            onSuccess={(res)=>onResponseGoogleSuccess(res)}
            isSignedIn={true}
            cookiePolicy={'single_host_origin'}
        />
    )
}
export default Login