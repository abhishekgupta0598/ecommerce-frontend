import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItem from '@material-ui/core/ListItem';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const handleClose = () => {
    props.close()
  };
  console.log('props', props)
  return (
    <div>
      <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              ALL ITEMS
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              ORDER AGAIN
            </Button> */}
          </Toolbar>
        </AppBar>
        <div style={{padding: "2%"}} >
      <h3 >All Items</h3>
      {props.items.map((item, index) => {
        return (
          <div className="cartIRootDiv" key={index}>
            <span className="cartImage">
              <img
                src={`${item.imagePath}`}
                alt="items images"
                key={`${item.productCode}`}
                className="productImage"
              />
            </span>
            <span className="cartSpan">
              <p className="cartMargin">
                <b>Product Name: {item.title}</b>
              </p>
              <p className="cartMargin"><b>Price: {item.price}</b></p>
              <p className="cartMargin"><b>Manufacturer: India</b></p>
              <p className="cartMargin">
                <b>Quantity:{item.quantity}</b>
              </p>
              <p className="cartMargin">
                <b>Total:{item.quantity * item.price}</b>
              </p>
            </span>
          </div>
        );
      })}
    </div>
      </Dialog>
    </div>
  );
}