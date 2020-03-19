import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { authSignOut } from '../../../../redux/actions/AuthActions';
import entries from './Header.entries';
import HeaderPresenter from './Header.presenter';
import * as EVENTS from './Header.events';

/**
 * Header Smart Component.
 *
 * This manages header state including user information and title.
 */
function Header({ onDrawerToggle, location }) {
  // Find the correct entry for header title
  const headerEntry = entries.find(entry => location.pathname.startsWith(entry.path));
  const headerText = headerEntry ? headerEntry.name : 'Page Not Found';

  // Profile menu state
  const [anchorEl, setAnchorEl] = React.useState(null);

  // User information to display in avatar
  const user = useSelector(state => state.auth.user);
  const userLetter = user.firstName.substring(0, 1).toUpperCase();
  const userName = `${user.firstName} ${user.lastName}`;

  // To dispatch events such as signout
  const dispatch = useDispatch();

  // Profile menu open callback
  const menuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  // Profile menu close callback
  const menuClose = () => {
    setAnchorEl(null);
  };

  // User sign out callback
  const signOut = () => {
    dispatch(authSignOut());
    menuClose();
  };

  // Handler which maps the event from header into the correct callback
  const handleEvent = event => {
    switch (event) {
      case EVENTS.MENU_OPEN:
        return menuOpen;
      case EVENTS.MENU_CLOSE:
        return menuClose;
      case EVENTS.SET_ANCHOR_EL:
        return setAnchorEl;
      case EVENTS.ON_DRAWER_TOGGLE:
        return onDrawerToggle;
      case EVENTS.SIGN_OUT:
        return signOut;
      default:
        return () => {};
    }
  };

  // State of the header
  const headerState = {
    anchor: anchorEl,
    text: headerText,
    username: userName,
    letter: userLetter
  };

  // Associated dumb component
  return <HeaderPresenter handleEvent={handleEvent} headerState={headerState} />;
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(Header);
