import { Button } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/stylesheet.css";
import { useDispatch } from "react-redux";
import { openForm } from "../redux/loginForm/action";
import ApiService from "../Service/ApiService";
import AuthService from "../Service/AuthService";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { removeItem, addItem } from "../redux/cart/action";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={2} ref={ref} variant="filled" {...props} />;
});

function Product() {
  const [product, setProduct] = useState([]);
  const [add, setAdd] = useState(0);
  const [count, setCount] = useState(1);
  // const open = useSelector((state) => state.form.open);
  const dispatch = useDispatch();
  const [openSnackBar, setSnackBar] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };

  const incrementHandler = (index) => {
    if (product[index].count >= 1) {
      product[index].count++;
      setCount(count + 1);
    }
    console.log("iterms", product);
  };

  const decrementHandler = (index) => {
    if (product[index].count > 1) {
      product[index].count--;
      setCount(count - 1);
    }
    console.log("iterms", product);
  };

  useEffect(() => {
    ApiService
      .get("/products/list")
      .then((res) => {
        console.log("res", res);
        setProduct(res.data.products);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const addHandler = (index) => {
    console.log("index", index);
    console.log("products", product);
    console.log("product", product[index].price);
    if (AuthService.get().token() === false) {
      // console.log("login", open);
      dispatch(openForm());
      return;
    }
    ApiService
      .post("/carts/items/add", {
        productCode: product[index].productCode,
        quantity: product[index].count,
      })
      .then((res) => {
        console.log("result", res);
        product[index].add++;
        setAdd(add + 1);
        setMessage(
          `The Item having Quantity ${product[index].count} is added Successfully!`
        );
        setSnackBar(true);
        dispatch(addItem());
      })
      .catch((err) => {
        console.log("error", err);
        setMessage("This product is already stored into the cart!");
        setSnackBar(true);
        console.log("snackbar", openSnackBar);
      });
  };

  const removeHandler = (index) => {
    console.log("index", index);
    const productCode = product[index].productCode;
    axios
      .post(`/carts/items/remove`, {
        productCode,
        quantity: product[index].count,
      })
      .then((res) => {
        console.log("res", res);
        product[index].add--;
        setAdd(add - 1);
        setMessage(
          `The Item having quantity ${product[index].count} is removed successfully!`
        );
        setSnackBar(true);
        dispatch(removeItem());
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div className="root">
      <h3 style={{ marginLeft: "4px" }}>All Products</h3>
      {product.map((product, index) => {
        return (
          <span className="span1">
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
            <span className="span2">
              <img
                src={`${product.imagePath}`}
                alt="product images"
                key={`${product.productCode}`}
                className="productImage"
              />
            </span>
            <div style={{ float: "left" }}>
              <span className="span3" style={{ float: "left", width: "150px" }}>
                {product.add ? (
                  <Button
                    onClick={() => removeHandler(index)}
                    color="inherit"
                    variant="contained"
                    key={`${product.productCode}`}
                  >
                    Remove ITEM
                  </Button>
                ) : (
                  <Button
                    onClick={() => addHandler(index)}
                    color="inherit"
                    variant="contained"
                    key={`${product.productCode}`}
                  >
                    ADD ITEM
                  </Button>
                )}
              </span>
              <span style={{ float: "left", width: "130px" }}>
                <span style={{ float: "left", marginTop: "8px" }}>Qty:</span>
                <span style={{ float: "left" }}>
                  <IconButton
                    onClick={() => decrementHandler(index)}
                    color="inherit"
                    variant="contained"
                    key={`${product.productCode}`}
                  >
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                </span>
                <span style={{ float: "left", marginTop: "9px" }}>
                  {product.count}
                </span>
                <span style={{ float: "left" }}>
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
    </div>
  );
}

export default Product;
