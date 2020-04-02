import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import ImageUpload from '../../Common/ImageUpload';
import styles from './Dashboard.styles';

function Dashboard({ classes }) {
  const onUpload = publicId => {
    // eslint-disable-next-line no-console
    console.log(publicId);
  };

  return (
    <div className={classes.center}>
      <Grid container direction="column" alignContent="center">
        <Grid item>
          <img className={classes.image} src="/images/full_logo.png" alt="Open Inventory Logo" />
        </Grid>
        <Grid item>
          <ImageUpload onSuccess={onUpload} />
        </Grid>
      </Grid>
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
