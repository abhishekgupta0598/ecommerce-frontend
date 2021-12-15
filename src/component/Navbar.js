import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import "../styles/stylesheet.css";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useHistory } from 'react-router-dom';
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openForm } from "../redux/loginForm/action";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import AuthService from "../Service/AuthService";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import settings from "../settings";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 6,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menu: {
    color: 'white',
    fontSize: "32px",
  }
});

export default function NavBar() {
  const history = useHistory()
  const matches = useMediaQuery("(min-width:800px)");
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button key={'HOME'} onClick={() => history.push('/')}>
          <ListItemText primary={'HOME'} />
        </ListItem>
        <ListItem button key={'PRODUCT'} onClick={() => history.push('/product')}>
          <ListItemText primary={'PRODUCT'} />
        </ListItem>
        <ListItem button key={'CART'}>
          <ListItemText primary={'CART'} onClick={() => history.push('/items')} />
        </ListItem>
        <ListItem button key={'ACCOUNT'}>
          <ListItemText primary={'ACCOUNT'} onClick={accountHandler} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const open = useSelector((state) => state.form.open);
  const cart = useSelector((state) => state.cart.add);
  const dispatch = useDispatch();
  console.log("open", open);
  console.log("cart", cart);

  const accountHandler = () => {
    dispatch(openForm());
  };
  return (<div>
    {matches ? <div><Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {settings.name}
          </Typography>
          <div>
            <Link to="/" className="navButton">
              <Button color="inherit">
                <b>Home</b>
              </Button>
            </Link>
          </div>
          <div>
            <Link to="/product" className="navButton">
              <Button className="navMargin" color="inherit">
                <b>product</b>
              </Button>
            </Link>
          </div>
          <div>
            <Link to="/orders" className="navButton">
              <Button className="navMargin" color="inherit">
                <b>orders</b>
              </Button>
            </Link>
          </div>
          <Link to="/items">
            <Button aria-label="cart">
              <StyledBadge badgeContent={cart} color="secondary">
                <ShoppingCartIcon className="navMargin" />
              </StyledBadge>
            </Button>
          </Link>
          <Button color="inherit" onClick={accountHandler}>
            <AccountCircleIcon className="navMargin" />
            {AuthService.get().isAuthenticated()
              ? AuthService.get().getUser().username
              : ""}
          </Button>
        </Toolbar>
      </AppBar>
    </Box></div> : <div>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <div>
            {['top'].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button style={{ marginLeft: "-20px" }}><MenuIcon className={classes.menu} onClick={toggleDrawer(anchor, true)} /></Button>
                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {settings.name}
          </Typography>
        </Toolbar>
      </AppBar></div>}
  </div>
  );
}
