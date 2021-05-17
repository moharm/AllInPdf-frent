import React, {useEffect} from "react";
import "./Login.css";
import { GOOGLE_AUTH_URL } from "../../Constants";
import { Redirect } from "react-router-dom";
import googleLogo from "../../img/google-logo.png";
import Alert from "react-s-alert";

function Login(props)  {
  const user = useEffect(() => {
       // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
    // Here we display the error and then remove the error query parameter from the location.
    if (props.location.state && props.location.state.error) {
        setTimeout(() => {
          Alert.error(props.location.state.error, {
            timeout: 5000
          });
          props.history.replace({
            pathname: props.location.pathname,
            state: {}
          });
        }, 100);
      }
  }, [])
  
  

if (props.authenticated) {
    return (
        <Redirect
            to={{
            pathname: "/",
            state: { from: props.location }
            }}
        />
    );
}

return (
    <div className="login-container">
        <div className="login-content">
            <h1 className="login-title">Login</h1>
            <SampleLogin />
        </div>
    </div>
);
}


function SampleLogin()  {
    return (
      <div className="social-login">
        <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
          <img src={googleLogo} alt="Google" /> Log in with Google
        </a>
      </div>
    );
}

export default Login;
