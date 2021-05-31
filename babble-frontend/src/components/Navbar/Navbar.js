import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import { Menu, MenuItem } from '@material-ui/core';
import MakePost from "../MakePost/MakePost.js"

const Navbar = ({ createPost, logoutUser, searchPost, setPostList}) => {
    const [query, setQuery] = useState("")
    const [makePost, setMakePost] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleQuery = (e) => {
        setQuery(e.target.value);
    }

    const history = useHistory();
    const goHome = () => {
        history.push(`/home`);
    }
    const goProfile = () => {
        history.push(`/profile`);
    }
    const goLogin = () => {
        logoutUser();
        history.push(`/`);
    }
    const openDialog = () => {
        setMakePost(true);
    }

    const search = () => {
        const req = {
            query: "hi again", //replace with search string
            callback: setPostList

        };
        searchPost(req);
    };

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <div className="navbar">
            <button onClick={goHome}>BABBLE</button>
            <form className="search" type="submit">
                <button onClick={search}>Search</button>
                <input className="search-text"
                    type="text"
                    title="Search"
                    value={query}
                    onChange={handleQuery}
                />
            </form>
            <div className="menu">
                <button aria-controls="menu" aria-haspopup="true" onClick={handleClick}>Icon</button>
                <Menu id="menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem>
                        <MakePost open={makePost} handleclose={() => setMakePost(false)} createPost={createPost}/>
                        <button onClick={openDialog}>Make Post</button>
                    </MenuItem>
                    <MenuItem>
                        <button onClick = {goProfile}>Profile</button>
                    </MenuItem>
                    <MenuItem>
                        <button onClick = {goLogin}>Logout</button>
                    </MenuItem>
                </Menu>

            </div>
        </div>
    );
}

export default Navbar;