import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import "../styles/stylesheet.css";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openForm, login } from "../redux/loginForm/action";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { AuthService } from "../Service/AuthService";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 6,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function NavBar() {
  const open = useSelector((state) => state.form.open);
  const cart = useSelector((state) => state.cart.add);
  const dispatch = useDispatch();
  console.log("open", open);
  console.log("cart", cart);

  const accountHandler = () => {
    dispatch(openForm());
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BAGSTORE
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
          {/* <div className="navMargin">
            <Link to="/aboutus" className="navButton">
              <Button color="inherit">
                <b>about us</b>
              </Button>
            </Link>
          </div> */}
          <Link to="/items">
            <Button aria-label="cart">
              <StyledBadge badgeContent={cart} color="secondary">
                <ShoppingCartIcon className="navMargin" />
              </StyledBadge>
            </Button>
          </Link>
          <Button color="inherit" onClick={accountHandler}>
            <AccountCircleIcon className="navMargin" />
            {AuthService.get().getUser()
              ? AuthService.get().getUser().username
              : ""}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
