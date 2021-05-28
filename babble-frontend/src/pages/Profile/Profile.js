import React from "react";
import { useHistory } from "react-router-dom";
import UserProfile from '../../components/UserProfile/UserProfile';
import UserPosts from '../../components/UserPosts/UserPosts';
import SavedPosts from '../../components/SavedPosts/SavedPosts';

const Profile = ({getPostsFromIds, deletePost, deleteUser, user}) => {
    const history = useHistory();
    const goHome = () => {
        history.push(`/home`);
    }
    const goLogin = () => {
        history.push(`/`);
    }

    const userInfo = {
        userID: 'a1b2c3',
        email: 'joebruin@ucla.edu',
        password: 'thisisagoodpassword'
    }

    return (
        <div className="profile-page-container">
            <div className="profile-container">
                <UserProfile {...userInfo} deleteUser={deleteUser}/>
                {/*<UserProfile {...user} deleteUser={deleteUser}/>*/}
                <button onClick={goHome}>Home</button>
                <button onClick={goLogin}>Logout</button>
            </div>

            <div className="posts-container">
            <UserPosts posts={user.posts} deletePost={deletePost} getPostsFromIds={getPostsFromIds}/>
            <SavedPosts posts={user.saved} getPostsFromIds={getPostsFromIds}/>
            </div>
        </div>
    );
}

export default Profile;
