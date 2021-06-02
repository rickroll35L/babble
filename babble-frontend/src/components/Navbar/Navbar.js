import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import { Icon, Menu, MenuItem } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import MakePost from "../MakePost/MakePost.js"
import './Navbar.css';

const Navbar = ({ createPost, logoutUser, searchPost }) => {
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

    const goSearch = () => {
        history.push(`/home/${query}`)
    }

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <div className="navbar">
            <button className="home" onClick={goHome}>BABBLE!</button>
            <form className="search" type="submit" onSubmit={goSearch}>
                <IconButton onClick={goSearch}>
                    <SearchIcon style={{ fontSize: 50}}/>
                </IconButton>
                <input className="search-text"
                    type="text"
                    title="Search"
                    placeholder="Search"
                    value={query}
                    onChange={handleQuery}
                />
            </form>
            <div className="menu">
                <IconButton aria-controls="menu" aria-haspopup="true" onClick={handleClick} style={{border: "1px solid #33A1FD"}}>
                    <AccountCircleIcon style={{ color: "#FFFFFF", fontSize: 40 }}/>
                </IconButton>
                <Menu id="menu" 
                    anchorEl={anchorEl} 
                    open={Boolean(anchorEl)} 
                    onClose={handleClose}     
                    getContentAnchorEl={null}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                    transformOrigin={{vertical: 'top', horizontal: 'center'}}
                    >
                    <MenuItem>
                        <button className="tag" onClick={openDialog}>Make Post</button>
                    </MenuItem>
                    <MenuItem>
                        <button className="tag" onClick = {goProfile}>Profile</button>
                    </MenuItem>
                    <MenuItem>
                        <button className="tag" onClick = {goLogin}>Logout</button>
                    </MenuItem>
                </Menu>
                <MakePost open={makePost} handleclose={() => setMakePost(false)} createPost={createPost}/>
            </div>
        </div>
    );
}

export default Navbar;