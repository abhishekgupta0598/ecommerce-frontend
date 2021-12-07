import "../styles/stylesheet.css";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckOut from "./CheckOut";
import { useDispatch } from "react-redux";
import { removeItem } from "../redux/cart/action";
import AuthService from "../Service/AuthService";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ApiService from "../Service/ApiService";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={2} ref={ref} variant="filled" {...props} />;
});

function Cart() {
  const [items, setItems] = useState([]);
  const [removedItem, setRemoveItems] = useState(0);
  const [checkout, setCheckout] = useState(false);
  const [totalQty, setTotalQty] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (!AuthService.get().isAuthenticated()) {
      console.log("no items yet!");
      return;
    } 
    ApiService
      .get('/carts')
      .then((res) => {
        console.log("res", res);
        setItems(
          res.data.cart.items.map((item, index) => {
            return {...item, index: index };
          })
        );
        console.log("items", items);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [removedItem]);

  const removeItems = (index) => {
    console.log("index", index);
    const productCode = items[index].productCode;
    ApiService
      .post(
        `/carts/items/remove`, {
          productCode: productCode,
          quantity: items[index].quantity,
        }
      )
      .then((res) => {
        console.log("res", res);
        dispatch(removeItem());
        setRemoveItems(removedItem + 1);
        setOpen(true);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const openHandler = () => {
    let x = 0,
      y = 0;
    let total = [],
      qty = [];
    total = items.map((item, index) => (x = x + item.price * item.qty));
    qty = items.map((item, index) => (y = y + item.qty));
    console.log("total", total.at(-1));
    console.log("total", qty.at(-1));
    setCheckout(1);
    setTotalQty(qty.at(-1));
    setTotalAmount(total.at(-1));
  };
  const closeHandler = () => {
    setCheckout(0);
  };
  return (
    <div style={{ paddingLeft: "15%" }}>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            The Item is deleted successfully
          </Alert>
        </Snackbar>
      </Stack>
      <h3>All Purchase Items</h3>
      {items.map((item, index) => {
        return (
          <div className="cartItems1">
            <span className="cartItems2">
              <img
                src={`${item.imagePath}`}
                alt="items images"
                key={`${item.productCode}`}
                className="productImage"
              />
            </span>
            <span className="cartItems3">
              <p style={{ float: "left", marginTop: "3px" }}>Remove Item:</p>
              <div
                style={{
                  float: "left",
                  marginTop: "-5px",
                }}
              >
                <IconButton
                  onClick={() => removeItems(index)}
                  color="inherit"
                  variant="contained"
                  key={`${item.productCode}`}
                  style={{ marginLeft: "10px", float: "left" }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
              <p style={{ marginTop: "-5px", clear: "left" }}>
                Product Name: {item.title}
              </p>
              <p style={{ marginTop: "-5px" }}>Price: {item.price}</p>
              <p style={{ marginTop: "-5px" }}>Manufacturer: India</p>
              <p style={{ float: "left", marginTop: "-5px" }}>
                Quantity:{item.quantity}
              </p>
            </span>
          </div>
        );
      })}
      <div style={{ clear: "left", marginLeft: "70%", marginBottom: "5%" }}>
        <Button color="inherit" variant="contained" onClick={openHandler}>
          <ShoppingCartIcon />
          Proceed to checkout
        </Button>
      </div>
      {checkout ? (
        <CheckOut
          close={closeHandler}
          qty={totalQty}
          amount={totalAmount}
          checkout={checkout}
        />
      ) : null}
    </div>
  );
}

export default Cart;
