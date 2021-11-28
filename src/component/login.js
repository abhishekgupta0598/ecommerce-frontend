import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import "../styles/stylesheet.css";
import { AuthService } from "../Service/AuthService";
import { useDispatch } from "react-redux";
import { closeForm, login } from "../redux/loginForm/action";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login(props) {
  const [username, setUsername] = useState("jai");
  const [password, setPassword] = useState("jai");
  const [email, setEmail] = useState("jai@gmail.com");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const submitHandler = () => {
    axios
      .post("http://localhost:9090/ecommerce/login", {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log("result", res);
        AuthService.get().login(res.data.token, res.data.user);
        setMessage(res.data.message);
        dispatch(closeForm());
        dispatch(login());
        // window.location.reload();
      })
      .catch((err) => {
        console.log("error", err);
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
              Invalid username or password
            </Alert>
          </Snackbar>
        </Stack>
      </div>
      <DialogContent>
        <h6 className="message">{message}</h6>
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
        <Button onClick={submitHandler}>Login</Button>
      </DialogActions>
    </div>
  );
}
