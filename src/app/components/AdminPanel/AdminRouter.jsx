import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// import { PageNotFound, ManageUsers, Dashboard, InviteUsers, CreateLabs } from '../AdminPages';
import {
  PageNotFound,
  ManageUsers,
  Dashboard,
  InviteUsers,
  CreateLabs,
  RetractInvitations,
  CreateRoles,
  DeleteRoles,
  CreateItemsets,
  AssignStaff
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
      <Route exact path={`${match.url}/labs/createlabs`}>
        <CreateLabs />
      </Route>
      <Route exact path={`${match.url}/labs/assignstaff`}>
        <AssignStaff />
      </Route>
      <Route exact path={`${match.url}/users/retract`}>
        <RetractInvitations />
      </Route>
      <Route exact path={`${match.url}/administration/roles/create`}>
        <CreateRoles />
      </Route>
      <Route exact path={`${match.url}/administration/roles/delete`}>
        <DeleteRoles />
      </Route>
      <Route exact path={`${match.url}/lab/itemsets/create`}>
        <CreateItemsets />
      </Route>
      <Route>
        <PageNotFound />
      </Route>
    </Switch>
  );
}
