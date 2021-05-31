import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import UserProfile from '../../components/UserProfile/UserProfile';
import UserPosts from '../../components/UserPosts/UserPosts';
import SavedPosts from '../../components/SavedPosts/SavedPosts';
import MakePost from '../../components/MakePost/MakePost';
import './Profile.css';

const Profile = () => {
    const history = useHistory();
    const goHome = () => {
        history.push(`/home`);
    }
    const goLogin = () => {
        history.push(`/`);
    }

    const [makePost, setMakePost] = useState(false);
    const openDialog = () => {
        setMakePost(true);
    }

    const userInfo = {
        userID: 'a1b2c3',
        email: 'joebruin@ucla.edu',
        password: 'thisisagoodpassword'
    }

    return (
        <div className="profile-page-container">

            {/*Navbar*/}

            <div className="profile-container">
                <div className="profile-info-container">
                    <UserProfile {...userInfo}/>
                </div>

                <div className="posts-container">
                    <UserPosts />
                    <SavedPosts />
                </div>
            </div>
            

            <div className="old-stuff">
                <MakePost open={makePost} handleclose={() => setMakePost(false)} />
                <button onClick={openDialog}>Make Post</button>
                <button onClick={goHome}>Home</button>
                <button onClick={goLogin}>Logout</button>
            </div>
        </div>
    );
}

export default Profile;
