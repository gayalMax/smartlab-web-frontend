import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

function NavigatorItem({ childId, icon, route, location, classes }) {
  const isActive = route === location.pathname;

  return (
    <ListItem
      button
      component={Link}
      to={route}
      className={clsx(isActive && classes.itemActiveItem, classes.item)}
    >
      <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
      <ListItemText
        classes={{
          primary: classes.itemPrimary
        }}
      >
        {childId}
      </ListItemText>
    </ListItem>
  );
}

NavigatorItem.propTypes = {
  childId: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  route: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default NavigatorItem;
