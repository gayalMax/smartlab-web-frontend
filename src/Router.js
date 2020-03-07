import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import CreateAccount from "./Components/adminComponents/CreateAccount";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/loginForm" exact component={LoginForm}  />
        <Route path="/createAccount" exact component={CreateAccount}  />
        <Route path="/" render={()=><div>404</div>} />
        <Route path='/loginForm'></Route>
      </Switch>
    </BrowserRouter>
  );
}
