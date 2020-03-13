import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RegisterForm from './Components/GuestUser/RegisterForm';
import CreateAccount from './Components/adminComponents/CreateAccount';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register/:registertoken" exact component={RegisterForm} />
        <Route path="/createAccount" exact component={CreateAccount} />
        <Route path="/" render={() => <div>404</div>} />
        <Route path="/loginForm" />
      </Switch>
    </BrowserRouter>
  );
}
