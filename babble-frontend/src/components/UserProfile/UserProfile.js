import React from 'react'
import './UserProfile.css'
import { useHistory } from "react-router-dom";


const UserProfile = (props) => {
    const history = useHistory();
    const goDelete = () => {
        props.deleteUser();
        history.push("/");
        
    }
    
    return (
        <div className="user-profile-container">
            <div>
                <div>Email: {props.email ? props.email : localStorage.getItem("email")}</div>
                <div>Password: {props.password ? props.password : localStorage.getItem("pswd")}</div>
            </div>

            <button onClick={goDelete}>Delete account</button>
        </div>
    );
}

export default UserProfile