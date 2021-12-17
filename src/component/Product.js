import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import "../styles/stylesheet.css";
import { useSelector, useDispatch } from "react-redux";
import ApiService from "../Service/ApiService";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { addItem } from "../redux/cart/action";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={2} ref={ref} variant="filled" {...props} />;
});

function Product() {
  const [product, setProduct] = useState([]);
  const cart = useSelector((state) => state.cart.add);
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const [openSnackBar, setSnackBar] = React.useState(false);
  const [message, setMessage] = React.useState("");
  let x = 0,
    items = [];

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };

  const incrementHandler = (index) => {
    console.log("index", index);
    if (product[index].count >= 1) {
      product[index].count++;
      setCount(count + 1);
    }
    console.log("count", product[index].count);
  };

  const decrementHandler = (index) => {
    if (product[index].count > 1) {
      product[index].count--;
      setCount(count - 1);
    }
    console.log("count", product[index].count);
  };

  useEffect(() => {
    ApiService.get("/products/list")
      .then((res) => {
        console.log("res", res);
        setProduct(
          res.data.products.map((res) => {
            return { ...res, count: count };
          })
        );
      })
      .catch((err) => {
        console.log("error", err);
      });
    ApiService.get("/carts")
      .then((res) => {
        items = res.data.cart.items.map((res) => (x = x + res.quantity));
        if (items[0] && cart !== items.at(-1)) {
          dispatch(addItem(items.at(-1)));
        } else {
          console.log("items", items.at(-1));
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const addHandler = (index) => {
    console.log("index", index);
    ApiService.post("/carts/items/add", {
      productCode: product[index].productCode,
      quantity: product[index].count,
    })
      .then((res) => {
        setMessage(
          `The Item having Quantity ${product[index].count} is added Successfully!`
        );
        setSnackBar(true);
        dispatch(addItem(product[index].count));
      })
      .catch((err) => {
        console.log("error", err);
        setMessage("You need to login");
        setSnackBar(true);
        console.log("snackbar", openSnackBar);
      });
  };

  return (
    <div className="root">
      <h3>All Products</h3>
      {product.length === 0  ? <h3>Loading...</h3> : null}
      {product.length > 0 && product.map((product, index) => {
        return (
          <span className="span1">
            <span className="span2">
              <img
                src={`${product.imagePath}`}
                alt="product images"
                key={`${product.productCode}`}
                className="productImage"
              />
            </span>
            <div style={{ display: "flex" }}>
              <span className="span3">
                <Button
                  onClick={() => addHandler(index)}
                  color="inherit"
                  variant="contained"
                  key={`${product.productCode}`}
                >
                  ADD ITEM
                </Button>
              </span>
              <span className="wrapSpan">
                <span style={{ marginTop: "8px" }}>Qty:</span>
                <span>
                  <IconButton
                    onClick={() => decrementHandler(index)}
                    color="inherit"
                    variant="contained"
                    key={`${product.productCode}`}
                  >
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                </span>
                <span style={{ marginTop: "9px" }}>
                  {product.count}
                </span>
                <span >
                  <IconButton
                    onClick={() => incrementHandler(index)}
                    color="inherit"
                    variant="contained"
                    key={`${product.productCode}`}
                  >
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </span>
              </span>
            </div>
          </span>
        );
      })}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={openSnackBar}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}

export default Product;
