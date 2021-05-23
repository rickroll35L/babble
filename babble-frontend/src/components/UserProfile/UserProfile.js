import React from 'react'
import './UserProfile.css'

const UserProfile = (props) => {
    
    return (
        <div>
            <div>
                <div>User ID: {props.userID}</div>
                <div>Email: {props.email}</div>
                <div>Password: {props.password}</div>
            </div>

            <button>Delete account</button>
        </div>
    );
}

export default UserProfile