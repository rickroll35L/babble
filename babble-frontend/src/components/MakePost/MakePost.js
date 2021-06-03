import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  TextField,
} from "@material-ui/core";
import styled from "styled-components";
import "./MakePost.css";

// const StyledDialog = styled("Dialog")`
//   top: 150px;
//   width: 900px;
//   height: auto;
//   background: #FFFFFF;
//   background-color: '#F4F4F4';

//   border: 1px solid #2176FF;
//   box-sizing: border-box;
//   border-radius: 30px;
// `;

const StyledButton = styled.button`
  width: 110px;
  height: 60px;
  font-size: 36px;
  line-height: 51px;
  background: #FDCA40;
  border-radius: 30px;
  font-family: 'Ropa Sans', sans-serif;
  border: none;
`;


const MakePost = ({ open, handleclose, createPost }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    if (title && title.length > 100) {
      alert("Title is too long! Please limit to <100 characters");
      return;
    }
    if (description && description.length > 5000) {
      alert("Description is too long! Please limit to <5000 characters");
      return;
    }
    const post = {
      title,
      body: description, 
      tags: []
    }
    createPost(post);
    window.location.reload();
    clear();
  };

  const clear = () => {
    handleclose();
  }

  return (
    <Dialog
      maxWidth="md" 
      fullWidth
      open={open} 
      onClose={clear}>
      <DialogTitle disableTypography={true} className="make-post-title">
        Create a Post
      </DialogTitle>

      <DialogContent>
        <div className="TextFieldWrapper">
          <TextField 
            autoFocus
            margin="dense"
            id="name"
            placeholder="Question / Subject"
            type="email"
            fullWidth
            InputProps={{
              disableUnderline: true,
              style: {
                fontFamily: "'Ropa Sans', sans-serif",
                fontSize: 44,
                fontWeight: "normal",
                color: "#56667A",
              },
            }}
            onChange={handleTitle}
          />
          <TextField
            placeholder="Description"
            rows={4}
            fullWidth
            multiline
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 36,
                fontFamily: "'Ropa Sans', sans-serif",
                fontWeight: "normal",
                color: "#56667A",
              },
            }}
            onChange={handleDescription}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={handleSubmit} color="primary">
          Post
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default MakePost;