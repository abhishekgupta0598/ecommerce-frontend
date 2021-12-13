import "../styles/stylesheet.css";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState, useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckOut from "./CheckOut";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../redux/cart/action";
import AuthService from "../Service/AuthService";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import { addItem } from "../redux/cart/action";
import MuiAlert from "@mui/material/Alert";
import ApiService from "../Service/ApiService";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={2} ref={ref} variant="filled" {...props} />;
});

function Cart() {
  const [items, setItems] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const dispatch = useDispatch();
  const [deleteAlertOpen, setDeleteAlertOpen] = React.useState(false);
  const cart = useSelector((state) => state.cart.add);
  let amount = 0, quantity = 0;
  for (const item of items) {
    amount += item.price * item.quantity;
    quantity += item.quantity;
  }

  const handleDeleteAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setDeleteAlertOpen(false);
  };

  const loadCart = () => {
    return ApiService.get("/carts")
      .then((res) => {
        setItems(
          res.data.cart.items.map((item, index) => {
            return { ...item, index: index };
          })
        );
        console.log("items", items);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  useEffect(() => loadCart(), []);

  const removeItems = (index) => {
    console.log("index", index);
    const item = items[index];
    const productCode = item.productCode;
    ApiService
      .post(`/carts/items/remove`, {
        productCode: productCode,
        quantity: item.quantity,
      })
      .then((res) => {
        console.log("res", res);
        // dispatch(removeItem(item.quantity));
        loadCart();
        setDeleteAlertOpen(true);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const openHandler = () => {
    if (quantity > 0) {
      setCheckoutOpen(true);
    }
  };
  const closeCheckoutDialogHandler = () => {
    setCheckoutOpen(false);
    loadCart();
  };
  return (
    <div style={{ paddingLeft: "15%" }}>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={deleteAlertOpen} autoHideDuration={6000} onClose={handleDeleteAlertClose}>
          <Alert
            onClose={handleDeleteAlertClose}
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
          <div className="cartItems1" key={index}>
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
                {checkoutOpen ? (
                  <CheckOut
                    close={closeCheckoutDialogHandler}
                    qty={quantity}
                    amount={amount}
                    checkout={checkoutOpen}
                    productCode={`${item.productCode}`}
                    items={items}
                  />
                ) : null}
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
    </div>
  );
}

export default Cart;
