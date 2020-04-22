import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector } from 'react-redux';

import styles from './Navigator.styles';
import entries from './Navigator.entries';
import NavigatorItem from './NavigatorItem';

function Navigator(props) {
  const { classes, location, ...other } = props;

  // Fix to error thrown by react saying staticContext is not recognized by Drawer
  if ('staticContext' in other) {
    delete other.staticContext;
  }

  const user = useSelector(state => state.auth.user);
  const hasCommonPermissions = allowed => {
    if (allowed === null) return true;
    const commonPermissions = allowed.filter(v => user.permissions.includes(v));
    return commonPermissions.length !== 0;
  };

  let currentPagePerms = [];
  entries.forEach(e => {
    const child = e.children.find(c => c.route === location.pathname);
    if (!child) return;
    currentPagePerms = e.permissions;
  });

  if (currentPagePerms && !hasCommonPermissions(currentPagePerms)) {
    return <Redirect push to="/admin/dashboard" />;
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.itemCategory)}>
          <img
            src={`${process.env.PUBLIC_URL}/images/header.jpg`}
            alt="Open Inventory Logo"
            className={classes.image}
          />
        </ListItem>
        {entries.map(
          ({ id, children, permissions }) =>
            hasCommonPermissions(permissions) && (
              <React.Fragment key={id}>
                <ListItem className={classes.categoryHeader}>
                  <ListItemText
                    classes={{
                      primary: classes.categoryHeaderPrimary
                    }}
                  >
                    {id}
                  </ListItemText>
                </ListItem>
                {children.map(({ id: childId, icon, route }) => (
                  <NavigatorItem
                    key={childId}
                    childId={childId}
                    icon={icon}
                    route={route}
                    location={location}
                    classes={classes}
                  />
                ))}

                <Divider className={classes.divider} />
              </React.Fragment>
            )
        )}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Navigator));
