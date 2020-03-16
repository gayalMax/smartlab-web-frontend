import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import CreateAccount from "./Components/adminComponents/CreateAccount";
import CreateRole from "./Components/adminComponents/createRole";
import {Template} from "./Components/common/index";


export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register/:registertoken" exact component={RegisterManage} />
        <Route path="/login" component={LoginForm} />
        <Route
          path="/CreateAccount"
          exact
          component={() => (
            <Template displayDocument={<CreateAccount />} />
          )}
        />
        <Route
          path="/createRole"
          exact
          component = {() => (
            <Template displayDocument = {<CreateRole />}></Template>
          )}
        />
        <Route path="/" exact render={() => <div>404</div>} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}
