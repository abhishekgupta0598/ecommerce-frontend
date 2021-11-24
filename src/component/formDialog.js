import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Login from "./login";
import SignUp from "./signup";
import { useSelector, useDispatch } from "react-redux";
import { closeForm } from "../redux/loginForm/action";

export default function FormDialog() {
  const open = useSelector((state) => state.form.open);
  const [value, setValue] = React.useState(0);

  const dispatch = useDispatch();
  console.log("open", open);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("value", value);
  };

  const handleClose = () => {
    dispatch(closeForm());
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>
          {value ? (
            <SignUp handleClose={handleClose} />
          ) : (
            <Login handleClose={handleClose} />
          )}
        </DialogTitle>
      </Dialog>
    </div>
  );
}
