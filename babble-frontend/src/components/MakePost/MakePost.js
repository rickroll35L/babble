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

const StyledDialog = styled.dialog`
  width: 900px;
  height: 600px;
  background: #FFFFFF;
  border: 1px solid #2176FF;
  box-sizing: border-box;
  border-radius: 30px;
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
    clear();
  };

  const clear = () => {
    handleclose();
  }

  return (
    <StyledDialog open={open} onClose={clear}>
      <DialogTitle>
        <div className="title">Create a Post</div>
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
                fontSize: 16,
                fontWeight: 600,
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
                fontSize: 16,
              },
            }}
            onChange={handleDescription}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          Post
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default MakePost;