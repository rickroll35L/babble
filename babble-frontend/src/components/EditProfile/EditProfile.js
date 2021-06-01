import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  TextField,
} from "@material-ui/core";
import "./EditProfile.css";

const EditProfile = ({ open, handleclose, changeEmail, changePassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    let diffemail = true;
    let diffpswd = true;
    if(email==="" || email === localStorage.getItem("email")){
      diffemail = false;
    }
    if(password==="" || password === localStorage.getItem("pswd")){
      diffpswd = false;
    }
    if(diffemail && diffpswd){
      alert("Can not change both email at password at one time!");
      return;
    }
    if(!diffemail && !diffpswd){
      alert("No changes detected!");
      return;
    }
    if(diffemail && !diffpswd){
      changeEmail(email);
      alert(`Email changed to ${email}! Please re-login`);
    }
    else if(!diffemail && diffpswd){
      changePassword(password);
      alert(`Password changed to ${password}! Please re-login`);
    }
    history.push("/");
    clear();
  };

  const clear = () => {
    handleclose();
  }

  return (
    <Dialog open={open} onClose={clear}>
      <DialogTitle>
        <div className="title">Change Email or Password</div>
      </DialogTitle>

      <DialogContent>
        <div className="TextFieldWrapper">
          <TextField
            autoFocus
            margin="dense"
            id="name"
            placeholder={localStorage.getItem("email")}
            type="email"
            fullWidth
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 16,
                fontWeight: 600,
              },
            }}
            onChange={handleEmail}
          />
          <TextField
            autoFocus
            margin="dense"
            id="pswd"
            placeholder={localStorage.getItem("pswd")}
            type="email"
            fullWidth
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 16,
                fontWeight: 600,
              },
            }}
            onChange={handlePassword}
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

export default EditProfile;