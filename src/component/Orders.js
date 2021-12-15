import React, { useState, useEffect } from "react";
import "../styles/stylesheet.css";
import ApiService from "../Service/ApiService";
// import MuiAlert from "@mui/material/Alert";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import { Button } from "@mui/material";
// import { fontSize } from "@mui/system";
import FullScreenDialog from "./orderDetails"

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={2} ref={ref} variant="filled" {...props} />;
// });

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: "12px"
  },
  pos: {
    marginBottom: 12,
  }
});

function Orders() {
  const [orders, setOrders] = useState([]);
  const [details, setDetails] = useState([])
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

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

  const orderHandler = (index) => {
    console.log('index', index)
    setDetails(orders[index].items)
    setOpen(true)
    console.log('details', details)
  }

  console.log('order', orders)
  return (
    <div className="root">
      <h3 style={{ marginLeft: "4px" }}>All Products</h3>
      {orders.length > 0 && orders.map((order, index) => {
        return (
          <div>
          <Card className={classes.root}>
            <CardContent>
              <span className="order">          
                <Typography variant="h6" component="h6" className="shiftLeft">
                  ORDER_ID
                </Typography>
                <Typography variant="h6" component="h6" className="shiftLeft">
                  USERNAME
                </Typography>
                <Typography variant="h6" component="h6" className="shiftLeft">
                  PAYMENT
                </Typography>
                <Typography variant="h6" component="h6" className="shiftLeft">
                  ORDER_DETAILS
                </Typography>
              </span>
              <span className="order">
                <Typography className="shiftLeft" color="textSecondary" gutterBottom>
                  {order.id}
                </Typography>
                <Typography className="shiftLeft" color="textSecondary" gutterBottom>
                  {order.username}
                </Typography>
                <Typography className="shiftLeft" color="textSecondary" gutterBottom>
                  {order.status}
                </Typography>
                <Typography className="shiftLeft" color="textSecondary" gutterBottom>
                  <Button type="button" color="inherit" variant="contained" onClick={() => orderHandler(index)}>Order_details</Button>
                </Typography>
              </span>
            </CardContent>
          </Card>
          </div>
        );
      })}
      {open ? <FullScreenDialog items = {details} close= {handleClose} open= {open}/> : null}
    </div>
  );
}

export default Orders;
