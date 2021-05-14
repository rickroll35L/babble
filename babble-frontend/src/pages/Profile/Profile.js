import React from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const history = useHistory();
    const goHome = () => {
        history.push(`/home`);
    }
    const goLogin = () => {
        history.push(`/`);
    }
    return (
        <div>
            Profile
            <button onClick = {goHome}>
                Home
            </button>
            <button onClick = {goLogin}>
                Logout
            </button>
        </div>
    );
}

export default Profile;
