import React from 'react';
import { Paper, Grid, withStyles, AppBar, Toolbar } from '@material-ui/core';
import styles from './AssignStaff.styles';
import CardView from './CardView';

const AssignStaffPresenter = ({ classes }) => {
  return (
    <Paper className={classes.root}>
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <p className={classes.title}>Assign Staff to Labs</p>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container direction="row" wrap></Grid>
    </Paper>
  );
};

export default withStyles(styles)(AssignStaffPresenter);
