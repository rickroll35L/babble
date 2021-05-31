import React from "react";
import { useHistory } from "react-router-dom";
import UserProfile from '../../components/UserProfile/UserProfile';
import UserPosts from '../../components/UserPosts/UserPosts';
import SavedPosts from '../../components/SavedPosts/SavedPosts';

const Profile = ({deletePost, deleteUser, changePassword, changeEmail, getSavedPosts, getMyPosts, logoutUser, loginInfo}) => {
    const history = useHistory();
    const goHome = () => {
        history.push(`/home`);
    }
    const goLogin = () => {
        logoutUser();
        history.push(`/`);
    }

    const userInfo = {
        email: 'joebruin@ucla.edu',
        password: 'stupidlonghashthatisunreadable'
    }

    return (
        <div className="profile-page-container">
            <div className="profile-container">
                {/*<UserProfile {...userInfo} deleteUser={deleteUser} changeEmail={changeEmail} changePassword={changePassword}/>*/}
                <UserProfile {...loginInfo} deleteUser={deleteUser} changeEmail={changeEmail} changePassword={changePassword}/>
                <button onClick={goHome}>Home</button>
                <button onClick={goLogin}>Logout</button>
            </div>

            <div className="posts-container">
                <UserPosts getMyPosts={getMyPosts} deletePost={deletePost}/>
                <SavedPosts getSavedPosts={getSavedPosts}/>
            </div>
        </div>
    );
}

export default Profile;
