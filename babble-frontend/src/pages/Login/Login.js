import React from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
    const history = useHistory();
    const goHome = () => {
        history.push(`/home`);
    }
    return (
        <div>
            Login/Signup
            <button onClick = {goHome}>
                Home
            </button>
        </div>
    );
}

export default Login;