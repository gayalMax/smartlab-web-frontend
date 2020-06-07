import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// import { PageNotFound, ManageUsers, Dashboard, InviteUsers, CreateLabs } from '../AdminPages';
import {
  PageNotFound,
  Dashboard,
  InviteUsers,
  CreateLabs,
  RetractInvitations,
  CreateRoles,
  DeleteRoles,
  CreateItemsets,
  ViewUsers,
  ViewItemSets,
  AssignStaff,
  CreateItems,
  ViewItems,
  LendItems,
  ViewTemporaryItems
} from '../AdminPages';
import ViewLabs from '../AdminPages/ViewLabs/ViewLabs';
import CreateSupervisors from '../AdminPages/CreateSupervisors/CreateSupervisors';
import ViewSupervisors from '../AdminPages/ViewSupervisors/ViewSupervisors';
import GenerateBarcode from '../AdminPages/GenerateBarcode/GenerateBarcode';

export default function AdminRouter() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}/administration/users`}>
        <ViewUsers />
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
      <Route exact path={`${match.url}/labs/labs`}>
        <ViewLabs />
      </Route>
      <Route exact path={`${match.url}/itemset/list`}>
        <ViewItemSets />
      </Route>
      <Route exact path={`${match.url}/items/create`}>
        <CreateItems />
      </Route>
      <Route exact path={`${match.url}/items/list`}>
        <ViewItems />
      </Route>
      <Route exact path={`${match.url}/lenditems/lend`}>
        <LendItems />
      </Route>
      <Route exact path={`${match.url}/items/generatebarcode`}>
        <GenerateBarcode />
      </Route>
      <Route exact path={`${match.url}/administration/supervisor/add`}>
        <CreateSupervisors />
      </Route>
      <Route exact path={`${match.url}/administration/supervisor/list`}>
        <ViewSupervisors />
      </Route>
      <Route exact path={`${match.url}/tempitems`}>
        <ViewTemporaryItems />
      </Route>
      <Route>
        <PageNotFound />
      </Route>
    </Switch>
  );
}
