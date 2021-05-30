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
                <div>Email: {props.email}</div>
                <div>Password: {props.password}</div>
            </div>

            <button onClick={goDelete}>Delete account</button>
        </div>
    );
}

export default UserProfile