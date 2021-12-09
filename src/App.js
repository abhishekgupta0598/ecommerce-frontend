import "materialize-css/dist/css/materialize.min.css";
import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./component/Home";
import NavBar from "./component/Navbar";
import FormDialog from "./component/formDialog";
import Logout from "./component/logout";
import { useSelector } from "react-redux";
import Product from "./component/Product";
import Cart from "./component/Cart";
import AuthService from "./Service/AuthService";

function App() {
  const login = useSelector((state) => state.form.login);
  console.log("combine", AuthService.get().token() + login);
  console.log("login", login);

  useEffect(() => {
    console.log("login", login);
  }, [login]);
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/product" component={Product} />
          <Route path="/items" component={Cart} />
        </Switch>
      </Router>
      {AuthService.get().token() ? <Logout /> : <FormDialog />}
    </div>
  );
}

export default App;
