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
import StripeCheckout from "react-stripe-checkout";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CheckOut(props) {
  const [items, setItems] = useState([]);

  const handleClose = () => {
    props.close();
  };

  const loadCart = () => {
    return ApiService.get(`/carts`)
      .then((res) => {
        console.log("res", res.data.cart);
        setItems(
          res.data.cart.items.map((item, index) => {
            return { ...item, index: index };
          })
        );
        console.log("items", items);
        console.log("props", props);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    if (AuthService.get().getUser() === null) {
      console.log("no items yet!");
    } else {
      loadCart();
    }
  }, [props.checkout]);

  const makeStripePayment = (token) => {
    return makePayment({
      paymentMethod: "STRIPE",
      paymentToken: token,
    });
  };
  const makeOfflinePayment = () => {
    return makePayment({
      paymentMethod: "OFFLINE",
    });
  }

  const makePayment = (body) => {
    ApiService.post("/carts/checkout", body)
      .then((res) => {
        console.log("response", res);
        loadCart();
        handleClose();
      })
      .catch((err) => {
        console.log("error", err);
        loadCart();
      });
  };

  let totalQuantity = 0;
  let totalPrice = 0;
  for (const item of items) {
    totalQuantity += item.quantity;
    totalPrice = totalPrice + item.quantity * item.price;
  }

  return (
    <div>
      <div>
        <Dialog
          open={true}
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
                        <td>{(res.quantity * res.price).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </DialogContentText>
            <h3 style={{ float: "left", marginLeft: "95px" }}>
              {totalQuantity}
            </h3>
            <h3 style={{ float: "left", marginLeft: "40px" }}>
              {totalPrice.toFixed(2)}
            </h3>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>cancel</Button>
            <Button
              disabled={!totalQuantity || !totalPrice}
              // onClick={paymentHandler}
              variant="contained"
              color="inherit"
            >
              <AccountBalanceIcon />
              <StripeCheckout
                label="Bag Store Checkout"
                name="Bag Store"
                locale="us"
                description="Please make your payment"
                stripeKey="pk_test_51JfQDaSBKItp4gm7CA23ztTLHOl18mHJZwUJ0ysf8QDj8QeAKtpxZyH36n29mrkUltH4FJxfA3MMjb0vrq5FMmSh00X1qHOgO6"
                token={makeStripePayment}
                amount={totalPrice * 100 /*cents*/}
              >
                Pay Now
              </StripeCheckout>
            </Button>
            <Button
              disabled={!totalQuantity || !totalPrice}
              // onClick={paymentHandler}
              variant="contained"
              color="inherit"
              onClick={() => makeOfflinePayment()}
            >
              <AccountBalanceIcon />
              Pay Later
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default CheckOut;
