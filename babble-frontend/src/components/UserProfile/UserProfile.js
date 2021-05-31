import React, { useState } from 'react'
import './UserProfile.css'
import { useHistory } from "react-router-dom";
import EditProfile from "../EditProfile/EditProfile.js";


const UserProfile = (props) => {
    const [editProfile, setEditProfile] = useState(false);
    const history = useHistory();
    const goDelete = () => {
        props.deleteUser();
        history.push("/");
        
    }
    
    return (
        <div className="user-profile-container">
            <EditProfile 
                open={editProfile} 
                handleclose={()=>setEditProfile(false)} 
                changeEmail={props.changeEmail} 
                changePassword={props.changePassword}
            />
            <div className="user-info-container">
                <div>Email: {props.email ? props.email : localStorage.getItem("email")}</div>
                <div>Password: {props.password ? props.password : localStorage.getItem("pswd")}</div>
            </div>

            <div className="profile-buttons">
                <button className="profile-button" onClick={goDelete}>Delete account</button>
                <button className="profile-button" onClick={()=>setEditProfile(true)}>Edit Profile</button>
            </div>
        </div>
    );
}

export default UserProfile