import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  TextField,
} from "@material-ui/core";
import "./MakeComment.css";

const MakeComment = ({ open, handleclose, createComment, postId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    if (title && title.length > 100) {
      alert("Title is too long! Please limit to <100 characters");
      return;
    }
    if (description && description.length > 5000) {
      alert("Description is too long! Please limit to <5000 characters");
      return;
    }
    const comment = {
      poster: title,
      body: description, 
    }
    const payload = {
      pid: postId,
      body: comment,
    }
    console.log(payload);
    createComment(payload);
    clear();
  };

  const clear = () => {
    handleclose();
  }

  return (
    <Dialog open={open} onClose={clear}>
      <DialogTitle>
        <div className="title">Write a comment</div>
      </DialogTitle>

      <DialogContent>
        <div className="TextFieldWrapper">
          <TextField
            autoFocus
            margin="dense"
            id="name"
            placeholder="Post specific username..."
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
            placeholder="Type comment here..."
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
    </Dialog>
  );
};

export default MakeComment;