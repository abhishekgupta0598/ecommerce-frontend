import React, { useState } from "react";
// import axios from "axios";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import "../styles/stylesheet.css";
import ApiService from "../Service/ApiService";
import AuthService from "../Service/AuthService";
import { useDispatch } from "react-redux";
import { closeForm, login } from "../redux/loginForm/action";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("aman");
  const [password, setPassword] = useState("aman");
  // const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [errMsg, setErr] = React.useState("Error occured");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const submitHandler = () => {
    ApiService.post("/auth/login", {
      username: username,
      password: password,
    })
      .then((res) => {
        console.log("result", res);
        AuthService.get().login(res.data.token, res.data.user);
        // setMessage('Logged in successfully!');
        dispatch(closeForm());
        dispatch(login());
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
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
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
          InputProps={{ classes }}
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
          InputProps={{ classes }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={submitHandler}>Login</Button>
      </DialogActions>
    </div>
  );
}
