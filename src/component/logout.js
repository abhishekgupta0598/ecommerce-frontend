import React from "react";
import AuthService from "../Service/AuthService";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { closeForm } from "../redux/loginForm/action";

function Logout() {
  const value = useSelector((state) => state.form.open);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeForm());
  };

  const logoutHandler = () => {
    const x = AuthService.get().logout();
    if (x === true) {
      window.location.reload();
      console.log("logout");
    } else {
      console.log("still login");
    }
  };
  return (
    <div>
      <Dialog open={value} onClose={handleClose}>
        <DialogTitle>
          <span style={{ width: "100%", display: "block" }}>
            <Button>
              {AuthService.get().getAuthToken()
                ? `${
                    AuthService.get().getUser().username
                  } is LogIn Successfully!`
                : "LogIn Successfully!"}
            </Button>
          </span>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={logoutHandler} color="inherit">
            LOGOUT
          </Button>
        </DialogTitle>
      </Dialog>
    </div>
  );
}

export default Logout;
