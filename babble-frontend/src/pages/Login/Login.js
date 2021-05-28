import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import LoginForm from '../../components/LoginForm/LoginForm'
import SignupForm from '../../components/SignupForm/SignupForm'
import './Login.css'

const Login = ({ createUser, loginUser }) => {
    const history = useHistory();
    const goHome = () => {
        history.push(`/home`);
    }

    const [signinBool, setSigninBool] = useState(true);
    const [signinPhrase, setSigninPhrase] = useState("Don't have an account? Sign up!");

    const setSignin = () => {
        if (signinBool) setSigninPhrase("Already have an account? Log in!");
        else setSigninPhrase("Don't have an account? Sign up!");
        setSigninBool(!signinBool);
    }

    return (
        <div className="login-container">
            <div className="right-column">
                Welcome to Babble!
            </div>
            <div className="left-column">
                {signinBool? <LoginForm loginUser={loginUser}/> : <SignupForm createUser={createUser}/>}
                <button onClick = {setSignin}>{signinPhrase}</button>

                <br></br>
                <button onClick = {goHome}>Home</button>
            </div>
        </div>
    );
}

export default Login;