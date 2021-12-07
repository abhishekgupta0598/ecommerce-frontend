import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AuthService from "../Service/AuthService";
import ApiService from "../Service/ApiService";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={2} ref={ref} variant="filled" {...props} />;
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CheckOut(props) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = React.useState(true);
  const [total, setTotal] = useState(0);
  const [openDialog, setDialog] = useState(false);

  const handleClose = () => {
    props.close();
  };

  useEffect(() => {
    if (AuthService.get().getUser() === null) {
      console.log("no items yet!");
    } else {
      ApiService
        .get(`/carts`)
        .then((res) => {
          console.log("res", res.data.cart);
          setItems(
            res.data.cart.items.map((item, index) => {
              return { ...item, index: index};
            })
          );
          setOpen(true);
          console.log("items", items);
          console.log("props", props);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [props.checkout]);

  const paymentHandler = () => {
    axios
      .delete(
        `http://localhost:9090/ecommerce/userItem/${
          AuthService.get().getUser().id
        }`
      )
      .then((res) => {
        console.log("The payment is done", res);
        setDialog(true);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  let totalQuantity = 0;
  let totalPrice = 0;
  for (const item of items) {
    totalQuantity += item.quantity;
    totalPrice += item.price;
  }

  return (
    <div>
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Checkout"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((res, index) => {
                    return (
                      <tr>
                        <td>{res.title}</td>
                        <td>{res.price}</td>
                        <td>{res.quantity}</td>
                        <td>{res.quantity * res.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </DialogContentText>
            <h3 style={{ float: "left", marginLeft: "95px" }}>{totalQuantity}</h3>
            <h3 style={{ float: "left", marginLeft: "40px" }}>
              {totalPrice}
            </h3>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>cancel</Button>
            <Button
              disabled={!totalQuantity || !totalPrice}
              onClick={paymentHandler}
              variant="contained"
              color="inherit"
            >
              <AccountBalanceIcon />
              payment
            </Button>
          </DialogActions>
        </Dialog>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={openDialog}
            autoHideDuration={3000}
            onClose={() => window.location.reload()}
          >
            <Alert
              onClose={() => window.location.reload()}
              severity="success"
              sx={{ width: "100%" }}
            >
              The payment is done successfully!
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    </div>
  );
}

export default CheckOut;
