import React, { useState, useEffect } from "react";
import "../styles/stylesheet.css";
import ApiService from "../Service/ApiService";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={2} ref={ref} variant="filled" {...props} />;
});

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    ApiService.get("/orders")
      .then((res) => {
        console.log("res", res);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  return (
    <div className="root">
      <h3 style={{ marginLeft: "4px" }}>All Products</h3>
      {orders.map((order, index) => {
        return (
          <code key={index} style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(order, null, 2)}
          </code>
        );
      })}
    </div>
  );
}

export default Orders;
