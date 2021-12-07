import "materialize-css/dist/css/materialize.min.css";
import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./component/Home";
import NavBar from "./component/Navbar";
// import SignUp from "./component/signup";
// import AboutUs from "./component/aboutUs";
import FormDialog from "./component/formDialog";
import Logout from "./component/logout";
import { useSelector } from "react-redux";
import Product from "./component/Product";
import Cart from "./component/Cart";
import AuthService from "./Service/AuthService";

function App() {
  const login = useSelector((state) => state.form.login);
  // const open = useSelector((state) => state.form.open);
  console.log("combine", AuthService.get().token() + login);
  console.log("login", login);

  useEffect(() => {
    console.log("login", login);
    // console.log("open", open);
  }, [login]);
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/createaccount" component={SignUp} />
          <Route path="/aboutus" component={AboutUs} /> */}
          <Route path="/product" component={Product} />
          <Route path="/items" component={Cart} />
        </Switch>
      </Router>
      {AuthService.get().token() ? <Logout /> : <FormDialog />}
    </div>
  );
}

export default App;
