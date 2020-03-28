import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import {
  PageNotFound,
  ManageUsers,
  Dashboard,
  InviteUsers,
  RetractInvitations
} from '../AdminPages';

export default function AdminRouter() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}/administration/users`}>
        <ManageUsers />
      </Route>
      <Route exact path={`${match.url}/dashboard`}>
        <Dashboard />
      </Route>
      <Route exact path={`${match.url}/users/invite`}>
        <InviteUsers />
      </Route>
      <Route exact path={`${match.url}/users/retract`}>
        <RetractInvitations />
      </Route>
      <Route>
        <PageNotFound />
      </Route>
    </Switch>
  );
}
