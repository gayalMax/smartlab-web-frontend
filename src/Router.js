import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RegisterForm from './components/GuestUser/RegisterForm';
import CreateAccount from './components/AdminComponents/CreateAccount';
import CreateRole from './components/AdminComponents/CreateRole';
import { Template, CreateRoleTemplate } from './components/Common/index';


export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register/:registertoken" exact component={RegisterForm} />
        {/* <Route path="/login" component={LoginForm} /> */}
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
        <Route path="/" render={() => <div>404</div>} />
      </Switch>
    </BrowserRouter>
  );
}
