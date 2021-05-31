import React from 'react'
import './UserProfile.css'

const UserProfile = (props) => {
    
    return (
        <div className="user-profile-container">
            <div className="user-info-container">
                <div>User ID: {props.userID}</div>
                <div>Email: {props.email}</div>
                <div>Password: {props.password}</div>
            </div>

            <div className="profile-buttons">
                <button>Edit Profile</button>
                <button>Delete Account</button>
            </div>
        </div>
    );
}

export default UserProfile