import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RegisterManage from './components/GuestUser/RegisterManage';
import LoginForm from './components/GuestUser/LoginForm';
import CreateAccount from './components/AdminComponents/CreateAccount';
import CreateRole from './components/AdminComponents/CreateRole';
import { Template, CreateRoleTemplate } from './components/Common/index';
import PageNotFound from './components/Common/PageNotFound';

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
          component={() => (
            <CreateRoleTemplate displayCreateRole={<CreateRole />} />
          )}
        />
        <Route path="/" exact render={() => <div>404</div>} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}
