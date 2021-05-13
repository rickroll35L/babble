import React from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const history = useHistory();
    const goHome = () => {
        history.push(`/home`);
    }
    return (
        <div>
            Profile
            <button onClick = {goHome}>
                Home
            </button>
        </div>
    );
}

export default Profile;
