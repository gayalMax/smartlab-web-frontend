import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import styles from './Dashboard.styles';

function Dashboard({ classes }) {
  return (
    <div className={classes.center}>
      <Grid container direction="column" alignContent="center">
        <Grid item>
          <img
            className={classes.image}
            src={`${process.env.PUBLIC_URL}/images/full_logo.png`}
            alt="Open Inventory Logo"
          />
        </Grid>
      </Grid>
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
