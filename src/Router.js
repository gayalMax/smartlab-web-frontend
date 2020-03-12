import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import CreateAccount from "./Components/adminComponents/CreateAccount";
import CreateRole from "./Components/adminComponents/createRole";
import {Template} from "./Components/common/index";
import { CreateRoleTemplate} from "./Components/common/index";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route
          path="/createAccount"
          exact
          component={() => (
            <Template displayDocument={<CreateAccount />}></Template>
          )}
        />
        <Route
          path = "/createRole"
          exact
          component = {() => (
            <CreateRoleTemplate displayCreateRole = {<CreateRole />}></CreateRoleTemplate>
          )}
        />
        <Route path="/" render={() => <div>404</div>} />
      </Switch>
    </BrowserRouter>
  );
}
