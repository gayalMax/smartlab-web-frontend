import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';

import styles from './Dashboard.styles';

function Dashboard({ classes }) {
  return (
    <Paper className={classes.root}>
      <Grid container direction="column" justify="center" className={classes.container}>
        <Grid item>
          <img className={classes.image} src="/images/full_logo.png" alt="Open Inventory Logo" />
        </Grid>
      </Grid>
    </Paper>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
