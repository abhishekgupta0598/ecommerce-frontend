import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useDispatch } from "react-redux";
import { closeForm } from "../redux/loginForm/action";
import "../styles/stylesheet.css";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ApiService from "../Service/ApiService";
import AuthService from "../Service/AuthService";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUp(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_no, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);;
  const [errMsg, setErr] = React.useState('Error Occurred!');

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const submitHandler = () => {
    ApiService
      .post("/auth/register", {
        username: username,
        mobile_no: mobile_no,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        // dispatch(closeForm());
        setMessage("The user is created successfully!");
      })
      .catch((err) => {
        console.log("error", err);
        setErr(err.response.data.msg);
        setOpen(true);
      });
  };

  return (
    <div>
      <div>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => dispatch(closeForm())}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {errMsg}
            </Alert>
          </Snackbar>
        </Stack>
      </div>
      <DialogContent>
        {/* <h6 className="message">{message}</h6> */}
        <TextField
          //   autoFocus
          margin="dense"
          id="username"
          label="Username"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <TextField
          margin="dense"
          id="email"
          label="Email"
          type="Email"
          fullWidth
          variant="standard"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          margin="dense"
          id="mobile"
          label="Mobile Number"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setMobileNumber(e.target.value)}
          value={mobile_no}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={submitHandler}>Sign Up</Button>
      </DialogActions>
    </div>
  );
}
