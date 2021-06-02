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
import styled from "styled-components";
import "./EditProfile.css";

const StyledButton = styled.button`
  width: 110px;
  height: 40px;
  font-size: 24px;
  background: #FDCA40;
  border-radius: 30px;
  font-family: 'Ropa Sans', sans-serif;
  border: none;
`;


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

  const setString = (str) => {
    const res = "*";
    return res.repeat(str.length);
}

  return (
    <Dialog maxWidth="md"
      open={open}
      onClose={clear}>
      <DialogTitle disableTypography={true} className="edit-profile-title">
        <div>Change Email or Password</div>
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
                fontFamily: "'Ropa Sans', sans-serif",
                fontSize: 24,
                fontWeight: "normal",
                color: "#56667A",
              },
            }}
            onChange={handleEmail}
          />
          <TextField
            autoFocus
            margin="dense"
            id="pswd"
            placeholder={setString(localStorage.getItem("pswd"))}
            type="email"
            fullWidth
            InputProps={{
              disableUnderline: true,
              style: {
                fontFamily: "'Ropa Sans', sans-serif",
                fontSize: 24,
                fontWeight: "normal",
                color: "#56667A",
              },
            }}
            onChange={handlePassword}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={handleSubmit} color="primary">
          Confirm
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfile;