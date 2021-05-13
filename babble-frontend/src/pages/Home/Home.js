import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
    const history = useHistory();
    const goProfile = () => {
        history.push(`/profile`);
    }

    
    return (
        <div>
            Home
            <button onClick = {goProfile}>
                Profile
            </button>
        </div>
        
    );
}

export default Home;