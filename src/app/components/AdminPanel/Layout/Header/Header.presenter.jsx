import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip, Menu, MenuItem, ListItemIcon } from '@material-ui/core';
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';

import { styles, docsLink } from './Header.styles';
import * as EVENTS from './Header.events';

function HeaderPresenter({ classes, handleEvent, headerState }) {
  return (
    <AppBar className={classes.secondaryBar} color="primary" position="sticky" elevation={0}>
      <Toolbar>
        <Grid container spacing={1} alignItems="center">
          <Hidden smUp>
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleEvent(EVENTS.ON_DRAWER_TOGGLE)}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          </Hidden>
          <Grid item xs>
            <Typography color="inherit" variant="h5" component="h1">
              {headerState.text}
            </Typography>
          </Grid>
          <Grid item xs />
          <Grid item>
            <Button href={docsLink} variant="outlined" color="inherit" size="small">
              Documentation
            </Button>
          </Grid>
          <Grid item>
            <Tooltip title={headerState.username}>
              <IconButton color="inherit" onClick={handleEvent(EVENTS.MENU_OPEN)}>
                <Avatar alt="User Avatar" className={classes.avatar}>
                  {headerState.letter}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={headerState.anchor}
              keepMounted
              open={Boolean(headerState.anchor)}
              onClose={handleEvent(EVENTS.MENU_CLOSE)}
            >
              <MenuItem key="profile" onClick={handleEvent(EVENTS.MENU_CLOSE)}>
                <ListItemIcon>
                  <AiOutlineUser />
                </ListItemIcon>
                <Typography variant="inherit">My Profile</Typography>
              </MenuItem>
              <MenuItem key="logout" onClick={handleEvent(EVENTS.SIGN_OUT)}>
                <ListItemIcon>
                  <AiOutlineLogout />
                </ListItemIcon>
                <Typography variant="inherit">Logout</Typography>
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

HeaderPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  handleEvent: PropTypes.func.isRequired,
  headerState: PropTypes.object.isRequired
};

export default withStyles(styles)(HeaderPresenter);
